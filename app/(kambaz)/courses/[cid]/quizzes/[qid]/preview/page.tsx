"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import * as client from "../../../../client";
import QuizAttempt from "../../QuizAttempt";

export default function PreviewQuiz() {
    const { qid } = useParams();
    const [quiz, setQuiz] = useState<any>(null);
    const [questions, setQuestions] = useState<any[]>([]);

    const findQuizAndQuestions = async () => {
        const foundQuiz = await client.findQuizById(qid as string);
        let foundQuestions = await client.findQuestionsForQuiz(qid as string);
        if (foundQuiz.isShuffled) {
            foundQuestions = [...foundQuestions].sort(() => Math.random() - 0.5); // randomizing order
        }
        setQuiz(foundQuiz);
        setQuestions(foundQuestions);
    };

    useEffect(() => {
        findQuizAndQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!quiz) return <div>Loading...</div>;

    return (
        <div className="wd-preview-quiz">
            <QuizAttempt quiz={quiz} questions={questions} isPreview={true} />
        </div>
    );
}