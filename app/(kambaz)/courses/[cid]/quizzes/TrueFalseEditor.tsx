"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { FormCheck, FormControl, Row } from "react-bootstrap";

export default function TrueFalseEditor({ question, setQuestion, questionIndex } : 
    { question: any, setQuestion: (question: any) => void, questionIndex: number }) {

    return (
    <div className="wd-true-false-question">
        <Row>
            <span>Enter your question text, then select if True or False is the correct answer.</span>
        </Row> <br/>
        
        <b>Question:</b>
        <Row controlid="quiz-description" className="ps-3 pe-2">
        <FormControl as="textarea" rows={4} placeholder="Question" defaultValue={question.question} 
            onChange={(e) => { setQuestion({ ...question, question: e.target.value }) }} />
        </Row> <br/>

        <b>Answers:</b>
        <div className="d-flex align-items-center gap-2 mb-3">
            <FormCheck
                type="radio"
                name={`correct-answer-${questionIndex}`}
                checked={question.trueFalseAnswer === "true"}
                onChange={() => setQuestion({ ...question, trueFalseAnswer: "true"})}
                style={{ accentColor: question.trueFalseAnswer === "true" ? "green" : undefined }}
            />
            <span className={`${question.trueFalseAnswer === "true" ? "fw-bold" : ""}`} 
                style={{ color: question.trueFalseAnswer === "true" ? "green" : "inherit", minWidth: "120px" }}>
                True
            </span>
        </div>
        <div className="d-flex align-items-center gap-2 mb-3">
            <FormCheck
                type="radio"
                name={`correct-answer-${questionIndex}`}
                checked={question.trueFalseAnswer === "false"}
                onChange={() => setQuestion({ ...question, trueFalseAnswer: "false"})}
                style={{ accentColor: question.trueFalseAnswer === "false" ? "green" : undefined }}
            />
            <span className={`${question.trueFalseAnswer === "false" ? "fw-bold" : ""}`} 
                style={{ color: question.trueFalseAnswer === "false" ? "green" : "inherit", minWidth: "120px" }}>
                False
            </span>
        </div>
    </div>
);}