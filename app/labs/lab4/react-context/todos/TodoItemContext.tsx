import { ListGroupItem, Button } from "react-bootstrap";
import { TodoType } from "./todosContext";
export default function TodoItemContext({ todo, deleteTodo, setToUpdate }: {
  todo: TodoType;
  deleteTodo: (todo: TodoType) => void;
  setToUpdate: (todo: TodoType) => void;
}) {

  return (
    <ListGroupItem key={todo.id}>
      <Button onClick={() => deleteTodo(todo)}
              id="wd-delete-todo-click"> Delete </Button>
      <Button onClick={() => setToUpdate(todo)}
              id="wd-set-todo-click"> Edit </Button>
      {todo.title}    
    </ListGroupItem>
    );
}