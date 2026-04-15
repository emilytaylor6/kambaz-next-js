"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useParams } from "next/navigation";
import * as client from "../../../../client";
import QuizzesEditor from "../../QuizzesEditor";
import { useEffect, useState } from "react";

export default function QuizEditor() {
    const { qid } = useParams();
    const [existingQuiz, setExistingQuiz] = useState<any>(null);

    const findExistingQuiz = async () => {
        const foundQuiz = await client.findQuizById(qid as string);
        setExistingQuiz(foundQuiz);
    }

    useEffect(() => {
        findExistingQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!existingQuiz) return <div>Loading...</div>

    return (
        <div className="wd-quiz-editor">
            <QuizzesEditor givenQuiz={existingQuiz} isNew={false} />
        </div>
    )
}