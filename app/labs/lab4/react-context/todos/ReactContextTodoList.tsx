import { ListGroup } from "react-bootstrap";
import { TodoType, useTodos } from "./todosContext";
import TodoFormContext from "./TodoFormContext";
import TodoItemContext from "./TodoItemContext";

export default function ReactContextTodoList() {
    const { todos, addTodo, removeTodo, updateTodo, setToUpdate } = useTodos();

    return(     
    <div>
      <h2>Todo List</h2>
      <ListGroup>
        <TodoFormContext addTodo={addTodo} updateTodo={updateTodo} />
        {todos.map((todo: TodoType) => (
            <TodoItemContext key={todo.id} todo={todo} deleteTodo={removeTodo} setToUpdate={setToUpdate} />
        ))}
      </ListGroup>
      <hr/>
    </div>
)
}