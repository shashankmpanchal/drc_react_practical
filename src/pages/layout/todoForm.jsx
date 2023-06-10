import { Button, Label, TextInput, Textarea } from "flowbite-react";
import { useFormik } from "formik";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { InitialTodoData, TodoSchema } from "./todoFormik";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const Todo = () => {
  const { auth, todos } = useSelector((state) => state.store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  /**
   * Define useEffect for handling the edit/update todo.
   * Fetch the record from todo list. And set auto populate value to
   * relevant field.
   * Also handle and set redirection, When auth user can try to access other users todo.
   */

  useEffect(() => {
    if (id) {
      const fetchTodo = todos.find(
        (todo) =>
          parseInt(todo.id) === parseInt(id) &&
          parseInt(todo.user_id) === parseInt(auth.id)
      );
      if (!fetchTodo) {
        alert("Invalid todo id");
        navigate("/dashboard");
        return;
      }
      todoHandler.setFieldValue("title", fetchTodo.title);
      todoHandler.setFieldValue("description", fetchTodo.description);
    }
  }, [id]);

  /**
   * @param {title, description, user_id, date} todoInfo
   * Using manageTodo, Handle add and upate both features.
   */
  const manageTodo = (todoInfo) => {
    if (id) {
      const todoIndex = todos.findIndex(
        (obj) => parseInt(obj.id) === parseInt(id)
      );
      if (todoIndex !== -1) {
        todos[todoIndex]["title"] = todoInfo.title;
        todos[todoIndex]["description"] = todoInfo.description;
        todos[todoIndex]["date"] = todoInfo.date;
      }
      dispatch({ type: "UPDATE_TODO", payload: todos });
    } else {
      dispatch({ type: "TODO", payload: todoInfo });
    }
    navigate("/dashboard");
  };

  const todoHandler = useFormik({
    initialValues: InitialTodoData,
    validationSchema: TodoSchema,
    onSubmit: (values) => {
      const data = {
        ...values,
        user_id: auth?.id ?? "",
        date: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      };
      manageTodo(data);
    },
  });

  const { handleBlur, handleChange, values, handleSubmit, errors, touched } =
    todoHandler;

  return (
    <div className="grid grid-cols-3">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
          {id ? "Edit" : "Add"} Todo
        </h3>
        <div>
          <Label
            htmlFor="title"
            value="Title"
            color={errors.title && touched.title ? "failure" : ""}
          />
          <TextInput
            id="title"
            value={values.title}
            name="title"
            type="text"
            placeholder="Title"
            color={errors.title && touched.title ? "failure" : ""}
            helperText={errors.title && touched.title ? errors.title : ""}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div>
          <Label
            htmlFor="description"
            value="Description"
            color={errors.description && touched.description ? "failure" : ""}
          />
          <Textarea
            id="description"
            name="description"
            defaultValue={values.description}
            placeholder="Description"
            color={errors.description && touched.description ? "failure" : ""}
            rows={4}
            helperText={
              errors.description && touched.description
                ? errors.description
                : ""
            }
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div className="w-full flex gap-3">
          <Button type="submit" className="mb-3">
            {id ? "Update" : "Create"}
          </Button>
          <Button
            type="reset"
            color="gray"
            onClick={() => navigate("/dashboard")}
          >
            Back
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Todo;
