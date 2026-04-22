"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react"
import { FormControl } from "react-bootstrap";

export default function FillInTheBlankQuestion({ question, userAnswer, onUserAnswer, showCorrectAnswers } : 
    { question: any, userAnswer?: string, onUserAnswer?: (answer: string) => void, showCorrectAnswers?: boolean }) {

    const [editingAnswer, setEditingAnswer] = useState<string>("");
    const answer = userAnswer ?? editingAnswer;
    const setAnswer = onUserAnswer ?? setEditingAnswer;
    
    return (
        <div className="wd-fill-in-the-blank-question">
            <b>{question.title}</b><br/>
            <p>{question.question}</p><br/>
            <b>Answer:</b>
            <FormControl
                placeholder="Fill in the blank"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
            />
            {showCorrectAnswers && (
                <span className="text-success fw-bold small">
                    Correct answers: {question.fillInAnswers?.join(", ")}
                </span>
            )}
        </div>
    );
}