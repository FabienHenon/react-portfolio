import { EntityPayload } from "../resources/entityPayload";
import jsonapi from "ts-jsonapi";

const EntitySerializer = new jsonapi.Serializer('users', {
  id: 'id',
  attributes: ['firstname', 'lastname']
});

export const encode = (payload: EntityPayload): object => {
  return EntitySerializer.serialize(payload);
};
