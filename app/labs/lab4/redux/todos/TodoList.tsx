/* eslint-disable @typescript-eslint/no-explicit-any */
// for book-given code
import { ListGroup } from "react-bootstrap";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

export default function TodoList() {
    const { todos } = useSelector((state: RootState) => state.todosReducer)

  return (
    <div>
      <h2>Todo List</h2>
      <ListGroup>
        <TodoForm />
        {todos.map((todo: any) => (
            <TodoItem key={todo.id} todo={todo} />
        ))}
      </ListGroup>
      <hr/>
    </div>
    );
}