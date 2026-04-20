"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { RootState } from "@/app/(kambaz)/store";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as client from "../../../../client";
import QuizAttempt from "../../QuizAttempt";

export default function TakeQuiz() {
    const { cid, qid } = useParams();
    const [quiz, setQuiz] = useState<any>(null);
    const [questions, setQuestions] = useState<any[]>([]);
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const router = useRouter();

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

    const handleQuizAttempt = async (gradedAnswers: any, gradedScore: number) => {
        await client.createQuizAttempt(qid as string, {
            user: currentUser._id,
            score: gradedScore,
            submittedAt: new Date(),
            answers: gradedAnswers,
        });

        router.push(`/courses/${cid}/quizzes/${qid}`);
    };
    
    if (!quiz) return <div>Loading...</div>;

    return (
        <div className="wd-take-quiz">
            <QuizAttempt quiz={quiz} questions={questions} handleQuizAttempt={handleQuizAttempt} />
        </div>
    );
}