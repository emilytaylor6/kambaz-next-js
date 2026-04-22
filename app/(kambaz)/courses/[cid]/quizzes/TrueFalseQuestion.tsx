"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react"
import { FormCheck } from "react-bootstrap";

export default function TrueFalseQuestion({ question, questionIndex, userSelected, setUserSelected, showResult, showCorrectAnswers } : 
    { question: any, questionIndex: number, userSelected?: any, setUserSelected?: (answer: any) => void, showResult?: boolean, showCorrectAnswers?: boolean }) {

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
                    onChange={() => !showResult && setSelected("true")}
                />
                <span className={showCorrectAnswers && question.trueFalseAnswer === "true" ? "text-success fw-bold" : ""}>True</span>
            </div>
            <div className="d-flex align-items-center gap-2 mb-2">
                <FormCheck
                    type="radio"
                    name={`true-false-answer-${questionIndex}`}
                    checked={selected === "false"}
                    onChange={() => !showResult && setSelected("false")}
                />
                <span className={showCorrectAnswers && question.trueFalseAnswer === "false" ? "text-success fw-bold" : ""}>False</span>
            </div>
        </div>
    );
}