"use client"

import { useParams } from "next/navigation";
import QuizzesEditor from "../QuizzesEditor"

export default function CreateQuiz() {
    const { cid } = useParams();

    const newQuiz = {
        course: cid,
        title: "Unnamed Quiz",
        description: "",
        points: 0,
        questionCount: 0,
        quizType: "Graded Quiz",
        assignedTo: "Everyone",
        assignmentGroup: "QUIZZES", 
        isPublished: false,
        isShuffled: true,
        timeLimit: 0,
        hasMultipleAttempts: false,
        howManyAttempts: 1,
        showCorrectAnswers: false,
        accessCode: "",
        isOneQuestionAtATime: true,
        isWebcamRequired: false,
        lockQuestionsAfterAnswering: false,
        dueDate: Date,
        availableDate: Date,
        untilDate: Date,
    }
    
    return (
        <div className="wd-create-quiz">
            <QuizzesEditor givenQuiz={newQuiz} isNew={true} />
        </div>
    )
}