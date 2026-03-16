"use client"
import { ListGroupItem, Button, FormControl } from "react-bootstrap";
import { useState } from "react";
import { TodoZustandType } from "./useTodoStore";

export default function TodoFormZustand({ addTodo, updateTodo }: {
  addTodo: (todoTitle: string) => void;
  updateTodo: (todoTitle: string) => void;
}) {
    const [currentTodo, setTodo] = useState<TodoZustandType>({ id: 2, title: "Learn Mongo"});

  return (
    <ListGroupItem>
      <Button onClick={() => addTodo(currentTodo.title)}
              id="wd-add-todo-click"> Add </Button>
      <Button onClick={() => updateTodo(currentTodo.title)}
              id="wd-update-todo-click"> Update </Button>
      <FormControl
        defaultValue={currentTodo.title}
        onChange={(e) => (setTodo({ ...currentTodo, title: e.target.value }))}/>
    </ListGroupItem>
);}
