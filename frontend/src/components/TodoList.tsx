import React, {useState} from "react";
import TodoItem from "./TodoItem";

import {Input} from "antd";
import {SearchOutlined} from '@ant-design/icons';

const suffix = (
  <SearchOutlined
    style={{
      fontSize: 16,
      color: '#b25fff',
    }}
  />
);

interface TodoListInterface {
  todos: Array<Todo>;
  toggleTask: ToggleTask;
  deleteTask: DeleteTask;
  changePage: (action: string) => void;
  pageNum : number
}

const TodoList: React.FC<TodoListInterface> = ({todos, toggleTask, deleteTask, changePage, pageNum}) => {
  const [search, setSearch] = useState("")
  const [showComplete, setShowComplete] = useState(false)
  const [showIncomplete, setShowIncomplete] = useState(false)

  return (
    <>
      <div className={'flex justify-center gap-5'}>
        <button
          className="bg-green-400 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
          onClick={() => {
            setShowIncomplete(false)
            setShowComplete(!showComplete)
          }}
        >
          complete
        </button>
        <button
          className="bg-blue-400 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          onClick={() => {
            setShowComplete(false)
            setShowIncomplete(!showIncomplete)
          }}
        >
          not complete
        </button>
        <button
          className="bg-purple-400 hover:bg-purple-400 text-white font-bold py-2 px-4 border-b-4 border-purple-800 hover:border-purple-500 rounded"
          onClick={() => {
            setShowComplete(false)
            setShowIncomplete(false)
          }}
        >
          all
        </button>
      </div>

      <ul>
        {todos.map((todo) => {
          //search functionality
          if(search === '' || todo.text.toLowerCase().includes(search.toLowerCase())){

            //complete
            if(showComplete && todo.complete){
              return (
                <li key={todo.id}>
                  <div className="flex justify-center">
                    <TodoItem todo={todo} toggleTask={toggleTask} deleteTask={deleteTask} />
                  </div>
                </li>
              );
            }
            //incomplete
            else if(showIncomplete && !todo.complete){
              return (
                <li key={todo.id}>
                  <div className="flex justify-center">
                    <TodoItem todo={todo} toggleTask={toggleTask} deleteTask={deleteTask} />
                  </div>
                </li>
              );
            }
            else if(!showComplete && !showIncomplete){
              return (
                <li key={todo.id}>
                  <div className="flex justify-center">
                    <TodoItem todo={todo} toggleTask={toggleTask} deleteTask={deleteTask} />
                  </div>
                </li>
              );
            }
          }
        })}
      </ul>
      <div className={'flex justify-center mb-5'}>
        <Input placeholder="input search text"
               allowClear style={{width: '40%', height: '47px'}} suffix={suffix}
               value={search} onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className={'flex justify-center'}>
        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <a href="#" onClick={() => changePage('previous')}
             className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            <span className="sr-only">Previous</span>
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                 aria-hidden="true">
              <path fill-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd"/>
            </svg>
          </a>
          <a href="#"
             className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
            {pageNum}
          </a>
        {/*  <a href="#"*/}
        {/*     className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"*/}
        {/*  >*/}
        {/*    2*/}
        {/*  </a>*/}
        {/*  <a href="#"*/}
        {/*     className="hidden md:inline-flex relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">*/}
        {/*    3*/}
        {/*  </a>*/}
        {/*  <span*/}
        {/*    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">*/}
        {/*  ...*/}
        {/*</span>*/}
        {/*  <a href="#"*/}
        {/*     className="hidden md:inline-flex relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">*/}
        {/*    8*/}
        {/*  </a>*/}
        {/*  <a href="#"*/}
        {/*     className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">*/}
        {/*    9*/}
        {/*  </a>*/}
        {/*  <a href="#"*/}
        {/*     className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">*/}
        {/*    10*/}
        {/*  </a>*/}
          <a href="#" onClick={() => changePage('next')}
             className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            <span className="sr-only">Next</span>
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                 aria-hidden="true">
              <path fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"/>
            </svg>
          </a>
        </nav>
      </div>
    </>
  );
};

export default TodoList;
