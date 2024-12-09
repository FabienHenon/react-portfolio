import axios from "axios";
import { Entities } from "../resources/entity";
import { decode } from "../decoders/entities";
import { Events } from "../../types";

export async function getEntities({ signal }: AbortController, eventNameForEntity: (state: string) => string, events: Events): Promise<Entities> {
  try {
    return await axios
      ({
        method: 'GET',
        url: `${process.env.API_BASE_URL}/api/users`,
        headers: {
          'Accept': 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json'
        }
      })
      .then(res => decode(res.data))
      .then((entities: Entities) => {
        events.emit(eventNameForEntity('fetched'), {});
        return entities;
      })
      .catch((err: any) => {
        events.emit(eventNameForEntity('not-fetched'), {});
        throw err;
      });
  } catch (error) {
    return Promise.reject("Error while fetching entities");
  }
}
