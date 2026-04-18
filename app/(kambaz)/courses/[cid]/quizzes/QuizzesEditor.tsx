"use client"
import { useParams, useRouter } from "next/navigation";
/* eslint-disable @typescript-eslint/no-explicit-any */

import * as client from "../../client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, Nav, NavItem, NavLink, Row } from "react-bootstrap";
import DetailsEditor from "./DetailsEditor";
import { FaCheckCircle } from "react-icons/fa";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { IoEllipsisVertical } from "react-icons/io5";
import QuestionsEditor from "./QuestionsEditor";
import QuizDeleteDialogue from "./QuizDeleteDialogue";

export default function QuizzesEditor({ givenQuiz, isNew } : { givenQuiz: any, isNew: boolean })  {
    const { cid } = useParams(); 
    const router = useRouter();
    const [quiz, setQuiz] = useState<any>(givenQuiz);
    const [questions, setQuestions] = useState<any>([]);
    const [originalQuestions, setOriginalQuestions] = useState<any>([]);
    const [activeEditor, setActiveEditor] = useState<"details" | "questions">("details");
    const [showDelete, setShowDelete]= useState<boolean>(false);

    useEffect(() => {
        onStartQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const onStartQuestions = async () => {
        if(!quiz._id) return;
        const foundQuestions = await client.findQuestionsForQuiz(quiz._id);
        setQuestions(foundQuestions);
        setOriginalQuestions(foundQuestions);
    }

    const saveQuestions = async (quizId: string) => {
        const deleted = originalQuestions.filter((original: { _id: any; }) => 
            !questions.find((question: { _id: any; }) => question._id === original._id));

        const added = questions.filter((question: { _id: any; }) => !question._id);

        const updated = questions.filter((question: { _id: any }) => question._id 
            && originalQuestions.find((original: { _id: any; }) => original._id === question._id));

        await Promise.all([
            ...deleted.map((question: { _id: string; }) => client.deleteQuestion(question._id)),
            ...added.map((question: { _id: string; }) => client.createQuestionForQuiz(quizId, question)),
            ...updated.map((question: { _id: string; }) => client.updateQuestion(question)),
        ])
    }

    const onCreateQuiz = async () => {
        if (!cid) return;
        const newQuiz = await client.createQuizForCourse(cid as string, quiz);
        setQuiz(newQuiz);
        return newQuiz;
    };

    const onUpdateQuiz = async () => {
        if (!cid) return;
        const updatedQuiz = await client.updateQuiz(quiz);
        setQuiz(updatedQuiz);
    };

    if (cid && !quiz) return (
    <div className="p-4">
        <h2 className="text-danger">Quiz Not Found</h2>
        <p>
        This quiz is missing.
        </p>
        <Link href={`/courses/${cid}/quizzes/`} className="btn btn-primary mt-3">
        Back to Quizzes
        </Link>
    </div>
    );

    /**
     * Handles saving depending on if we are editing or creating an assignment
     */
    const handleSave = async () => {
        if (isNew) {
            const newQuiz = await onCreateQuiz();
            await saveQuestions(newQuiz._id);
            router.push(`/courses/${cid}/quizzes/${newQuiz._id}`);
        } else {
            onUpdateQuiz();
            await saveQuestions(quiz._id);
            router.push(`/courses/${cid}/quizzes/${quiz._id}`);
        }
    }

    /**
     * Handles saving and publishing depending on if we are editing or creating an assignment
     */
    const handleSaveAndPublish = async () => {
        const publishedQuiz = { ...quiz, isPublished: true };
        setQuiz(publishedQuiz)
        if (isNew) {
            if (!cid) return;
            const createdQuiz = await client.createQuizForCourse(cid as string, publishedQuiz);
            setQuiz(createdQuiz);
            await saveQuestions(createdQuiz._id);
        } else {
            await client.updateQuiz(publishedQuiz);
            await saveQuestions(quiz._id);
        }
        router.push(`/courses/${cid}/quizzes`);
    }

return (
    <div id="wd-quizzes-editor">
        <Row className="align-items-center justify-content-end py-2 border-bottom gx-2">
            <Col xs="auto" className="d-flex align-items-center gap-3">
                <span>Points {quiz.points}</span>
                
                {quiz.isPublished ? 
                    (<><FaCheckCircle
                        className="text-success fs-4" /><span>Published</span></>) : 
                    (<><MdDoNotDisturbAlt
                        className="text-secondary fs-4" /><span>Not Published</span></>)
                }
                <Dropdown align="end">
                    <DropdownToggle as="span" bsPrefix="no-caret"> <IoEllipsisVertical className="fs-4"/> </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={() => setShowDelete(true)}>Delete</DropdownItem>
                        <DropdownItem onClick={() => setQuiz({ ...quiz, isPublished: !quiz.isPublished })}>
                            {quiz.isPublished ? "Unpublish" : "Publish"}
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </Col>
        </Row>
        <br/>

        <Nav variant="tabs" className="mb-3" activeKey={activeEditor} onSelect={(e) => setActiveEditor(e as "details" | "questions")}>
            <NavItem>
                <NavLink eventKey="details" className={activeEditor === "details" ? "" : "text-danger"}>
                    Details
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink eventKey="questions" className={activeEditor === "questions" ? "" : "text-danger"}>
                    Questions
                </NavLink>
            </NavItem>
        </Nav>
        
        <Form>
            {activeEditor === "details" ? 
                <DetailsEditor quiz={quiz} setQuiz={setQuiz} /> :
                <QuestionsEditor questions={questions} setQuestions={setQuestions} />}
            <hr />
            <Button variant="danger" size="lg" className="me-2 float-end" id="wd-save-quiz-btn" 
                onClick={() => {
                    handleSave();
                }}>Save
            </Button>
            <Button variant="danger" size="lg" className="me-2 float-end" id="wd-save-and-publish-btn" 
                onClick={() => {
                    handleSaveAndPublish();
                }}>Save and Publish
            </Button>
            <Button variant="secondary" size="lg" className="me-2 float-end" id="wd-cancel-quiz-btn"
                onClick={() => {
                    router.push(`/courses/${cid}/quizzes/`);
                }}>Cancel
            </Button>
        </Form>

        <QuizDeleteDialogue
            show={showDelete}
            handleClose={() => router.push(`/courses/${cid}/quizzes`)}
            quiz={quiz}
        />
    </div>
); }