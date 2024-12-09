import { Events } from "../../types";
import { Entity } from "../resources/entity";
import { getEntity } from "../requests/getEntity";
import { useAsyncTask, AsyncTask } from "react-hooks-async";
import { useEffect } from "react";

type Result = AsyncTask<Entity, [string, (state: string) => string, Events]>;

const useFetchEntity = (id: string, eventNameForEntity: (state: string) => string, events: Events): Result => {
  const task = useAsyncTask(getEntity);
  useEffect(() => {
    if (id) {
      task.start(id, eventNameForEntity, events);
    }
  }, [id]);

  return task;
};

export default useFetchEntity;
