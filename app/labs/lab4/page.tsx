"use client"
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

export default function Lab4() {

    // for PassingFunctions
    function sayHello() {
        alert("Hello");
    }

    return (
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
        </div>
    );
}