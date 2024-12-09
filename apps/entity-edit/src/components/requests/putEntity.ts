import axios from "axios";
import { Entity } from "../resources/entity";
import { EntityPayload } from "../resources/entityPayload";
import { decode } from "../decoders/entity";
import { encode } from "../encoders/payload";
import { Events } from "../../types";

export async function putEntity({ signal }: AbortController, id: string, payload: EntityPayload, eventNameForEntity: (state: string) => string, events: Events): Promise<Entity> {
  if (!id) {
    return Promise.reject("Id not specified");
  }
  try {
    return await axios
      ({
        method: 'PUT',
        url: `${process.env.API_BASE_URL}/api/users/${id}`,
        data: encode(payload),
        headers: {
          'Accept': 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json'
        }
      })
      .then(res => decode(res.data))
      .then((entity: Entity) => {
        events.emit(eventNameForEntity('updated'), { id: entity.id });
        return entity;
      })
      .catch((err: any) => {
        events.emit(eventNameForEntity('not-updated'), { id });
        throw err;
      });
  } catch (error) {
    return Promise.reject("Error while updating entity");
  }
}

