import { Events } from "../../types";
import { Entities } from "../resources/entity";
import { getEntities } from "../requests/getEntities";
import { useAsyncTask, useAsyncRun, AsyncTask } from "react-hooks-async";

type Result = AsyncTask<Entities, [(state: string) => string, Events]>;

const useFetchEntities = (eventNameForEntity: (state: string) => string, events: Events): Result => {
  const task = useAsyncTask(getEntities);

  useAsyncRun(task, eventNameForEntity, events);

  return task;
};

export default useFetchEntities;
