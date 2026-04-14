'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import * as client from "../../client";
import { Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { MdRocketLaunch } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "@/app/(kambaz)/store";
import Link from "next/link";
import { produceDateAndTime, produceQuizAvailability } from "./utils";

export default function Quizzes() {
    const { cid } = useParams();
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const [quizzes, setQuizzes] = useState<any[]>([]);
    const [collapsed, setCollapsed] = useState<boolean>(false);

    const fetchQuizzes = async () => {
        const quizzes = await client.findQuizzesForCourse(cid as string);
        setQuizzes(quizzes);
    }

    useEffect(() => {
        fetchQuizzes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const produceAvailabilityComponent = (quiz: any) => {
        const availability = produceQuizAvailability(quiz);
        if (availability === "closed") return <b>Closed | </b>;
        if (availability === "not available until") return (
            <><b>Not available until</b> {produceDateAndTime(new Date(quiz.availableDate))} | </>
        );
        if (availability === "available until") return (
            <><b>Available until</b> {produceDateAndTime(new Date(quiz.untilDate))} | </>
        );
        return "";
    }

    const produceDueDateComponent = (quiz: any) => {
        if (!quiz.dueDate) return "";
        return <><b>Due</b> {produceDateAndTime(new Date(quiz.dueDate))} | </>
    }

    const producePointsComponent = (quiz: any) => {
        if (!quiz.points) return "";
        return <span>{quiz.points} pt{quiz.points === 1 ? "" : "s"} | </span>
    }

    return (
        <div>
            {/* add control buttons here */}
            
            <ListGroup className="rounded-0" id="wd-quizzes">
                <ListGroupItem className="wd-quizzes-group p-0 mb-5 fs-5 border-gray">

                    <div className="wd-title p-3 ps-2 bg-secondary">
                        {collapsed ?
                        <IoMdArrowDropright 
                            className="me-2 fs-3" 
                            onClick={() => setCollapsed(!collapsed)} 
                        /> :
                        <IoMdArrowDropdown 
                            className="me-2 fs-3" 
                            onClick={() => setCollapsed(!collapsed)}
                        />}
                        Assignment Quizzes
                    </div>

                    <ListGroup className="rounded-0" id={`wd-quizzes`}>
                        {!collapsed && quizzes.map((quiz) => (
                            <ListGroupItem key={quiz._id} className={`wd-quiz ${currentUser.role} p-2 ps-1`}>
                                <Row>
                                    <Col xs="auto" className="d-flex align-items-center ps-3 pe-0">
                                        <MdRocketLaunch className={`ms-2 me-2 fs-3 wd-quiz-left-icon ${currentUser.role}`} />
                                    </Col>

                                    <Col>
                                        <Link href={`/courses/${cid}/quizzes/${quiz._id}`} className="quiz-link">
                                            {quiz.title}
                                        </Link> 
                                        <p className="fs-6 mb-0">
                                            {produceAvailabilityComponent(quiz)}
                                            {produceDueDateComponent(quiz)}
                                            {producePointsComponent(quiz)}
                                            {quiz.questionCount} Question{quiz.questionCount === 1 ? "" : "s"}
                                        </p>
                                    </Col>

                                    <Col xs="auto" className="d-flex align-items-center">
                                        {/* add individual control buttons */}
                                    </Col>
                                </Row>
                            </ListGroupItem>
                        ))}
                    </ListGroup>

                </ListGroupItem>
            </ListGroup>

        </div>
    )
}