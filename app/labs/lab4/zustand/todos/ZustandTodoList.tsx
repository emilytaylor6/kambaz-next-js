import { ListGroup } from "react-bootstrap";
import { TodoZustandType, useTodoStore } from "./useTodoStore";
import TodoFormZustand from "./TodoFormZustand";
import TodoItemZustand from "./TodoItemZustand";

export default function ZustandTodoList() {
    const { todos, addTodo, removeTodo, updateTodo, setToUpdate } = useTodoStore((state) => state,);

    return(     
    <div>
      <h2>Todo List</h2>
      <ListGroup>
        <TodoFormZustand addTodo={addTodo} updateTodo={updateTodo} />
        {todos.map((todo: TodoZustandType) => (
            <TodoItemZustand key={todo.id} todo={todo} deleteTodo={removeTodo} setToUpdate={setToUpdate} />
        ))}
      </ListGroup>
      <hr/>
    </div>
)
}