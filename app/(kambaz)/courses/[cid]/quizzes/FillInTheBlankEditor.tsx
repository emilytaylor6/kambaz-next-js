"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, FormControl, Row } from "react-bootstrap";
import { FaTrash } from "react-icons/fa6";

export default function FillInTheBlankEditor({ question, setQuestion } : 
    { question: any, setQuestion: (question: any) => void }) {

    const fillInAnswers = question.fillInAnswers || [];

    const setAnswers = (updated: any[]) => {
        setQuestion({ ...question, fillInAnswers: updated });
    };

    const addAnswer = () => {
        setAnswers([...fillInAnswers, ""]);
    };

    const updateAnswer = (index: number, newAnswer: string) => {
        setAnswers(fillInAnswers.map((answer: any, i: number) => i === index ? newAnswer : answer));
    };

    const removeAnswer = (index: number) => {
        if (fillInAnswers.length() <= 1) return;
        setAnswers(fillInAnswers.filter((_: any, i: number) => i !== index));
    };

    return (
    <div className="wd-fill-in-the-blank-question">
        <Row>
            <span>Enter your question text, then define all possible correct answers for the blank. Students will 
                see the questionfollowed by a small text box to type their answer.
            </span>
        </Row> <br/>
        
        <b>Question:</b>
        <Row controlid="quiz-description" className="ps-3 pe-2">
        <FormControl as="textarea" rows={4} placeholder="Question" defaultValue={question.question} 
            onChange={(e) => { setQuestion({ ...question, question: e.target.value }) }} />
        </Row> <br/>

        <b>Answers:</b>
            {fillInAnswers.map((possibleAnswer: any, index: number) => (
                <div key={index} className="d-flex align-items-center gap-2 mb-3">
                    <span style={{ minWidth: "120px" }}>
                        Possible Answer
                    </span>
                    <FormControl
                        value={possibleAnswer}
                        onChange={(e) => updateAnswer(index, e.target.value)}
                    />
                    <Button type="button" variant="link" className="text-danger p-0"
                        onClick={() => removeAnswer(index)}>
                        <FaTrash />
                    </Button>
                </div>
            ))}
            <div className="d-flex justify-content-end">
                <Button type="button" variant="link" className="text-danger" onClick={addAnswer}>
                    + Add Another Answer
                </Button>
            </div>
    </div>
);}