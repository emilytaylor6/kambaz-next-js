"use client"
import Link from "next/link";
import ArrayStateVariable from "./ArrayStateVariable";
import BooleanStateVariables from "./BooleanStateVariables";
import ClickEvent from "./ClickEvent";
import Counter from "./Counter";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import UrlEncoding from "./query-parameters";
import StringStateVariables from "./StringStateVariables";
import store from "./store";
import { Provider } from "react-redux";
import ReduxExamples from "./redux/page";
import ReactContextExamples from "./react-context/page";

export default function Lab4() {

    // for PassingFunctions
    function sayHello() {
        alert("Hello");
    }

    return (
        <Provider store={store}>
        <div>
            <h2>Lab 4</h2>

            {/* 4.2 */}
            {/* User Events */}
            <ClickEvent />
            <PassingDataOnEvent />
            <PassingFunctions theFunction={sayHello} />

            {/* Component State */}
            <Counter />
            <BooleanStateVariables />
            <StringStateVariables />
            <DateStateVariable />
            <ObjectStateVariable />
            <ArrayStateVariable />
            <ParentStateComponent /> 
            {/* ParentStateComponent calls ChildStateComponent */}

            {/* Encoding State in URL */}
            <UrlEncoding />

            {/* 4.3 */}
            <Link href="./redux">Redux Examples</Link>
            <ReduxExamples />
            <hr />

            {/* 4.4 */}
            <Link href="./react-context">React Context Examples</Link>
            <ReactContextExamples />

        </div>
        </Provider>
    );
}