/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
    enrollments: enrollments,
};

const enrollmentsSlice = createSlice({
  name: "enrollment",
  initialState,
  reducers: {
    enroll: (state, action) => {
        const { courseId, userId } = action.payload;
        const newEnrollment = {
            _id: uuidv4(),
            user: userId,
            course: courseId,
        };
        state.enrollments = [ ...state.enrollments, newEnrollment ];
    },
    unenroll: (state, action) => {
        const { courseId, userId } = action.payload;
        state.enrollments = state.enrollments.filter(
        (enrollment: any) => !(enrollment.course === courseId && enrollment.user === userId)
        );
    },
  },
});
export const { enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;