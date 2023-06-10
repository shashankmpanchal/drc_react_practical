import { Button } from "flowbite-react";
import CardComponent from "../../components/card";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { auth, todos: todoList } = useSelector((state) => state.store);
  const navigate = useNavigate();
  const [userTodoList, setUserTodoList] = useState([]);

  /**
   * Filter todo list based on auth user id from todo list.
   */

  useEffect(() => {
    function filterTodoByUserId() {
      const filterTodoList = todoList.filter(
        (todo) => parseInt(todo.user_id) === parseInt(auth.id)
      );
      setUserTodoList(filterTodoList);
    }

    filterTodoByUserId();
  }, [setUserTodoList, todoList]);

  return (
    <>
      <div className="mb-3 text-xl font-bold">Dashboard</div>
      <div className="w-full flex justify-between text-lg pb-3 mb-4 border-b-[2px] border-gray-300">
        <span>Todo List</span>
        <Button
          size="sm"
          title="Add todo"
          className="transition-all rounded-md bg-green-600 text-white hover:bg-green-800"
          onClick={() => navigate("/todo")}
        >
          Add Todo
        </Button>
      </div>
      <CardComponent todoList={userTodoList} />
    </>
  );
};

export default Dashboard;
