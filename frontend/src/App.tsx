import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import axios from "axios";

// CSS
import "antd/dist/antd.css";

//Components
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import UpdateTodo from "./components/UpdateTodo";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [pageNum, setPageNum] = useState<number>(1)

  useEffect(() => {
    fetchTasks(pageNum);
  }, []);

  const fetchTasks = async (page: number) => {
    await axios
      .get("http://localhost:8000/api/todo_api/?page=" + page)
      .then((res) => setTodos(res.data));
  };

  const taskToggle: ToggleTask = (selectedTask) => {
    axios
      .get("http://localhost:8000/api/toggleTask/" + selectedTask.id)
      .then((res) => {
        console.log(res);
        fetchTasks(pageNum);
      });
  };

  const addTodo: AddTask = (newTodo) => {
    newTodo.trim() !== "" &&
    axios
      .post("http://localhost:8000/api/todo_api/", {
        text: newTodo,
        complete: false,
      })
      .then((res) => {
        console.log(res);
        fetchTasks(pageNum);
      });
  };

  const deleteTask: DeleteTask = async (id) => {
    await axios.delete("http://localhost:8000/api/todo_api/" + id + '/').then((res) => {
      console.log(res);
      fetchTasks(pageNum).then(r => console.log(r));
    });
  };

  const changePage = (action: string) => {
    if (action === 'next') {
      fetchTasks(pageNum + 1)
      setPageNum(pageNum + 1)
      console.log(pageNum)
    }
    if (action === 'previous') {
      fetchTasks(pageNum - 1)
      setPageNum(pageNum - 1)

    }
  }

  return (
    <>
      <Router>
        <Switch>
          <Route
            exact
            path={"/"}
            component={() => <AddTodo addTodo={addTodo}/>}
          />
          <Route exact path={"/updateTask/:id"} component={UpdateTodo}/>
        </Switch>

        <TodoList
          todos={todos}
          toggleTask={taskToggle}
          deleteTask={deleteTask}
          changePage={changePage}
          pageNum={pageNum}
        />
      </Router>
    </>
  );
};

export default App;
