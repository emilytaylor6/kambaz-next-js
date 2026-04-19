"use client"

import { Button } from "react-bootstrap";
import QuestionBox from "./QuestionBox";

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function QuestionsEditor({ questions, setQuestions } : { questions: any, setQuestions: (question: any) => void }) {

    const addQuestion = () => {
        setQuestions([ ...questions, {
            title: "",
            type: "MULTIPLE_CHOICE",
            points: 0,
            question: "",
            multipleChoiceAnswers: [{ choice: "Choice 1", isCorrect: true }],
            trueFalseAnswer: undefined, 
            fillInAnswers: undefined 
        }]);
    };

    return (
    <div>
        {questions.map((question: any, index: number) => (
            <QuestionBox key={question._id ?? index} givenQuestion={question} index={index} 
                questions={questions} setQuestions={setQuestions} isNew={!question._id} />
        ))}
        <div className="d-flex justify-content-center mt-3">
            <Button 
                variant="secondary" type="button"
                onClick={addQuestion}
            >
                + New Question
            </Button>
        </div>
    </div>
);}