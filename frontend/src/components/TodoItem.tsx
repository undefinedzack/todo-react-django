import React from "react";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";

interface TodoItemInterface {
	todo: Todo;
	toggleTask: ToggleTask;
	deleteTask: DeleteTask;
}

const TodoItem: React.FC<TodoItemInterface> = ({
	todo,
	toggleTask,
	deleteTask,
}) => {
	return (
		<>
			<div className="my-2 p-5 bg-gradient-to-r from-red-100 to-purple-400 shadow-md rounded-lg w-1/3 hover:shadow-xl">
				<label
					style={{ textDecoration: todo.complete ? "line-through" : "none" }}
				>
					<div className="grid grid-cols-12">
						<div className="text-lg font-mono text-gray-500 hover:text-gray-900">
							{todo.id}
						</div>

						<div
							onClick={() => toggleTask(todo)}
							className="flex text-lg justify-center col-span-9 font-large font-mono text-gray-500 hover:text-gray-900"
						>
							{todo.text}
						</div>
						{/* <div className="flex justify-center">
							<input
								className="form-checkbox text-indigo-600"
								type="checkbox"
								checked={todo.complete}
								onChange={() => toggleTask(todo)}
							/>
						</div> */}
						<div className={"flex items-center"}>
							<Link to={"/updateTask/"+todo.id}>
								<EditFilled className={"transform hover:scale-125"} style={{color: '#484848'}} />
							</Link>
						</div>
						<div className={"flex items-center"}>
							<DeleteFilled
								className={"transform hover:scale-125"}
								onClick={() => deleteTask(todo.id)}
							/>
						</div>
					</div>
				</label>
			</div>
		</>
	);
};

export default TodoItem;
