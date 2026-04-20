"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { RootState } from "@/app/(kambaz)/store";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import QuestionBox from "./QuestionBox";

export default function QuizAttempt({ quiz, questions, isPreview = false, handleQuizAttempt } : 
    { quiz: any, questions: any[], isPreview?: boolean, handleQuizAttempt?: (gradedAnswers: any, gradedScore: number) => void }) {

    const { cid, qid } = useParams();
    const router = useRouter();
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const canEdit = currentUser.role === "FACULTY";
    
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [userAnswers, setUserAnswers] = useState<any>({});
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);
    const [showCompleteAllQuestions, setShowCompleteAllQuestions] = useState<boolean>(false);

    const isOneAtATime = quiz.isOneQuestionAtATime;
    const isLast = currentQuestionIndex === questions.length - 1;

    const setUserAnswer = (questionId: string, answer: any) => {
        setShowCompleteAllQuestions(false);
        setUserAnswers({ ...userAnswers, [questionId]: answer });
    };

    const checkCorrect = (question: any) => {
        const answer = userAnswers[question._id];
        if (question.type === "MULTIPLE_CHOICE") {
            const selectedChoice = question.multipleChoiceAnswers?.[userAnswers[question._id]];
            return selectedChoice?.isCorrect === true;
        } else if (question.type === "TRUE_FALSE") {
            return answer === question.trueFalseAnswer;
        } else if (question.type === "FILL_IN_THE_BLANK") {
            return question.fillInAnswers?.some((a: string) => 
                a.toLowerCase() === answer?.toLowerCase());
        }
        return false;
    };

    const handleSubmit = () => {
        // every question must be answered 
        if (Object.keys(userAnswers).length !== questions.length) {
            setShowCompleteAllQuestions(true);
            return;
        };

        const totalScore = questions.reduce((sum, question) => {
            return sum + (checkCorrect(question) ? question.points : 0);
        }, 0);

        setScore(totalScore);
        setSubmitted(true);

        if (!isPreview && handleQuizAttempt) {
            const gradedAnswers = questions.map((question) => ({
                question: question._id,
                questionAnswer: String(userAnswers[question._id]),
                isCorrect: checkCorrect(question),
            }));
            handleQuizAttempt(gradedAnswers, totalScore); // only submitting for real attempts
        }
    };

    const generateQuestionBox = (question: any, index: number, isMap?: boolean) => {
        if (isMap) { 
            return (
                <QuestionBox
                    key={question._id}
                    question={question}
                    questionIndex={index}
                    userAnswer={userAnswers[question._id]}
                    onAnswer={(answer) => setUserAnswer(question._id, answer)}
                    showResult={submitted && quiz.showCorrectAnswers}
                    isCorrect={submitted ? checkCorrect(question) : undefined}
                />); 
        } else {
            return (
                <QuestionBox
                question={question}
                questionIndex={index}
                userAnswer={userAnswers[question._id]}
                onAnswer={(answer) => setUserAnswer(question._id, answer)}
                showResult={submitted && quiz.showCorrectAnswers}
                isCorrect={submitted ? checkCorrect(question) : undefined}
            />);
        };
    };

    return (
        <div className="wd-attempt-quiz p-3">
            <div className="wd-attempt-quiz-header d-flex justify-content-between align-items-center mb-3">
                <h3><b>{quiz.title}</b></h3>
                {canEdit &&
                <Button variant="secondary" 
                    onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/editor`)}>
                    Edit Quiz
                </Button>}
            </div>

            {quiz.description !== "" &&
                <div className="mb-3">
                    <h4><b>Quiz Instructions</b></h4><br/>
                    <p>{quiz.description}</p>
                </div>}

            {isPreview && (
                <div className="alert alert-danger mb-3">
                    In preview mode: Answers are not saved.
                </div>
            )}
            <hr />

            {submitted && (
                <div className="alert alert-danger mb-3">
                    Score: {score} / {quiz.points}
                </div>
            )}

            <Row>
                <Col className="wd-attempt-quiz-questions" md={9}>
                    {isOneAtATime ? (
                        <div className="wd-preview-quiz-one-question">
                            {generateQuestionBox(questions[currentQuestionIndex], currentQuestionIndex)}
                            <hr />
                            <div className="d-flex justify-content-between mt-2">
                                <div>
                                    {currentQuestionIndex > 0 && (
                                        <Button variant="secondary" onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}>
                                            Previous
                                        </Button>
                                    )}
                                </div>
                                <div>
                                    {!isLast ? (
                                        <Button variant="danger" onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}>
                                            Next
                                        </Button>
                                    ) : (
                                        !submitted && (
                                            <div>
                                                {showCompleteAllQuestions && (
                                                    <div className="alert alert-danger mb-3">All questions must be answered before submitting.</div>
                                                )}
                                                <Button variant="danger" onClick={handleSubmit}>
                                                    Submit Quiz
                                                </Button>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="wd-attempt-quiz-multiple-questions">
                            {questions.map((question, index) => generateQuestionBox(question, index, true))}
                            <hr />
                            {!submitted && (
                                <div className="d-flex flex-column align-items-end mt-2">
                                    {showCompleteAllQuestions && (
                                        <div className="alert alert-danger mb-3">All questions must be answered before submitting.</div>
                                    )}
                                    <Button variant="danger" onClick={handleSubmit}>
                                        Submit Quiz
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </Col>

                <Col className="wd-attempt-quiz-navigation d-none d-md-block" md={3}>
                    <div className="p-3">
                        <h6 className="fw-bold mb-3">Questions</h6>
                        <div className="d-flex flex-column gap-2" style={{ maxHeight: "60vh", overflowY: "auto" }}>
                            {questions.map((question, index) => (
                                <Button key={question._id} size="sm" className="text-nowrap"
                                    variant={isOneAtATime && currentQuestionIndex === index ? "danger" : "outline-secondary"}
                                    // aided by ai here to get scroll to question functionality: scrollIntoView brings the page to that element on the page via locator
                                    onClick={() => { if (isOneAtATime) setCurrentQuestionIndex(index); else 
                                        document.getElementById(`question-${index}`)?.scrollIntoView({ behavior: "smooth" }); }}>
                                    <AiOutlineExclamationCircle className="secondary" /> Question {index + 1}
                                </Button>
                            ))}
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}