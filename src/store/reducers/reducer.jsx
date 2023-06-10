/**
 * Define static users list.
 * Define isLoggedIn flag.
 * Define loggedIn user details.
 * Define todo list array.
 */

const initialState = {
  user: [
    {
      id: 1,
      name: "Kay Dashiell",
      email: "kay_dashiell@yopmail.com",
      password: "kay_dashiell@123",
    },
    {
      id: 2,
      name: "Staci Palmer",
      email: "staci_palmer@yopmail.com",
      password: "staci_palmer@123",
    },
    {
      id: 3,
      name: "Robert Pelletier",
      email: "robert_pelletier@yopmail.com",
      password: "robert_pelletier@123",
    },
    {
      id: 4,
      name: "Alvin Eisen",
      email: "alvin_eisen@yopmail.com",
      password: "alvin_eisen@123",
    },
  ],
  auth: JSON.parse(localStorage.getItem("auth")) ?? null,
  isLoggedIn: Boolean(localStorage.getItem("isLoggedIn")) ?? false,
  todos:
    localStorage.getItem("todo") === "" ||
    localStorage.getItem("todo") === "undefined"
      ? []
      : JSON.parse(localStorage.getItem("todo")),
};

export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH": {
      const data = {
        email: action.payload.email,
        name: action.payload.name,
        id: action.payload.id,
      };
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("auth", JSON.stringify(data));
      return {
        ...state,
        auth: data,
        isLoggedIn: true,
      };
    }
    case "LOGOUT": {
      localStorage.removeItem("auth");
      localStorage.removeItem("isLoggedIn");
      return {
        ...state,
        auth: null,
        isLoggedIn: false,
      };
    }
    case "TODO": {
      const todos = {
        id: state.todos.length + 1,
        ...action.payload,
      };
      const updateTodoList = [...state.todos, todos];
      localStorage.setItem("todo", JSON.stringify(updateTodoList));
      return {
        ...state,
        todos: updateTodoList,
      };
    }
    case "UPDATE_TODO": {
      localStorage.setItem("todo", JSON.stringify(action.payload));
      return {
        ...state,
        todos: action.payload,
      };
    }
    default:
      return state;
  }
};
