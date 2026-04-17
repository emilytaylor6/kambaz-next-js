"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, FormCheck, FormControl, Row } from "react-bootstrap";
import { FaTrash } from "react-icons/fa6";

export default function MultipleChoiceEditor({ question, setQuestion, questionIndex } : 
    { question: any, setQuestion: (question: any) => void, questionIndex: number }) {

    const choices = question.multipleChoiceAnswers || [];

    const setChoices = (updated: any[]) => {
        setQuestion({ ...question, multipleChoiceAnswers: updated });
    };

    const addChoice = () => {
        setChoices([...choices, { choice: "", isCorrect: false }]);
    };

    const updateChoice = (index: number, text: string) => {
        setChoices(choices.map((c: any, i: number) => i === index ? { ...c, choice: text } : c));
    };

    const setCorrect = (index: number) => {
        setChoices(choices.map((c: any, i: number) => ({ ...c, isCorrect: i === index })));
    };

    const removeChoice = (index: number) => {
        if (choices.length() <= 1) return;
        setChoices(choices.filter((_: any, i: number) => i !== index));
    };

    return (
    <div className="wd-multiple-choice-question">
        <Row>
            <span>Enter your question and multiple answers then select the one correct answer.</span>
        </Row> <br/>
        
        <b>Question:</b>
        <Row controlid="quiz-description" className="ps-3 pe-2">
        <FormControl as="textarea" rows={4} placeholder="Question" defaultValue={question.question} 
            onChange={(e) => { setQuestion({ ...question, question: e.target.value }) }} />
        </Row> <br/>

        <b>Answers:</b>
            {choices.map((choice: any, index: number) => (
                <div key={index} className="d-flex align-items-center gap-2 mb-3">
                    <FormCheck
                        type="radio"
                        name={`correct-answer-${questionIndex}`}
                        checked={choice.isCorrect}
                        onChange={() => setCorrect(index)}
                        style={{ accentColor: choice.isCorrect ? "green" : undefined }}
                    />
                    <span style={{ color: choice.isCorrect ? "green" : "inherit", minWidth: "120px" }}>
                        {choice.isCorrect ? "Correct Answer" : "Possible Answer"}
                    </span>
                    <FormControl
                        value={choice.choice}
                        onChange={(e) => updateChoice(index, e.target.value)}
                        style={{ borderColor: choice.isCorrect ? "green" : undefined }}
                    />
                    <Button type="button" variant="link" className="text-danger p-0"
                        onClick={() => removeChoice(index)}>
                        <FaTrash />
                    </Button>
                </div>
            ))}
            <div className="d-flex justify-content-end">
                <Button type="button" variant="link" className="text-danger" onClick={addChoice}>
                    + Add Another Answer
                </Button>
            </div>
    </div>
);} 