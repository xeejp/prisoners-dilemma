defmodule PrisonersDilemma do
  use Xee.ThemeScript
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
       finish_description: 0,
       message: %{
         waiting: "",
         description: [
           %{id: 0, text: "A"},
           %{id: 1, text: "B"},
           %{id: 2, text: "C"},
         ],
         experiment: [
         ],
       },
       joined: 0,
     }}}
  end

  def new_participant() do
    %{
      status: nil,
      is_join: false,
      point: 0,
      is_finish_description: false,
      pair: nil,
    }
  end

  def new_pair(members) do
    %{
      members: members,
      current_round: 1,
    }
  end

  def match(data) do
    %{ participants: participants } = data
    participant = participants
                  |>Enum.map(fn({id, state}) ->
                  {id, %{ 
                    role: "User1",
                    point: 0,
                    pair: nil,
                  }}
                  end)
                  |>Enum.into(%{})
    group_size = 2
    pairs = participants
            |>Enum.map(&elem(&1, 0))
            |>Enum.shuffle
            |>Enum.chunk(group_size)
            |>Enum.map_reduce(1, fn(p, acc) -> {{Integer.to_string(acc), p}, acc + 1}end) |> elem(0)
            |>Enum.into(%{})

    updater = fn participant, pair, role ->
      %{ participant |
        role: role,
        point: 0,
        pair: pair
      }
    end

    reducer = fn {group, ids}, {participants, pairs} ->
      [id1, id2] = ids
      participants = participants 
                      |>Map.update!(id1, &updater.(&1, group, "User1"))
                      |>Map.update!(id2, &updater.(&1, group, "User2"))
      pairs = Map.put(pairs, group, new_pair(ids))
      {participants, pairs}
    end
    acc = {participants, %{}}
    {participants, pairs}

    %{data | participants: participants, pairs: pairs}
  end

  def join(%{participants: participants} = data, id) do
    unless Map.has_key?(participants, id) do
      participant = new_participant()
      unless data.page == "experiment" do
        participant = %{ participant | is_join: true }
      end
      participants = Map.put(participants, id, participant)
      data = %{data | participants: participants}
      unless data.page == "experiment" do
        data = %{data | joined: Map.size(participants)}
      end
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
      participants = Enum.map(data.participants, fn {id, _} ->
        {id, new_participant()} end) |> Enum.into(%{})
      data = %{data | participants: participants}
    end
    if data.page == "description" do
      data = %{data | finish_description: 0}
    end
    host_action = %{
      type: "CHANGE_PAGE",
      page: data.page,
      message: data.message,
      users: data.participants,
      joined: data.joined,
      finish_description: data.finish_description,
    }
    participant_action = Enum.map(data.participants, fn {id, _} ->
      {id, %{action: %{
         type: "CHANGE_PAGE",
         page: data.page,
         message: data.message,
         status: data.participants[id].status,
         joined: data.joined,
       }}} end) |> Enum.into(%{})
     {:ok, %{"data" => data, "host" => %{action: host_action}, "participant" => participant_action}}
  end

  def handle_received(data, %{"action" => "update message", "params" => params}) do
    data = %{data | message: params}
    action = %{
      type: "UPDATE_MESSAGE",
      message: data.message,
    }
    {:ok, %{"data" => data, "host" => %{action: action}, "participant" => dispatch_to_all(data.participants, action)}}
  end

  def handle_received(data, %{"action" => "fetch contents"}, id) do
    action = %{
      type: "FETCH_CONTENTS",
      page: data.page,
      message: data.message,
      status: data.participants[id].status,
      joined: data.joined,
    }
    {:ok, %{"data" => data, "participant" => %{id => %{action: action}}}}
  end

  def handle_received(data, %{"action" => "submit answer", "params" => params}, id) do
    {:ok, %{"data" => data}}
  end

  def handle_received(data, %{"action" => "finish description"}, id) do
    Logger.debug "finish description"
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

  def handle_received(data, _action, _id) do
    {:ok, %{"data" => data}}
  end

  def dispatch_to_all(participants, action) , do: Enum.map(participants, fn {id, _} ->
    {id, %{action: action}} end) |> Enum.into(%{})
end
