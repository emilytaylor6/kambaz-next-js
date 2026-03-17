"use client"
import { redirect, useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function CoursesPage() {
 const { cid } = useParams();
 const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
 const { currentUser } = useSelector((state: RootState) => state.accountReducer);

 if (!currentUser) redirect("/account/signin");

 const isEnrolled = enrollments.some((enrollment) => enrollment.user === currentUser._id && enrollment.course === cid);

 if (!isEnrolled) {
    redirect("/dashboard") 
} else {
    redirect(`/courses/${cid}/home`);
 };
}
