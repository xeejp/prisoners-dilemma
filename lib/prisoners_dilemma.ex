defmodule CoinOrientation do
  use XeeThemeScript
  require Logger

  # Callbacks
  def script_type do
    :message
  end

  def install, do: nil
 
  def init do
    {:ok, %{"data" => %{
       page: "waiting",
       participants: %{},
       pairs: %{},
       active_pair: 0,
       finish_description: 0,
       message: %{
         description: [
           %{id: 0, text: "あなたは2人で旅行をしていたところ、浮浪罪で逮捕された。\nあなたたちは共犯をして強盗を働いたのではないと疑われているが、有罪にするには証拠が不十分である。"},
           %{id: 1, text: "地方検事は隔離された独房で個別に彼らを審問し、各々に対して次のような提示をした。"},
           %{id: 2, text: "「もし君が自白して君の友人が自白しなかったら、君は釈放されるが友人は厳しく処罰されるだろう。\nもし2人とも自白すれば判決は控えめになるだろう。\nもし誰も自白しなければ、軽い浮浪罪で処罰されるだろう。」"},
           %{id: 3, text: "ここで約束された懲役は次の表に月単位で示される。\nもしも合理的ならば彼らはどのような行動を選ぶだろうか。"},
         ],
         experiment: "",
       },
       config: %{
         "max_round" => 1,
         "gain_table" => [[-8, -8], [0, -15], [-15, 0], [-1, -1]],
         "askSnum" => false,
       },
       joined: 0,
     }}}
  end

  def new_participant() do
    %{
      snum: "",
      is_finish_description: false,
      role: "visitor",
      answer: nil,
      round_point: 0,
      point: 0,
      ans_yes: 0,
      pair_id: nil,
      buddy_id: nil,
      finished: false,
    }
  end

  def new_pair(user1, user2) do
    %{
      user1: user1,
      user2: user2,
      current_round: 1,
      status: nil,
      logs: [],
      finished: false,
    }
  end

  def match(data) do
    %{ participants: participants } = data
    participants = participants
                  |>Enum.map(fn({id, state}) ->
                  {id, %{ state |
                    role: "visitor",
                    point: 0,
                    pair_id: nil,
                    finished: false,
                  }}
                  end)
                  |>Enum.into(%{})
    group_size = 2
    groups = participants
            |>Enum.map(&elem(&1, 0))
            |>Enum.shuffle
            |>Enum.chunk(group_size)
            |>Enum.map_reduce(1, fn(p, acc) -> {{Integer.to_string(acc), p}, acc + 1}end) |> elem(0)
            |>Enum.into(%{})

    updater = fn participant, pair_id, buddy_id, role ->
      %{ participant |
        role: role,
        point: 0,
        pair_id: pair_id,
        buddy_id: buddy_id,
      }
    end

    reducer = fn {group, ids}, {participants, pairs} ->
      [id1, id2] = ids
      participants = participants 
                      |>Map.update!(id1, &updater.(&1, group, id2, "User1"))
                      |>Map.update!(id2, &updater.(&1, group, id1, "User2"))
      pairs = Map.put(pairs, group, new_pair(id1, id2))
      {participants, pairs}
    end
    acc = {participants, %{}}
    {participants, groups} = Enum.reduce(groups, acc, reducer)
    
    %{data | participants: participants, pairs: groups, active_pair: Map.size(groups)}
  end

  def judge(data, user1, user2) do
    [[a, b], [c, d], [e, f], [g, h]] = data.config["gain_table"]
    case {user1.answer, user2.answer} do
      {"yes", "yes"} ->
        user1 = %{ user1 | point: user1.point+a, round_point: a}
        user2 = %{ user2 | point: user2.point+b, round_point: b}
      {"yes", "no"} ->
        user1 = %{ user1 | point: user1.point+c, round_point: c}
        user2 = %{ user2 | point: user2.point+d, round_point: d}
      {"no", "yes"} ->
        user1 = %{ user1 | point: user1.point+e, round_point: e}
        user2 = %{ user2 | point: user2.point+f, round_point: f}
      {"no", "no"} ->
        user1 = %{ user1 | point: user1.point+g, round_point: g}
        user2 = %{ user2 | point: user2.point+h, round_point: h}
    end
    {user1, user2}
  end



  def join(%{participants: participants} = data, id) do
    unless Map.has_key?(participants, id) do
      participant = new_participant()
      participants = Map.put(participants, id, participant)
      data = %{data | participants: participants}
      data = %{data | joined: Map.size(participants)}
      action = %{
        type: "ADD_USER",
        id: id,
        users: participants,
        joined: data.joined,
      }
      participant_action = %{
        type: "ADD_USER",
        joined: data.joined,
      }
      {:ok, %{"data" => data, "host" => %{action: action}, "participant" => dispatch_to_all(participants, participant_action)}}
    else
      {:ok, %{"data" => data}}
    end
  end

  def handle_received(data, %{"action" => "fetch contents", "params" => params}) do
    action = Map.merge(%{type: "FETCH_CONTENTS"}, data)
    {:ok, %{"data" => data, "host" => %{action: action}}}
  end

  def handle_received(data, %{"action" => "change page", "params" => params}) do
    data = %{data | page: params}
    unless data.page == "result" do
      data = Map.put(data, :joined, Map.size(data.participants))
      pairs = Enum.map(data.pairs, fn { id, pair } ->
        {id, %{ pair |
          current_round: 1,
          finished: false,
          logs: [],
        }} end) |> Enum.into(%{})
      participants = Enum.map(data.participants, fn {id, participant} ->
        {id, %{participant |
          answer: nil,
          is_finish_description: false,
          finished: false,
          point: 0,
          ans_yes: 0,
        }} end) |> Enum.into(%{})
      data = %{data | participants: participants, pairs: pairs, active_pair: Map.size(pairs)}
    end
    if data.page == "description" do
      data = %{data | finish_description: 0}
      data = match(data)
    end
    host_action = %{
      type: "CHANGE_PAGE",
      page: data.page,
      message: data.message,
      config: data.config,
      users: data.participants,
      joined: data.joined,
      finish_description: data.finish_description,
      pairs: data.pairs,
      active_pair: data.active_pair,
    }
    participant_action = Enum.map(data.participants, fn {id, _} ->
      {id, %{action: %{
         type: "CHANGE_PAGE",
         page: data.page,
         message: data.message,
         config: data.config,
         joined: data.joined,
         own_data: data.participants[id],
         users: if data.page == "result" do
           data.participants
         else
           nil
         end,
         logs: unless data.participants[id].role == "visitor" do
           data.pairs[data.participants[id].pair_id].logs
         else
           nil
         end,
       }}} end) |> Enum.into(%{})
     {:ok, %{"data" => data, "host" => %{action: host_action}, "participant" => participant_action}}
  end

  def handle_received(data, %{"action" => "rematch", "params" => params}) do
    data = match(data)
    Logger.debug " hjklk"
    action = %{
      type: "REMATCH",
      users: data.participants,
      pairs: data.pairs,
      active_pair: data.active_pair,
    }
    {:ok, %{"data" => data, "host" => %{action: action}}}
  end

  def handle_received(data, %{"action" => "update message", "params" => params}) do
    data = %{data | message: params}
    action = %{
      type: "UPDATE_MESSAGE",
      message: data.message,
    }
    {:ok, %{"data" => data, "host" => %{action: action}, "participant" => dispatch_to_all(data.participants, action)}}
  end
  
  def handle_received(data, %{"action" => "update config", "params" => params}) do
    data = %{data | config: params}
    action = %{
      type: "UPDATE_CONFIG",
      config: data.config,
    }
    {:ok, %{"data" => data, "host" => %{action: action}, "participant" => dispatch_to_all(data.participants, action)}}
  end

  def handle_received(data, %{"action" => "fetch contents"}, id) do
    action = unless data.participants[id].role == "visitor" do
      %{
        type: "FETCH_CONTENTS",
        own_id: id,
        page: data.page,
        message: data.message,
        config: data.config,
        own_data: data.participants[id],
        logs: data.pairs[data.participants[id].pair_id].logs,
        joined: data.joined,
        users: if data.page == "result" do
          data.participants
        else
          nil
        end,
      }
    else
      %{
        type: "FETCH_CONTENTS",
        own_id: id,
        page: data.page,
        message: data.message,
        config: data.config,
        own_data: data.participants[id],
        joined: data.joined,
        logs: nil,
        users: if data.page == "result" do
          data.participants
        else
          nil
        end,
      }
    end
    {:ok, %{"data" => data, "participant" => %{id => %{action: action}}}}
  end

  def handle_received(data, %{"action" => "submit answer", "params" => params}, id) do
    participant = data.participants[id]
    pair = data.pairs[participant.pair_id]
    buddy_id = if participant.role == "User1" do
      pair.user2
    else
      pair.user1
    end
    buddy = data.participants[buddy_id]

    participant = %{ participant | answer: params }
    if params == "yes" do
      participant = %{ participant | ans_yes: participant.ans_yes+1 }
    end
    data = put_in(data.participants[id], participant)

    if participant.answer != nil and buddy.answer != nil do
      Logger.debug "answerd each participants"

      if participant.role == "User1" do
        {participant, buddy} = judge(data, participant, buddy)
      else
        {buddy, participant} = judge(data, buddy, participant)
      end
      data = put_in(data.participants[id], participant)
      data = put_in(data.participants[buddy_id], buddy)

      log =  %{
        round: pair.current_round,
        point1: data.participants[pair.user1].point,
        point2: data.participants[pair.user2].point,
        round_point1: data.participants[pair.user1].round_point,
        round_point2: data.participants[pair.user2].round_point,
        answer1: data.participants[pair.user1].answer,
        answer2: data.participants[pair.user2].answer,
      }
      Logger.debug data.config["max_round"]
      Logger.debug pair.current_round
      if pair.current_round >= data.config["max_round"] do
        data = %{ data | active_pair: data.active_pair-1}
        participant = %{ participant | finished: true }
        buddy = %{ buddy | finished: true }
        pair = %{ pair | finished: true }
      end
      pair = %{ pair |
        logs: [log] ++ pair.logs,
        current_round: if pair.current_round < data.config["max_round"] do
          pair.current_round+1
        else
          pair.current_round
        end,
      }
      participant = %{ participant | answer: nil }
      buddy = %{ buddy | answer: nil }
      data = put_in(data.pairs[participant.pair_id], pair)
      data = put_in(data.participants[id], participant)
      data = put_in(data.participants[buddy_id], buddy)
    end

    host_action = %{
      type: "SUBMIT_ANSWER",
      pairs: data.pairs,
      users: data.participants,
      active_pair: data.active_pair,
    }

    participant_action = %{
      action: %{
        type: "SUBMIT_ANSWER",
        logs: data.pairs[participant.pair_id].logs,
        own_data: data.participants[id],
      }
    }
    
    buddy_action = %{
      action: %{
        type: "SUBMIT_ANSWER",
        logs: data.pairs[participant.pair_id].logs,
        own_data: data.participants[buddy_id],
      }
    }
 
    {:ok, %{"data" => data, "host" => %{action: host_action}, 
      "participant" => %{id => participant_action, buddy_id => buddy_action}}}
  end

  def handle_received(data, %{"action" => "finish description"}, id) do
    unless data.participants[id].is_finish_description do
      data = %{data | finish_description: data.finish_description+1}
      data = put_in(data.participants[id].is_finish_description, true)
    end
    action = %{
      type: "FINISH_DESCRIPTION",
      finish_description: data.finish_description,
      users: data.participants,
    }
    {:ok, %{"data" => data, "host" => %{action: action}}}
  end

  def handle_received(data, %{"action" => "update snum", "params" => params}, id) do
    data = data |> put_in([:participants, id, :snum], params)
    haction = %{
      type: "UPDATE_SNUM",
      id: id,
      own_data: data.participants[id],
    }
    paction = %{
      type: "UPDATE_SNUM",
      own_data: data.participants[id],
    }
    {:ok, %{"data" => data, "host" => %{action: haction}, "participant" => %{id => %{action: paction}}}}
  end

  def handle_received(data, _action, _id) do
    {:ok, %{"data" => data}}
  end

  def dispatch_to_all(participants, action) , do: Enum.map(participants, fn {id, _} ->
    {id, %{action: action}} end) |> Enum.into(%{})
end
