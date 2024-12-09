import * as yup from "yup";

export const EntitySchema = yup.object().shape({
  firstname: yup.string().required(),
  lastname: yup.string().required()
});
