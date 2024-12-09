import { Entities } from "../resources/entity";
import jsonapi from "ts-jsonapi";

interface JsonApi {
  data:
  {
    id: string;
    type: string;
    attributes: any;
  }[];
}

export const decode = (data: JsonApi): Entities => {
  return new jsonapi.Deserializer().deserialize(data);
};
