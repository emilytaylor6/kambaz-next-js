"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Modal, Button } from "react-bootstrap";
import * as client from "../../client";

export default function QuizDeleteDialogue({ show, handleClose, quiz, fetchQuizzes } : {
 show: boolean; handleClose: () => void; quiz: any; fetchQuizzes?: () => void }) {

    const onDeleteQuiz = async () => {
        if (quiz._id) {
            await client.deleteQuiz(quiz._id);
        }
        if(fetchQuizzes) fetchQuizzes();
        handleClose();
    }

    return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Are you sure you want to delete this quiz?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Button variant="secondary" className="me-2" onClick={handleClose}> Cancel </Button>
            <Button variant="danger" onClick={onDeleteQuiz}> Delete </Button>
        </Modal.Body>
    </Modal>
);}