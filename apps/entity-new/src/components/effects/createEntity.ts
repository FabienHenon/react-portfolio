import { useState } from "react";
import { Events } from "../../types";
import { Entity } from "../resources/entity";
import { EntityPayload } from "../resources/entityPayload";
import { postEntity } from "../requests/postEntity";
import { useAsyncTask, AsyncTask } from "react-hooks-async";


type Result = [
  AsyncTask<Entity, [EntityPayload, (state: string) => string, Events]>,
  (e: EntityPayload) => void
];

const useCreateEntity = (
  eventNameForEntity: (state: string) => string,
  events: Events
): Result => {
  const task = useAsyncTask(postEntity);

  const createEntity = async (payload: EntityPayload) => {
    task.start(payload, eventNameForEntity, events);
  };

  return [task, createEntity];
};

export default useCreateEntity;
