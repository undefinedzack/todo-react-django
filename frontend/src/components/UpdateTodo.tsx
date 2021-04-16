import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {RouteComponentProps} from "react-router";
import {EditFilled} from '@ant-design/icons'
import axios from "axios";

interface UpdateTodoInterface {
  id: string
}

const UpdateTodo = ({match, history}: RouteComponentProps<UpdateTodoInterface>) => {
  const [taskToUpdate, setTaskToUpdate] = useState({text: ""});

  useEffect(() => {
    console.log(match.params.id)
    axios.get("http://localhost:8000/api/todo_api/" + match.params.id + '/')
      .then(res => {
        console.log(res)
        setTaskToUpdate(res.data)
      })
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskToUpdate({
      ...taskToUpdate,
      text: e.target.value
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.put('http://localhost:8000/api/todo_api/' + match.params.id + '/', taskToUpdate)
      .then(res => console.log(res))
    history.push('/')

  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-12 mt-5 mb-5">
          <div className="col-span-6 flex justify-center md:col-start-4">
            <input
              className="bg-gray-100 px-8 h-14 w-11/12 focus:ring-indigo-500 focus:border-indigo-500 shadow-lg sm:text-sm border-gray-300 rounded-md"
              type="text"
              value={taskToUpdate.text}
              placeholder={"just do it!"}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-2 flex items-center">
            <button
              type="submit"
              className="bg-pink-300 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-full flex align-middle"
            >
              <EditFilled/>
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default UpdateTodo;
