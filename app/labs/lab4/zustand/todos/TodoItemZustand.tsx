import { ListGroupItem, Button } from "react-bootstrap";
import { TodoZustandType } from "./useTodoStore";

export default function TodoItemContext({ todo, deleteTodo, setToUpdate }: {
  todo: TodoZustandType;
  deleteTodo: (todo: TodoZustandType) => void;
  setToUpdate: (todo: TodoZustandType) => void;
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