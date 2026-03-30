"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams, useRouter } from "next/navigation";
import { Form, FormLabel, FormControl, Row, Col, FormSelect, Container, FormCheck, Button } from "react-bootstrap";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useState } from "react";
import { setAssignments } from "./reducer";
import * as client from "../../client";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);

  const existingAssignment = aid ? assignments.find((assignment) => (assignment._id === aid)) : null;

    const [assignment, setAssignment] = useState<any>(existingAssignment ? existingAssignment : {
        title: "New Assignment",
        description: "New Assignment Description",
        course: cid,
        availableDate: new Date().toISOString(),
        dueDate: new Date().toISOString(),
        untilDate: "",
        givenPoints: "100",
        totalPoints: "100",
    });

  const onCreateAssignmentForCourse = async () => {
    if (!cid) return;
    const newAssignment = await client.createAssignmentsForCourse(cid as string, assignment);
    dispatch(setAssignments([...assignments, newAssignment]));
  };

  const onUpdateAssignment = async () => {
    await client.updateAssignment(assignment);
    const newAssignments = assignments.map((a: any) => a._id === assignment._id ? assignment : a );
    dispatch(setAssignments(newAssignments));
  };

  if (aid && !existingAssignment) return (
   <div className="p-4">
     <h2 className="text-danger">Assignment Not Found</h2>
     <p>
       This assignment is missing.
     </p>
     <Link href={`/courses/`} className="btn btn-primary mt-3">
       Back to Courses
     </Link>
   </div>
  );

  /**
   * Handles saving depending on if we are editing or creating an assignment
   */
  const handleSave = () => {
    if (aid) {
        // dispatch(updateAssignment(assignment));
        onUpdateAssignment();
    } else {
        // dispatch(addAssignment(assignment));
        onCreateAssignmentForCourse();
    }
    router.push(`/courses/${cid}/assignments/`);
  }
  
  /**
   * Formats the ISO string given in the JSON file into a format compatible with datetime-local
   * and accounts for the user's timezone
   * @param isoDate the isodate as a string from the JSON file
   * @returns a formatted string as YYYY-MM-DDTHH:mm
   */
  const formatDate = (isoDate: string) => {
    if (isoDate === "") return "";
    const date = new Date(isoDate);
    const timezoneOffset = date.getTimezoneOffset() * 60000; // 60000 ms/min
    const localDate = new Date(date.getTime() - timezoneOffset);
    return localDate.toISOString().slice(0, 16);
  }

  return (
    <div id="wd-assignments-editor">
    <Form>
        <Row controlid="assignment-name" className="ps-3 pe-2">
            <FormLabel id="wd-name">Assignment Name</FormLabel>
            <FormControl id="wd-name" type="assignment" placeholder="Assignment Name" defaultValue={assignment.title} 
            onChange={(e) => { setAssignment({ ...assignment, title: e.target.value }) }} />
        </Row>
        <br />
        <Row controlid="assignment-description" className="ps-3 pe-2">
            <FormControl as="textarea" rows={4} placeholder="Assignment Description" defaultValue={assignment.description} 
            onChange={(e) => { setAssignment({ ...assignment, description: e.target.value }) }} />
        </Row>
        <br /><br />
        <Row controlid="points">
            <Col className="assignment-editor-label"><FormLabel sm={2}>Points</FormLabel></Col>
            <Col sm={8}> <FormControl type="points" placeholder="Points" defaultValue={assignment.totalPoints} 
            onChange={(e) => { setAssignment({ ...assignment, totalPoints: e.target.value }) }}/> </Col>
        </Row>
        <br />
        <Row controlid="assignment-group">
            <Col className="assignment-editor-label"><FormLabel sm={2}>Assignment Group</FormLabel></Col>
            <Col sm={8}>
                <FormSelect defaultValue="ASSIGNMENTS">
                    <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                    <option value="QUIZZES">QUIZZES</option>
                </FormSelect>
            </Col>
        </Row>
        <br />
        <Row controlid="grade-display">
            <Col className="assignment-editor-label"><FormLabel sm={2}>Display Grade as</FormLabel></Col>
            <Col sm={8}>
                <FormSelect defaultValue="PERCENTAGE">
                    <option value="PERCENTAGE">PERCENTAGE</option>
                    <option value="POINTS">POINTS</option>
                </FormSelect>
            </Col>
        </Row>
        <br />
        <Row controlid="submission-type">
            <Col className="assignment-editor-label"><FormLabel sm={2}>Submission Type</FormLabel></Col>
            <Col sm={8}>
                <Container className="p-2 border border-secondary rounded-1">
                    <FormSelect defaultValue="ONLINE">
                        <option value="ONLINE">Online</option>
                        <option value="PAPER">On Paper</option>
                        <option value="NONE">No Submission</option>
                    </FormSelect>
                    <br />
                    <span><b>Online Entry Options</b></span>
                    <br />
                    <br />
                    <FormCheck type="checkbox" label="Text Entry" name="onlineEntry" />
                    <FormCheck type="checkbox" label="Website URL" name="onlineEntry" />
                    <FormCheck type="checkbox" label="Media Recordings" name="onlineEntry" />
                    <FormCheck type="checkbox" label="Student Annotation" name="onlineEntry" />
                    <FormCheck type="checkbox" label="File Uploads" name="onlineEntry" />
                </Container>
            </Col>
        </Row>
        <br />
        <Row controlid="assign">
            <Col className="assignment-editor-label"><FormLabel sm={2}>Assign</FormLabel></Col>
            <Col sm={8}>
                <Container className="p-2 border border-secondary rounded-1">
                    <Row className="ps-2 pe-2">
                        <FormLabel id="wd-assign-to"><b>Assign to</b></FormLabel>
                        <FormSelect>
                            <option value="EVERYONE" defaultChecked>Everyone</option>
                            <option value="STUDENTS">Students</option>
                        </FormSelect>
                    </Row>
                    <br />
                    <Row className="ps-2 pe-2">
                        <FormLabel id="wd-due-date"><b>Due</b></FormLabel>
                        <FormControl id="wd-due-date" type="datetime-local" defaultValue={formatDate(assignment.dueDate)} 
                        onChange={(e) => { setAssignment({ ...assignment, dueDate: new Date(e.target.value).toISOString() }) }} />
                    </Row>
                    <br />
                    <Row className="ps-1 pe-1">
                        <Col className="col-md-6">
                            <FormLabel id="wd-avail-date"><b>Available From</b></FormLabel>
                            <FormControl id="wd-avail-date" type="datetime-local" defaultValue={formatDate(assignment.availableDate)} 
                            onChange={(e) => { setAssignment({ ...assignment, availableDate: new Date(e.target.value).toISOString() }) }} />
                        </Col>
                        <Col className="col-md-6">
                            <FormLabel id="wd-until-date"><b>Until</b></FormLabel>
                            <FormControl id="wd-until-date" type="datetime-local" defaultValue={formatDate(assignment.untilDate)} 
                            onChange={(e) => { setAssignment({ ...assignment, untilDate: new Date(e.target.value).toISOString() }) }} />
                        </Col>
                    </Row>
                    <br />
                </Container>
            </Col>
        </Row>
        <hr />
        <Button variant="danger" size="lg" className="me-2 float-end" id="wd-save-assignment-btn" 
            onClick={() => {
                handleSave();
             }}>Save
        </Button>
        <Button variant="secondary" size="lg" className="me-2 float-end" id="wd-cancel-assignment-btn"
            onClick={() => {
                router.push(`/courses/${cid}/assignments/`);
            }}>Cancel
        </Button>
    </Form>
    </div>
);}
