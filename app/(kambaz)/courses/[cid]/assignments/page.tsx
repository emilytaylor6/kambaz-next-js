'use client'
import { Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import AssignmentControls from "./AssignmentControls";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { IoMdArrowDropdown } from "react-icons/io";
import IndividualAssignmentControlButtons from "./IndividualAssignmentControlButtons";
import { LuNotebookPen } from "react-icons/lu";
import Link from "next/link";
import { useParams } from "next/navigation";
import { RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
// import { useState } from "react";
import * as client from "../../client";
import { useEffect } from "react";
import { setAssignments } from "./reducer";

export default function Assignments() {
  const { cid } = useParams(); 
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
  const dispatch = useDispatch();

  const fetchAssignments = async () => {
    const assignments = await client.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(assignments));
  };

  useEffect(() => {
    fetchAssignments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Used to produce a date and time in the format: MONTH DAY, YEAR at TIME with TIME being in the 
   * 12 hour format with AM and PM, YEAR only applying if the given year is the same as the current
   * year, and MONTH being a three character abbreviation
   * @param date the given date
   * @returns a string containing MONTH DAY, YEAR at TIME for the given date
   */
  const produceDateAndTime = (date: Date) => {
    const currentDate = new Date();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    let dateString = "";
    dateString = months[date.getMonth()] + " " + date.getDate().toString();
    if (currentDate.getFullYear() !== date.getFullYear()) {
      dateString = dateString +  ", " + date.getFullYear().toString();
    }
    dateString = dateString + " at " + time;
    return dateString;
  }

  return (
    <div>
      <AssignmentControls /><br /><br /><br />

      <ListGroup className="rounded-0" id="wd-assignments">
        <ListGroupItem className="wd-assignment-group p-0 mb-5 fs-5 border-gray">

          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            <IoMdArrowDropdown className="me-2 fs-3" />
            Assignments
            <AssignmentControlButtons />
          </div>

          <ListGroup className="rounded-0" id="wd-assignments">
            {assignments.map((assignment) => (
              <ListGroupItem key={assignment._id} className="wd-assignment p-2 ps-1">
                <Row>
                  <Col xs="auto" className="d-flex align-items-center">
                    <BsGripVertical className="me-2 fs-3" />
                    <LuNotebookPen className="fs-4" />
                  </Col>

                  <Col>
                    <Link href={`/courses/${cid}/assignments/${assignment._id}`} className="a-link">
                      {assignment.title}
                    </Link>
                    <p className="fs-6">
                      <span className="text-danger">Multiple Modules </span> | 
                      <b> Not available until </b> {produceDateAndTime(new Date(assignment.availableDate))} | 
                      <b> Due </b> {produceDateAndTime(new Date(assignment.dueDate))} | {assignment.totalPoints} pts
                    </p>
                  </Col>

                  <Col xs="auto" className="d-flex align-items-center">
                    <IndividualAssignmentControlButtons assignmentId={assignment._id} assignments={assignments}/>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>

        </ListGroupItem>
      </ListGroup>

    </div>
);}
