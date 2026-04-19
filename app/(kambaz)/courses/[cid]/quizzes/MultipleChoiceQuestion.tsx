"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react"
import { FormCheck } from "react-bootstrap";

export default function MultipleChoiceQuestion({ question, questionIndex, userSelected, setUserSelected } : 
    { question: any, questionIndex: number, userSelected?: any, setUserSelected?: (answer: any) => void }) {

    const [editingSelected, setEditingSelected] = useState<number | null>(null);
    const selected = userSelected ?? editingSelected;
    const setSelected = setUserSelected ?? setEditingSelected;

    const choices = question.multipleChoiceAnswers || [];

    return (
        <div className="wd-multiple-choice-question">
            <b>{question.title}</b><br/>
            <p>{question.question}</p><br/>
            <b>Answers:</b>
            {choices.map((choice: any, index: number) => (
                <div key={index} className="d-flex align-items-center gap-2 mb-2">
                    <FormCheck
                        type="radio"
                        name={`multiple-choice-answer-${questionIndex}`}
                        checked={selected === index}
                        onChange={() => setSelected(index)}
                    />
                    <span>{choice.choice}</span>
                </div>
            ))}
        </div>
    );
}