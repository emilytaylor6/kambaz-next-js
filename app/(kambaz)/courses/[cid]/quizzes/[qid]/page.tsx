"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as client from "../../../client";
import { Button, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "@/app/(kambaz)/store";
import { produceDateAndTime } from "../utils";

export default function QuizDetails() {
    const { cid, qid } = useParams();
    const router = useRouter();
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const [quiz, setQuiz] = useState<any>(null);

    const canEdit = currentUser.role === "FACULTY";
    const isStudent = currentUser.role === "STUDENT";

    const findExistingQuiz = async () => {
        const foundQuiz = await client.findQuizById(qid as string);
        setQuiz(foundQuiz);
    }

    useEffect(() => {
        findExistingQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!quiz) return <div>Loading...</div>

    return (
        <div className="wd-quiz-details">
            {canEdit && (
                <><div className="d-flex justify-content-end gap-2 mb-3">
                    <Button
                        variant="secondary"
                        onClick={() => router.push(`/courses/${cid}/quizzes/${qid}`)}>
                        Preview
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => router.push(`/courses/${cid}/quizzes/${qid}`)}>
                        Editor
                    </Button>
                </div><hr /></>
            )}
            <h2>{quiz.title}</h2>
            <hr/>

        <div className="wd-quiz-details-table mx-auto" style={{ maxWidth: "700px"}}>
            <Row className="mb-2">
                <Col xs="auto" className="text-end fw-bold" style={{ minWidth: "300px" }}>Quiz Type</Col>
                <Col>{quiz.quizType}</Col>
            </Row>
            <Row className="mb-2">
                <Col xs="auto" className="text-end fw-bold" style={{ minWidth: "300px" }}>Points</Col>
                <Col>{quiz.points}</Col>
            </Row>
            <Row className="mb-2">
                <Col xs="auto" className="text-end fw-bold" style={{ minWidth: "300px" }}>Assignment Group</Col>
                <Col>{quiz.assignmentGroup}</Col>
            </Row>
            <Row className="mb-2">
                <Col xs="auto" className="text-end fw-bold" style={{ minWidth: "300px" }}>Shuffle Answers</Col>
                <Col>{quiz.isShuffled ? "Yes" : "No"}</Col>
            </Row>
            <Row className="mb-2">
                <Col xs="auto" className="text-end fw-bold" style={{ minWidth: "300px" }}>Time Limit</Col>
                <Col>{quiz.timeLimit} Minute{quiz.timeLimit === 1 ? "" : "s"}</Col>
            </Row>
            <Row className="mb-2">
                <Col xs="auto" className="text-end fw-bold" style={{ minWidth: "300px" }}>Multiple Attempts</Col>
                <Col>{quiz.hasMultipleAttempts ? "Yes" : "No"}</Col>
            </Row>
            <Row className="mb-2">
                <Col xs="auto" className="text-end fw-bold" style={{ minWidth: "300px" }}>Show Correct Answers</Col>
                <Col>{quiz.showCorrectAnswers ? "Yes" : "No"}</Col>
            </Row>
            <Row className="mb-2">
                <Col xs="auto" className="text-end fw-bold" style={{ minWidth: "300px" }}>One Question at a Time</Col>
                <Col>{quiz.isOneQuestionAtATime ? "Yes" : "No"}</Col>
            </Row>
            <Row className="mb-2">
                <Col xs="auto" className="text-end fw-bold" style={{ minWidth: "300px" }}>Webcam Required</Col>
                <Col>{quiz.isWebcamRequired ? "Yes" : "No"}</Col>
            </Row>
            <Row className="mb-2">
                <Col xs="auto" className="text-end fw-bold" style={{ minWidth: "300px" }}>Lock Questions After Answering</Col>
                <Col>{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</Col>
            </Row>
        </div>

        <hr/>

        <Row className="justify-content-between">
            <Col xs={4} className="fw-bold">Due</Col>
            <Col xs={4} className="fw-bold">Available From</Col>
            <Col xs={4} className="fw-bold">Until</Col>
        </Row>
        <Row className="justify-content-between">
            <Col xs={4}>{quiz.dueDate ? produceDateAndTime(new Date(quiz.dueDate)) : "N/A"}</Col>
            <Col xs={4}>{quiz.availableDate ? produceDateAndTime(new Date(quiz.availableDate)) : "N/A"}</Col>
            <Col xs={4}>{quiz.untilDate ? produceDateAndTime(new Date(quiz.untilDate)) : "N/A"}</Col>
        </Row>

        <hr/>

        {isStudent && (
            <div className="d-flex justify-content-center mt-3">
                <Button 
                    variant="danger"
                    onClick={() => router.push(`/courses/${cid}/quizzes/${qid}`)}
                >
                    Take Quiz
                </Button>
            </div>
        )}
            
        </div>
    );
}