"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { FaCheckCircle } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { MdDoNotDisturbAlt } from "react-icons/md";
import * as client from "../../client";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import QuizDeleteDialogue from "./QuizDeleteDialogue";
import { useState } from "react";

export default function IndivQuizControlButtons({ quiz, fetchQuizzes } : { quiz: any, fetchQuizzes: () => void }) {

    const { cid } = useParams();
    const router = useRouter();
    const [showDelete, setShowDelete] = useState<boolean>(false);

    const togglePublishQuiz = async () => {
        await client.updateQuiz({ ...quiz, isPublished: !quiz.isPublished});
        fetchQuizzes();
    }

    return (
        <div className="d-flex align-items-center gap-2 float-end">
            {quiz.isPublished ? 
                <FaCheckCircle 
                    className="text-success fs-4" 
                    onClick={togglePublishQuiz}
                /> : 
                <MdDoNotDisturbAlt 
                    className="text-secondary fs-4" 
                    onClick={togglePublishQuiz}
                />
            }
            <Dropdown align="end">
                <DropdownToggle as="span" bsPrefix="no-caret"> <IoEllipsisVertical className="fs-4"/> </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={() => router.push(`/courses/${cid}/quizzes/${quiz._id}/editor`)}>Editor</DropdownItem>
                    <DropdownItem onClick={() => setShowDelete(true)}>Delete</DropdownItem>
                    <DropdownItem onClick={togglePublishQuiz}>{quiz.isPublished ? "Unpublish" : "Publish"}</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            
            <QuizDeleteDialogue show={showDelete} handleClose={() => setShowDelete(false)}
                quiz={quiz} fetchQuizzes={fetchQuizzes} />
        </div>
    );
}