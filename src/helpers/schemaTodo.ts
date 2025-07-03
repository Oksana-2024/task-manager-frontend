import { object, string } from "yup";

export const schema = object().shape({
  title: string().max(20, "Max. length is 20 symbols").required(),
  description: string().max(50, "Max. length is 250 symbols"),
});
