"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";

export interface TodoType {
    id: number;
    title: string;
}

interface TodosContextState {
    todos: TodoType[];
    addTodo: (todoTitle: string) => void;
    removeTodo: (todo: TodoType) => void;
    updateTodo: (todoTitle: string) => void;
    setToUpdate: (todo: TodoType) => void;
}

const TodosContext = createContext<TodosContextState | undefined>(
    undefined,
);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
    const [id, setId] = useState<number>(3);
    const [todos, setTodos] = useState<TodoType[]>([
        { id: 0, title: "Learn React" },
        { id: 1, title: "Learn Node" },
    ]);
    const [toUpdate, setToUpdate] = useState<TodoType | null>(null);

    const addTodo = (todoTitle: string) => {
        const newTodo = { id: id, title: todoTitle };
        setId((curId) => curId + 1);
        setTodos((prevList) => [...prevList, newTodo]);
    };

    const removeTodo = (todo: TodoType) => {
        setTodos((prevList) => prevList.filter((currentTodo) => currentTodo.id !== todo.id));
    }

    const updateTodo = (todoTitle: string) => {
        if (toUpdate) {
            setTodos((prevList) => prevList.map((currentTodo) => 
                currentTodo.id === toUpdate.id ? {...toUpdate, title: todoTitle} : currentTodo));
        }
    }

    const value: TodosContextState = {
        todos, 
        addTodo,
        removeTodo,
        updateTodo,
        setToUpdate,
    };

    return (
        <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
    );
};

export const useTodos = () => {
    const context = useContext(TodosContext);
    if (!context) throw new Error("Invalid todos context.");
    return context;
}