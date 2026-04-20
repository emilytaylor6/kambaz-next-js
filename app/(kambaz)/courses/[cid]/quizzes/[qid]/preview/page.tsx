"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import * as client from "../../../../client";
import { Button, Col, Row } from "react-bootstrap";
import MultipleChoiceQuestion from "../../MultipleChoiceQuestion";
import TrueFalseQuestion from "../../TrueFalseQuestion";
import FillInTheBlankQuestion from "../../FillInTheBlankQuestion";
import { RootState } from "@/app/(kambaz)/store";
import { useSelector } from "react-redux";
import { AiOutlineExclamationCircle } from "react-icons/ai";

export default function PreviewQuiz() {
    const { cid, qid } = useParams();
    const router = useRouter();
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const canEdit = currentUser.role === "FACULTY";
    
    const [quiz, setQuiz] = useState<any>(null);
    const [questions, setQuestions] = useState<any[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

    const [userAnswers, setUserAnswers] = useState<any>({});
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);

    const findQuizAndQuestions = async () => {
        const foundQuiz = await client.findQuizById(qid as string);
        let foundQuestions = await client.findQuestionsForQuiz(qid as string);
        if (foundQuiz.isShuffled) {
            foundQuestions = [...foundQuestions].sort(() => Math.random() - 0.5); // randomizing order
        }
        setQuiz(foundQuiz);
        setQuestions(foundQuestions);
    }

    useEffect(() => {
        findQuizAndQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!quiz) return <div>Loading...</div>;

    const isOneAtATime = quiz.isOneQuestionAtATime;
    const isLast = currentQuestionIndex === questions.length - 1;

    const setUserAnswer = (questionId: string, answer: any) => {
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
        if (Object.keys(userAnswers).length !== questions.length) return;

        const totalScore = questions.reduce((sum, question) => {
            return sum + (checkCorrect(question) ? question.points : 0);
        }, 0);
        setScore(totalScore);
        setSubmitted(true);
    };

    const generateQuestionBox = (question: any, index: number) => (
        <div key={question._id} id={`question-${index}`} className="border rounded mb-4 mx-5 overflow-hidden"
            style={submitted && quiz.showCorrectAnswers ? { 
                borderColor: checkCorrect(question) ? "green" : "red",
                borderWidth: "2px"
            } : {}}>
            <div className="mb-3 bg-light rounded-top">
                <Row className="align-items-center p-2 border-bottom g-2">
                    <Col xs="auto"><h4 className="mb-0">Question {index + 1}</h4></Col>
                    <Col className="d-flex align-items-center justify-content-end gap-2">
                        <span>{question.points} pt{question.points === 1 ? "" : "s"}</span>
                    </Col>
                </Row>
            </div>

            <div className="px-3 py-3">
                {question.type === "MULTIPLE_CHOICE" && (
                    <MultipleChoiceQuestion question={question} questionIndex={index}
                        userSelected={userAnswers[question._id]} setUserSelected={(answer) => setUserAnswer(question._id, answer)} />
                )}
                {question.type === "TRUE_FALSE" && (
                    <TrueFalseQuestion question={question} questionIndex={index}
                        userSelected={userAnswers[question._id]} setUserSelected={(answer) => setUserAnswer(question._id, answer)} />
                )}
                {question.type === "FILL_IN_THE_BLANK" && (
                    <FillInTheBlankQuestion question={question}
                        userAnswer={userAnswers[question._id] || ""} onUserAnswer={(answer) => setUserAnswer(question._id, answer)} />
                )}
            </div>

            {/* {submitted && (
                <div className={`px-2 pt-2 fw-bold ${checkCorrect(question) ? "text-success" : "text-danger"}`}>
                    {checkCorrect(question) ? "Correct" : "Incorrect"}
                </div>
            )} */}
        </div>
    );

    return (
        <div className="wd-preview-quiz p-3">
            <div className="wd-preview-quiz-header d-flex justify-content-between align-items-center mb-3">
                <h3><b>{quiz.title}</b></h3>
                {canEdit &&
                <Button variant="secondary" 
                    onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/editor`)}>
                    Edit Quiz
                </Button>}
            </div>
            {quiz.description !== "" &&
                <div className="d-flex align-items-center mb-3">
                    <h4><b>Quiz Instructions</b></h4><br/>
                    <p>{quiz.description}</p>
                </div>}
            <hr />

            {submitted && (
                <div className="alert alert-danger mb-3">
                    Score: {score} / {quiz.points}
                </div>
            )}

            <Row>
                <Col className="wd-preview-quiz-questions" md={9}>
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
                                            <Button variant="danger" onClick={handleSubmit}>
                                                Submit Quiz
                                            </Button>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="wd-preview-quiz-multiple-questions">
                            {questions.map((question, index) => generateQuestionBox(question, index))}
                            <hr />
                            {!submitted && (
                                <div className="d-flex justify-content-end mt-2">
                                    <Button variant="danger" onClick={handleSubmit}>
                                        Submit Quiz
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </Col>

                <Col className="wd-preview-quiz-navigation d-none d-md-block" md={3}>
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