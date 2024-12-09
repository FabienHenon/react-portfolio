import { useEffect, useState } from "react";
import { Events } from "../../types";
import { Entity } from "../resources/entity";
import { EntityPayload } from "../resources/entityPayload";
import { putEntity } from "../requests/putEntity";
import { getEntity } from "../requests/getEntity";
import { useAsyncTask, AsyncTask } from "react-hooks-async";

type Result = [
  AsyncTask<Entity, [string, (state: string) => string, Events, (values?: Record<string, any>) => void]>,
  AsyncTask<Entity, [string, EntityPayload, (state: string) => string, Events]>,
  (e: EntityPayload) => void
];

const useUpdateEntity = (id: string, eventNameForEntity: (state: string) => string, events: Events, resetForm: (values?: Record<string, any>) => void): Result => {
  const task = useAsyncTask(getEntity);
  useEffect(() => {
    if (id) {
      task.start(id, eventNameForEntity, events, resetForm);
    }
  }, [id]);

  const updateTask = useAsyncTask(putEntity);

  const updateEntity = (payload: EntityPayload) => {
    updateTask.start(id, payload, eventNameForEntity, events);
  };

  return [task, updateTask, updateEntity];
};

export default useUpdateEntity;
