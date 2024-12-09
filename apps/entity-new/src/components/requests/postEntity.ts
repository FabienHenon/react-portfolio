import axios from "axios";
import { Entity } from "../resources/entity";
import { EntityPayload } from "../resources/entityPayload";
import { decode } from "../decoders/entity";
import { encode } from "../encoders/payload";
import { Events } from "../../types";

export async function postEntity({ signal }: AbortController, payload: EntityPayload, eventNameForEntity: (state: string) => string, events: Events): Promise<Entity> {
  try {
    return await axios
      ({
        method: 'POST',
        url: `${process.env.API_BASE_URL}/api/users`,
        data: encode(payload),
        headers: {
          'Accept': 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json'
        }
      })
      .then(res => decode(res.data))
      .then((entity: Entity) => {
        events.emit(eventNameForEntity("created"), { id: entity.id });
        return entity;
      })
      .catch((err: any) => {
        events.emit(eventNameForEntity("not-created"), {});
        throw err;
      });
  } catch (error) {
    return Promise.reject("Error while creating entity");
  }
}
