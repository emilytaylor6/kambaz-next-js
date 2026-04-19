"use client"
import { useEffect, useState } from "react";
/* eslint-disable @typescript-eslint/no-explicit-any */

import FillInTheBlankEditor from "./FillInTheBlankEditor";
import MultipleChoiceEditor from "./MultipleChoiceEditor";
import TrueFalseEditor from "./TrueFalseEditor";
import { Button, Col, FormControl, FormSelect, Row } from "react-bootstrap";
import { RootState } from "@/app/(kambaz)/store";
import { useSelector } from "react-redux";
import { FaPencil, FaTrash } from "react-icons/fa6";
import TrueFalseQuestion from "./TrueFalseQuestion";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import FillInTheBlankQuestion from "./FillInTheBlankQuestion";

export default function QuestionBox({ givenQuestion, index, questions, setQuestions, isNew } : 
    { givenQuestion: any, index: number, questions: any[], setQuestions: (question: any) => void, isNew: boolean }) {

    const [editing, setEditing] = useState<boolean>(isNew || false);
    const [question, setQuestion] = useState<any>(givenQuestion);
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const canEdit = currentUser.role === "FACULTY";

    useEffect(() => {
        setQuestion(givenQuestion);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateQuestion = () => {
        const updatedQuestions = questions.map((newQuestion: any, i: number) => i === index ? question : newQuestion);
        setQuestions(updatedQuestions);
        setEditing(false);
    };

    const cancelQuestion = () => {
        setQuestion(givenQuestion);
        setEditing(false);
    };

    const deleteQuestion = () => {
        setQuestions(questions.filter((_: any, i: number) => i !== index));
    };

    const handleQuestionTypeChange = (givenType: string) => {
        const thisQuestion = { ...question, type: givenType };
        if (givenType === "MULTIPLE_CHOICE") {
            setQuestion({ ...thisQuestion, multipleChoiceAnswers: question.multipleChoiceAnswers || [{ choice: "Choice 1", isCorrect: "true" }], 
                trueFalseAnswer: undefined, fillInAnswers: undefined });
        } else if (givenType === "TRUE_FALSE") {
            setQuestion({ ...thisQuestion, trueFalseAnswer: "true", 
                multipleChoiceAnswers: undefined, fillInAnswers: undefined });
        } else if (givenType === "FILL_IN_THE_BLANK") {
            setQuestion({ ...thisQuestion, fillInAnswers: question.fillInAnswers || ["Answer 1"], 
                multipleChoiceAnswers: undefined, trueFalseAnswer: undefined });
        }
    };

    return(
        <div className="wd-question-box border rounded mb-4 mx-5 overflow-hidden">
            <div className="wd-question-header mb-3 bg-light rounded-top">
                <Row className="align-items-center p-2 border-bottom g-2">
                    {editing ?
                        <><Col xs="auto">
                            <FormControl placeholder="Question Title" value={question.title}
                                onChange={(e) => setQuestion({ ...question, title: e.target.value })} />
                        </Col>
                        <Col xs="auto">
                            <FormSelect value={question.type} onChange={(e) => handleQuestionTypeChange(e.target.value)}>
                                <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                                <option value="TRUE_FALSE">True/False</option>
                                <option value="FILL_IN_THE_BLANK">Fill in the Blank</option>
                            </FormSelect>
                        </Col></> : 
                        <Col xs="auto"><h4 className="mb-0">Question {index + 1}</h4></Col>
                    }
                    <Col className="d-flex align-items-center justify-content-end gap-2">
                        {editing ?
                            <>
                            <span>pts: </span>
                            <FormControl type="number" min={0} value={question.points}
                            onChange={(e) => setQuestion({ ...question, points: e.target.value })}
                            style={{ width: "70px" }} />
                            <FaTrash className="ms-auto text-danger" style={{ cursor: "pointer" }} onClick={deleteQuestion} />
                            </> : 
                            <><span>{question.points} pt{question.points === 1 ? "" : "s"} </span>
                            {canEdit && <FaPencil onClick={() => setEditing(true)} />} </> 
                            }
                    </Col>
                </Row>
            </div>
            <div className="wd-question-type px-3 py-3">
                {editing ? (
                    (question.type === "MULTIPLE_CHOICE") ? <MultipleChoiceEditor key={question._id} question={question} setQuestion={setQuestion} questionIndex={index}/> :
                    (question.type === "TRUE_FALSE") ? <TrueFalseEditor key={question._id} question={question} setQuestion={setQuestion} questionIndex={index} /> :
                    (question.type === "FILL_IN_THE_BLANK") ? <FillInTheBlankEditor key={question._id} question={question} setQuestion={setQuestion} /> :
                    <></>
                ) : (
                    (question.type === "MULTIPLE_CHOICE") ? <MultipleChoiceQuestion key={question._id} question={question} questionIndex={index}/> :
                    (question.type === "TRUE_FALSE") ? <TrueFalseQuestion key={question._id} question={question} questionIndex={index} /> :
                    (question.type === "FILL_IN_THE_BLANK") ? <FillInTheBlankQuestion key={question._id} question={question} /> :
                    <></>
                )}
            </div>
            {editing &&
            <div className="wd-question-footer border-top px-3 py-2">
                <Button variant="secondary" type="button" className="me-2" id="wd-cancel-question-btn" onClick={cancelQuestion}>
                    Cancel
                </Button>
                <Button variant="danger" type="button" className="me-2" id="wd-update-question-btn" onClick={updateQuestion}>
                    Update Question
                </Button>
            </div>}
        </div>
    );
}