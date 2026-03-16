import { Suspense } from "react";
import QueryCalculator from "./QueryCalculator";

export default function QueryCalculator2() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <QueryCalculator />
        </Suspense>
    );
}