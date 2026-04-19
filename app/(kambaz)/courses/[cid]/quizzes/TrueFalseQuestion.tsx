"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react"
import { FormCheck } from "react-bootstrap";

export default function TrueFalseQuestion({ question, questionIndex, userSelected, setUserSelected } : 
    { question: any, questionIndex: number, userSelected?: any, setUserSelected?: (answer: any) => void }) {

    const [editingSelected, setEditingSelected] = useState<string | null>(null);
    const selected = userSelected ?? editingSelected;
    const setSelected = setUserSelected ?? setEditingSelected;
    
    return (
        <div className="wd-true-false-question">
            <b>{question.title}</b><br/>
            <p>{question.question}</p><br/>
            <b>Answers:</b>
            <div className="d-flex align-items-center gap-2 mb-2">
                <FormCheck
                    type="radio"
                    name={`true-false-answer-${questionIndex}`}
                    checked={selected === "true"}
                    onChange={() => setSelected("true")}
                />
                <span>True</span>
            </div>
            <div className="d-flex align-items-center gap-2 mb-2">
                <FormCheck
                    type="radio"
                    name={`true-false-answer-${questionIndex}`}
                    checked={selected === "false"}
                    onChange={() => setSelected("false")}
                />
                <span>False</span>
            </div>
        </div>
    );
}