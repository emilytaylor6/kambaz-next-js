"use client"
import ZustandCounter from "./counter";
import ZustandTodoList from "./todos/ZustandTodoList";
import store from "../store";
import { Provider } from "react-redux";

export default function ZustandExamples() {
 return (
  <Provider store={store}>
   <div>
     <h2>Zustand Examples</h2>
     <ZustandCounter />
     <ZustandTodoList />
   </div>
   </Provider>
 );
}
