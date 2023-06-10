/* eslint-disable react/prop-types */
import { Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const CardComponent = ({ todoList }) => {
  const navigate = useNavigate();
  return (
    <>
      {todoList.length > 0 ? (
        <div className="grid grid-cols-4 gap-4">
          {todoList.map((todo) => (
            <Card
              key={todo.title}
              className="transition-all cursor-pointer justify-start-content hover:bg-gray-200 hover:text-gray-800"
            >
              <h5 className="flex gap-2 justify-between items-center text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                <p>{todo.title}</p>
                <span
                  title="Edit"
                  className="px-3 py-2 text-xs font-medium transition-all rounded-md bg-red-300 text-black hover:bg-red-700 hover:text-white"
                  onClick={() => navigate(`/todo/${todo.id}`)}
                >
                  Edit
                </span>
              </h5>
              <p className="text-[14px] truncate">{todo.description}</p>
              <p className="text-[14px]">{todo.date}</p>
            </Card>
          ))}
        </div>
      ) : (
        <p className="p-3 rounded-md text-center transition-all bg-gray-100">
          No todo found
        </p>
      )}
    </>
  );
};

export default CardComponent;
