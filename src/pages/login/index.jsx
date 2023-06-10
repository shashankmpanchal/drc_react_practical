import { useContext } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { InitialLoginData, LoginSchema } from "./loginFormik";
import { AuthContext } from "../context";

const Login = () => {
  const state = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /**
   * Login function
   * @param {email, password} loginInfo
   * Handling validations errors
   */
  const authLogin = (loginInfo) => {
    const userList = state.state.user;
    const isUserExists = userList.find(
      (user) =>
        user.email === loginInfo.email && user.password === loginInfo.password
    );
    if (!isUserExists) {
      loginHandler.setFieldError("email", "Email or password incorrect!");
      loginHandler.setFieldError("password", "Password or email incorrect!");
    } else {
      const { id, name, email } = isUserExists;
      dispatch({
        type: "AUTH",
        payload: {
          id,
          name,
          email,
        },
      });
      navigate("/dashboard");
    }
  };

  const loginHandler = useFormik({
    initialValues: InitialLoginData,
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      authLogin(values);
    },
  });

  const { handleBlur, handleChange, values, handleSubmit, errors, touched } =
    loginHandler;

  return (
    <section className="h-screen">
      <div className="h-full">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-start-2 mb-12 md:mb-0">
            <form onSubmit={handleSubmit} className="flex flex-col p-12 gap-4">
              <h2 className="text-center">
                <strong>Login</strong> an account
              </h2>
              <div className="text-left">
                <Label
                  htmlFor="email"
                  value="Email"
                  color={errors.email && touched.email ? "failure" : ""}
                />
                <TextInput
                  id="email"
                  type="email"
                  name="email"
                  placeholder="name@flowbite.com"
                  value={values.email}
                  color={errors.email && touched.email ? "failure" : ""}
                  helperText={errors.email && touched.email ? errors.email : ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className="text-left">
                <Label
                  htmlFor="password"
                  value="Password"
                  color={errors.password && touched.password ? "failure" : ""}
                />
                <TextInput
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={values.password}
                  color={errors.password && touched.password ? "failure" : ""}
                  helperText={
                    errors.password && touched.password ? errors.password : ""
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <Button type="submit" className="mb-3">
                Login
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
