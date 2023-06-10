import * as Yup from "yup";

export const InitialTodoData = {
  title: "",
  description: "",
};

export const TodoSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string()
    .required("Description is required")
    .max(100, "Max limit 100 char"),
});
