import { Entity } from "../resources/entity";
import jsonapi from "ts-jsonapi";

interface JsonApi {
  data: {
    id: string;
    type: string;
    attributes: any;
  };
}

export const decode = (data: JsonApi): Entity => {
  return new jsonapi.Deserializer().deserialize(data);
};
