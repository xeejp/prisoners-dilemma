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
       join_experiment: 0,
     }}}
  end

  def new_participant(isactive) do
    if isactive do
      %{
        status: nil,
      }
    else
      %{
        status: "noactive"
      }
    end
  end

  def join(%{participants: participants} = data, id) do
    unless Map.has_key?(participants, id) do
      participant = if data.page == "experiment" do
        new_participant(false)
      else
        new_participant(true)
      end
      participants = Map.put(participants, id, participant)
      data = %{data | participants: participants}
      unless data.page == "experiment" do
        data = %{data | join_experiment: Map.size(participants)}
      end
      action = %{
        type: "ADD_USER",
        id: id,
        users: participants,
      }
      participant_action = %{
        type: "ADD_USER",
        join_experiment: data.join_experiment,
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
      data = Map.put(data, :join_experiment, Map.size(data.participants))
      data = Map.put(data, :ans_programmer, 0) |> Map.put(:ans_banker, 0) |> Map.put(:ans_each, 0)
      participants = Enum.map(data.participants, fn {id, _} ->
        {id, new_participant(true)} end) |> Enum.into(%{})
       data = %{data | participants: participants}
    end
    host_action = %{
      type: "CHANGE_PAGE",
      page: data.page,
      message: data.message,
      users: data.participants,
      join_experiment: data.join_experiment,
    }
    participant_action = Enum.map(data.participants, fn {id, _} ->
      {id, %{action: %{
         type: "CHANGE_PAGE",
         page: data.page,
         message: data.message,
         status: data.participants[id].status,
         join_experiment: data.join_experiment,
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
      join_experiment: data.join_experiment,
    }
    {:ok, %{"data" => data, "participant" => %{id => %{action: action}}}}
  end

  def handle_received(data, %{"action" => "submit answer", "params" => params}, id) do
    {:ok, %{"data" => data}}
  end

  def handle_received(data, _action, _id) do
    {:ok, %{"data" => data}}
  end

  def dispatch_to_all(participants, action) , do: Enum.map(participants, fn {id, _} ->
    {id, %{action: action}} end) |> Enum.into(%{})
end
