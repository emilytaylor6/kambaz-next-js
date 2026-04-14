"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { FaCheckCircle } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { MdDoNotDisturbAlt } from "react-icons/md";
import * as client from "../../client";

export default function IndivQuizControlButtons({ quiz, fetchQuizzes } : { quiz: any, fetchQuizzes: () => void }) {

    const togglePublishQuiz = async () => {
        await client.updateQuiz({ ...quiz, isPublished: !quiz.isPublished});
        fetchQuizzes();
    }

    return (
        <div className="float-end">
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
            <IoEllipsisVertical 
                className="fs-4" 
                // handle on click options here (edit, delete, publish, copy, sort)
            />
        </div>
    );
}