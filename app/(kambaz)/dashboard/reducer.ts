/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
    enrollments: [] as any[],
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
        const { courseId } = action.payload;
        state.enrollments = state.enrollments.filter(
        (enrollment: any) => enrollment.course !== courseId && enrollment._id !== courseId
        );
    },
   setEnrollments: (state, { payload: enrollments }) => {
     state.enrollments = enrollments;
   },
  },
});
export const { enroll, unenroll, setEnrollments } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;