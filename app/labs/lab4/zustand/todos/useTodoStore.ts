import { create } from "zustand";

export interface TodoZustandType {
    id: number;
    title: string;
}

interface TodosZustandState {
    todos: TodoZustandType[];
    idNum: number;
    toUpdate: TodoZustandType | null;
    addTodo: (todoTitle: string) => void;
    removeTodo: (todo: TodoZustandType) => void;
    updateTodo: (todoTitle: string) => void;
    setToUpdate: (todo: TodoZustandType) => void;
}

export const useTodoStore = create<TodosZustandState>((set) => ({
    todos: [{ id: 0, title: "Learn React" }, { id: 1, title: "Learn Node" }],
    idNum: 2,
    toUpdate: null,
    addTodo: (todoTitle: string) => set((state) => ( { 
        todos: [...state.todos, { id: state.idNum, title: todoTitle }],
        idNum: state.idNum + 1,
    })),
    removeTodo: (todo: TodoZustandType) => set((state) => ({
        todos: state.todos.filter((currentTodo) => currentTodo.id !== todo.id),
    })),
    updateTodo: (todoTitle: string) => set((state) => ({
        todos: state.toUpdate ? state.todos.map((currentTodo) => 
                currentTodo.id === state.toUpdate?.id ? { id: state.toUpdate?.id, title: todoTitle} : currentTodo) : state.todos,
    })),
    setToUpdate: (todo: TodoZustandType) => set({
        toUpdate: todo,
    }),
}));