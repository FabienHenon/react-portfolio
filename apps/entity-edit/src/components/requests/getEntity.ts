import axios from "axios";
import { Entity } from "../resources/entity";
import { decode } from "../decoders/entity";
import { Events } from "../../types";

export async function getEntity({ signal }: AbortController, id: string, eventNameForEntity: (state: string) => string, events: Events, resetForm: (values?: Record<string, any>) => void): Promise<Entity> {
  if (!id) {
    return Promise.reject("Id not specified");
  }
  try {
    return await axios
      ({
        method: 'GET',
        url: `${process.env.API_BASE_URL}/api/users/${id}`,
        headers: {
          'Accept': 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json'
        }
      })
      .then(res => decode(res.data))
      .then((entity: Entity) => {
        events.emit(eventNameForEntity('fetched'), { id });
        resetForm(entity);
        return entity;
      })
      .catch((err: any) => {
        events.emit(eventNameForEntity('not-fetched'), { id });
        throw err;
      });
  } catch (error) {
    return Promise.reject("Error while fetching entity");
  }
}
