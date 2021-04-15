type Todo = {
    id: number,
    text: string,
    complete: boolean
}

type ToggleTask = (selectedTask: Todo) => void

type AddTask = (newTodo: string) => void
type DeleteTask = (id: number) => void
type UpdateTask = (todo: Todo) => void