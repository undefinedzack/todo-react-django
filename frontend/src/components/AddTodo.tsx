import React, { ChangeEvent, FormEvent, useState } from "react";

interface AddTodoInterface {
	addTodo: AddTask;
}

const AddTodo: React.FC<AddTodoInterface> = ({ addTodo }) => {
	const [newTask, setNewTask] = useState("");

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTask(e.target.value);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		addTodo(newTask);
		setNewTask("");
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className="grid grid-cols-12 mt-5 mb-5">
					<div className="col-span-6 flex justify-center md:col-start-4">
						<input
							className="bg-gray-100 px-8 h-14 w-11/12 focus:ring-indigo-500 focus:border-indigo-500 shadow-lg sm:text-sm border-gray-300 rounded-md"
							type="text"
							value={newTask}
              placeholder={'just do it!'}
							onChange={(e) => handleChange(e)}
						/>
					</div>
					<div className="col-span-2 flex items-center">
						<button
							type="submit"
							className="bg-pink-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
						>
							+
						</button>
					</div>
				</div>
			</form>
		</>
	);
};

export default AddTodo;
