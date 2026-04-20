"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as client from "../../../client";
import { Button, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "@/app/(kambaz)/store";
import { produceDateAndTime } from "../utils";
import QuestionBox from "../QuestionBox";

export default function QuizDetails() {
    const { cid, qid } = useParams();
    const router = useRouter();
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const [quiz, setQuiz] = useState<any>(null);
    const [questions, setQuestions] = useState<any[]>([]);
    const [attempts, setAttempts] = useState<any[]>([]);

    const canEdit = currentUser.role === "FACULTY";
    const isStudent = currentUser.role === "STUDENT";

    const findExistingQuizQuestionsAndAttempts = async () => {
        const foundQuiz = await client.findQuizById(qid as string);
        const foundQuestions = await client.findQuestionsForQuiz(qid as string);
        setQuiz(foundQuiz);
        setQuestions(foundQuestions);
        if (isStudent) {
            const foundAttempts = await client.findAttemptsForUser(qid as string, currentUser._id);
            setAttempts(foundAttempts);
        }
    }

    useEffect(() => {
        findExistingQuizQuestionsAndAttempts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!quiz) return <div>Loading...</div>

    const latestAttempt = attempts.length > 0 ?
        [...attempts].sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())[0] : null;
    const canTakeQuiz = attempts.length === 0 ||
        (quiz.hasMultipleAttempts && attempts.length < quiz.howManyAttempts);
    
    return (
        <div className="wd-quiz-details">
            {canEdit && (
                <><div className="d-flex justify-content-end gap-2 mb-3">
                    <Button
                        variant="secondary"
                        onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/preview`)}>
                        Preview
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/editor`)}>
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

        {quiz.description !== "" && <><span>{quiz.description}</span><hr /></>}

        {isStudent && (
            <div className="mt-3">
                {canTakeQuiz ? (
                    <div className="d-flex justify-content-center mb-2">
                        <Button 
                            variant="danger"
                            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/take`)}
                        >
                            {attempts.length === 0 ? "Take Quiz" : "Retake Quiz"}
                        </Button>
                    </div>) : (
                    <div className="d-flex justify-content-center mb-2">
                        <span className="alert alert-secondary">
                            {quiz.howManyAttempts} attempt{quiz.howManyAttempts === 1 ? " has" : "s have"} been used.
                        </span>
                    </div>
                )}

                {latestAttempt && (
                    <div className="wd-quiz-attempt-details">
                        <div className="alert alert-danger"> 
                            {/* &nbsp; is a space */}
                            <b>Latest Score:</b> {latestAttempt.score} / {quiz.points} &nbsp;|&nbsp;
                            <b>Submitted:</b> {produceDateAndTime(new Date(latestAttempt.submittedAt))}
                            {quiz.hasMultipleAttempts && (
                                <> &nbsp;|&nbsp; <b>Attempts used:</b> {attempts.length} / {quiz.howManyAttempts}</>
                            )}
                        </div>

                        <h5 className="mt-3 mb-3"><b>Quiz Attempt</b></h5>
                        {questions.map((question, index) => {
                            const attemptAnswer = latestAttempt.answers.find(
                                (answer: any) => answer.question === question._id
                            ); 
                            return (
                                <QuestionBox
                                    key={question._id}
                                    question={question}
                                    questionIndex={index}
                                    userAnswer={attemptAnswer?.questionAnswer}
                                    showResult={quiz.showCorrectAnswers}
                                    isCorrect={quiz.showCorrectAnswers ? attemptAnswer?.isCorrect : undefined}
                                />
                            );
                        })}
                    </div>
                )}
                
            </div>
        )}
            
        </div>
    );
}