"use client"
import { useParams, useRouter } from "next/navigation";
/* eslint-disable @typescript-eslint/no-explicit-any */

import * as client from "../../client";
import { useState } from "react";
import Link from "next/link";
import { Button, Col, Form, Nav, NavItem, NavLink, Row } from "react-bootstrap";
import DetailsEditor from "./DetailsEditor";
import { FaCheckCircle } from "react-icons/fa";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { IoEllipsisVertical } from "react-icons/io5";

export default function QuizzesEditor({ givenQuiz, isNew } : { givenQuiz: any, isNew: boolean })  {
    const { cid } = useParams(); 
    const router = useRouter();
    const [quiz, setQuiz] = useState<any>(givenQuiz);
    const [activeEditor, setActiveEditor] = useState<"details" | "questions">("details");

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
            router.push(`/courses/${cid}/quizzes/${newQuiz._id}`);
        } else {
            onUpdateQuiz();
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
        } else {
            await client.updateQuiz(publishedQuiz);
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
                <IoEllipsisVertical 
                    className="fs-4" 
                    // handle on click options here (publish)
                />
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
            <DetailsEditor quiz={quiz} setQuiz={setQuiz} />
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
    </div>
); }