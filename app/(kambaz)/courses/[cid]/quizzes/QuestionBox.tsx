"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Row, Col } from "react-bootstrap";
import FillInTheBlankQuestion from "./FillInTheBlankQuestion";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import TrueFalseQuestion from "./TrueFalseQuestion";

export default function QuestionBox({ question, questionIndex, userAnswer, onAnswer, showResult , isCorrect }:
    { question: any, questionIndex: number, userAnswer?: any, onAnswer?: (answer: any) => void, showResult?: boolean, isCorrect?: boolean }) {

    return (
        <div id={`question-${questionIndex}`} className="border rounded mb-4 mx-5 overflow-hidden"
            style={showResult ? { 
                borderColor: isCorrect ? "green" : "red",
                borderWidth: "2px"
            } : {}}>
            <div className="mb-3 bg-light rounded-top">
                <Row className="align-items-center p-2 border-bottom g-2">
                    <Col xs="auto"><h4 className="mb-0">Question {questionIndex + 1}</h4></Col>
                    <Col className="d-flex align-items-center justify-content-end gap-2">
                        <span>{question.points} pt{question.points === 1 ? "" : "s"}</span>
                    </Col>
                </Row>
            </div>

            <div className="px-3 py-3">
                {question.type === "MULTIPLE_CHOICE" && (
                    <MultipleChoiceQuestion question={question} questionIndex={questionIndex}
                        userSelected={userAnswer} setUserSelected={!onAnswer ? () => {} : onAnswer} />
                )}
                {question.type === "TRUE_FALSE" && (
                    <TrueFalseQuestion question={question} questionIndex={questionIndex}
                        userSelected={userAnswer} setUserSelected={!onAnswer ? () => {} : onAnswer} />
                )}
                {question.type === "FILL_IN_THE_BLANK" && (
                    <FillInTheBlankQuestion question={question}
                        userAnswer={userAnswer || ""} onUserAnswer={!onAnswer ? () => {} : onAnswer} />
                )}
            </div>
        </div>
    );

}