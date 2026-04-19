"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Row, FormLabel, FormControl, Col, FormSelect, Container, FormCheck } from "react-bootstrap";
import { formatDate } from "./utils";

export default function DetailsEditor({ quiz, setQuiz } : { quiz: any, setQuiz: (quiz: any) => void }) {
    return (
    <div className="wd-quiz-details-editor">

        <Row controlid="quiz-name" className="ps-3 pe-2">
            <FormControl id="wd-name" type="assignment" placeholder="Quiz Name" defaultValue={quiz.title} 
            onChange={(e) => { setQuiz({ ...quiz, title: e.target.value }) }} />
        </Row>
        <br />
        <Row className="quiz-instructions-title ps-3">
            Quiz Instructions:
        </Row>
        <Row controlid="quiz-description" className="ps-3 pe-2">
            <FormControl as="textarea" rows={4} placeholder="Quiz Description" defaultValue={quiz.description} 
            onChange={(e) => { setQuiz({ ...quiz, description: e.target.value }) }} />
        </Row>
        <br /><br />
        <Row controlid="quiz-type" className=" mb-3">
            <Col className="quiz-editor-label text-start text-sm-end"><FormLabel sm={2}>Quiz Type</FormLabel></Col>
            <Col sm={8}>
                <FormSelect defaultValue={quiz.quizType} onChange={(e) => { setQuiz({ ...quiz, quizType: e.target.value })}}>
                    <option value="Graded Quiz">Graded Quiz</option>
                    <option value="Practice Quiz">Practice Quiz</option>
                    <option value="Graded Survey">Graded Survey</option>
                    <option value="Ungraded Survey">Ungraded Survey</option>
                </FormSelect>
            </Col>
        </Row>
        <br />
        <Row controlid="quiz-assignment-group" className="mb-3">
            <Col className="quiz-editor-label text-start text-sm-end"><FormLabel sm={2}>Assignment Group</FormLabel></Col>
            <Col sm={8}>
                <Container className="p-2 border border-secondary rounded-1">
                    <FormSelect defaultValue={quiz.assignmentGroup} onChange={(e) => { setQuiz({ ...quiz, assignmentGroup: e.target.value })}}>
                        <option value="QUIZZES">QUIZZES</option>
                        <option value="EXAMS">EXAMS</option>
                        <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                        <option value="PROJECTS">PROJECTS</option>
                    </FormSelect>
                    <br />
                    <span><b>Options</b></span>
                    <br />
                    <br />

                    <FormCheck className="mb-2" type="checkbox" label="Shuffle Answers" name="options" checked={quiz.isShuffled}
                        onChange={(e) => setQuiz({ ...quiz, isShuffled: e.target.checked })}/>

                    <FormCheck className="mb-2" type="checkbox" label="Time Limit" name="options" checked={quiz.timeLimit > 0}
                        onChange={(e) => setQuiz({ ...quiz, timeLimit: e.target.checked ? 1 : 0 })}/>

                    {quiz.timeLimit > 0 && (
                        <Row className="mb-2">
                            <Col xs="auto">
                                <FormControl type="number" min={0} value={quiz.timeLimit} 
                                    onChange={(e) => setQuiz({ ...quiz, timeLimit: Number(e.target.value) })} style={{ width: "70px" }} />
                            </Col>
                            <Col xs="auto">
                                <span>Minute{quiz.timeLimit === 1 ? "" : "s"}</span>
                            </Col>
                        </Row>
                    )}

                    <FormCheck className="mb-2" type="checkbox" label="Allow Multiple Attempts" name="options" checked={quiz.hasMultipleAttempts}
                        onChange={(e) => setQuiz({ ...quiz, hasMultipleAttempts: e.target.checked })}/>
                    
                    {quiz.hasMultipleAttempts && (
                        <Row className="mb-2">
                            <Col xs="auto">
                                <FormControl type="number" min={1} value={quiz.howManyAttempts} 
                                    onChange={(e) => setQuiz({ ...quiz, howManyAttempts: Number(e.target.value) })} style={{ width: "70px" }} />
                            </Col>
                            <Col xs="auto">
                                <span>Attempt{quiz.howManyAttempts === 1 ? "" : "s"}</span>
                            </Col>
                        </Row>
                    )}
                    <FormCheck className="mb-2" type="checkbox" label="Show Correct Answers" name="options" checked={quiz.showCorrectAnswers}
                        onChange={(e) => setQuiz({ ...quiz, showCorrectAnswers: e.target.checked })}/>
                    <FormCheck className="mb-2" type="checkbox" label="One Question At a Time" name="options" checked={quiz.isOneQuestionAtATime}
                        onChange={(e) => setQuiz({ ...quiz, isOneQuestionAtATime: e.target.checked })}/>
                    <FormCheck className="mb-2" type="checkbox" label="Webcam Required" name="options" checked={quiz.isWebcamRequired}
                        onChange={(e) => setQuiz({ ...quiz, isWebcamRequired: e.target.checked })}/>
                    <FormCheck className="mb-2" type="checkbox" label="Lock Questions After Answering" name="options" checked={quiz.lockQuestionsAfterAnswering}
                        onChange={(e) => setQuiz({ ...quiz, lockQuestionsAfterAnswering: e.target.checked })}/>
                    
                </Container>
            </Col>
        </Row>
        <br />

        <Row controlid="quiz-access-code" className="align-items-center mb-3">
            <Col className="text-start text-sm-end"><FormLabel sm={2} id="wd-access-code">Access Code</FormLabel></Col>
            <Col sm={8}><FormControl id="wd-access-code" type="quiz" placeholder="No Access Code" defaultValue={quiz.accessCode} 
            onChange={(e) => { setQuiz({ ...quiz, accessCode: e.target.value }) }} /></Col>
        </Row>

        <br />
        <Row controlid="assign" className="mb-3">
            <Col className="quiz-editor-label text-start text-sm-end"><FormLabel sm={2}>Assign</FormLabel></Col>
            <Col sm={8}>
                <Container className="p-2 border border-secondary rounded-1">
                    <Row className="ps-2 pe-2">
                        <FormLabel id="wd-assign-to"><b>Assign to</b></FormLabel>
                        <FormSelect>
                            <option value="EVERYONE" defaultChecked>Everyone</option>
                        </FormSelect>
                    </Row>
                    <br />
                    <Row className="ps-2 pe-2">
                        <FormLabel id="wd-due-date"><b>Due</b></FormLabel>
                        <FormControl id="wd-due-date" type="datetime-local" defaultValue={formatDate(quiz.dueDate)} 
                        onChange={(e) => { setQuiz({ ...quiz, dueDate: new Date(e.target.value).toISOString() }) }} />
                    </Row>
                    <br />
                    <Row className="ps-1 pe-1">
                        <Col className="col-md-6">
                            <FormLabel id="wd-avail-date"><b>Available From</b></FormLabel>
                            <FormControl id="wd-avail-date" type="datetime-local" defaultValue={formatDate(quiz.availableDate)} 
                            onChange={(e) => { setQuiz({ ...quiz, availableDate: new Date(e.target.value).toISOString() }) }} />
                        </Col>
                        <Col className="col-md-6">
                            <FormLabel id="wd-until-date"><b>Until</b></FormLabel>
                            <FormControl id="wd-until-date" type="datetime-local" defaultValue={formatDate(quiz.untilDate)} 
                            onChange={(e) => { setQuiz({ ...quiz, untilDate: new Date(e.target.value).toISOString() }) }} />
                        </Col>
                    </Row>
                    <br />
                </Container>
            </Col>
        </Row>
    </div>
    );
}