"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, FormControl, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setCourses } from '../courses/reducer';
import { redirect } from "next/navigation";
import { enroll, setEnrollments, unenroll } from "./reducer";
import * as client from "../courses/client";

export default function Dashboard() {
    const { courses } = useSelector((state: RootState) => state.coursesReducer);
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
    const dispatch = useDispatch();
    const [showCourses, setShowCourses] = useState(false);
    const [course, setCourse] = useState<any>({
        _id: "0", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15",
        image: "/images/reactjs.jpg", description: "New Description"
    });
    
    const fetchCourses = async () => {
        try {
            const courses = showCourses ? await client.fetchAllCourses() : await client.findMyCourses();
            dispatch(setCourses(courses));
        } catch (error) {
            console.error(error);
        }
    };

    const fetchEnrollments = async () => {
        try {
            const enrollments = await client.findEnrollmentsForUser(currentUser._id);
            dispatch(setEnrollments(enrollments));
        } catch (error) {
            console.error(error);
        }
    };

    const onAddNewCourse = async () => {
        const newCourse = await client.createCourse(course);
        dispatch(setCourses([ ...courses, newCourse ]));
    };

    const onDeleteCourse = async (courseId: string) => {
        await client.deleteCourse(courseId);
        dispatch(setCourses(courses.filter((course) => course._id !== courseId)));
    };

    const onUpdateCourse = async () => {
        await client.updateCourse(course);
        dispatch(setCourses(courses.map((c) => {
            if (c._id === course._id) { return course; }
            else { return c; }
        })));
    };

    const onEnroll = async (courseId: string) => {
        await client.enrollUserInCourse(currentUser._id, courseId);
        dispatch(enroll({ courseId, userId: currentUser._id }));
    };

    const onUnenroll = async (courseId: string) => {
        await client.unenrollUserFromCourse(currentUser._id, courseId);
        dispatch(unenroll({ courseId, userId: currentUser._id }));
    };

    useEffect(() => {
        fetchCourses();
        fetchEnrollments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser, showCourses, courses.length]);

    if (!currentUser) {
        redirect("/account/signin");
    }
    
    const isFaculty = currentUser.role === "FACULTY";

    const isEnrolled = (courseId: string): boolean => {
        return enrollments.some((courseEnrollment) => courseEnrollment._id === courseId);
    }

    const currentCourses = showCourses ? courses : courses.filter((course) => isEnrolled(course._id));

  return (
    <div id="wd-dashboard">
        <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      {isFaculty &&
      <div>
        <h5>New Course
                <Button className="btn btn-primary float-end"
                    id="wd-add-new-course-click" onClick={onAddNewCourse}> Add </Button>
                <button className="btn btn-warning float-end me-2"
                    onClick={onUpdateCourse} id="wd-update-course-click">
                    Update </button>
            </h5><br /><FormControl value={course.name} className="mb-2"
                onChange={(e) => setCourse({ ...course, name: e.target.value })} /><FormControl as="textarea" value={course.description} rows={3}
                    onChange={(e) => setCourse({ ...course, description: e.target.value })} />
            <hr />
        </ div>
        }

        <div className="d-flex justify-content-between align-items-center">
            <h2 id="wd-dashboard-published">Published Courses ({currentCourses.length})</h2> 
            <Button variant="primary" onClick={() => setShowCourses(!showCourses)}>
                {showCourses ? "My Courses" : "All Courses"}
            </Button>
        </div>

      <hr />
      <div id="wd-dashboard-courses">

        <Row xs={1} md={5} className="g-4">
            {currentCourses
            .map((course) => (
                <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
                    <Card>
                        <Link href={`/courses/${course._id}/`} className="wd-dashboard-course-link text-decoration-none text-dark">
                            <CardImg src={course.image} variant="top" width="100%" height={160} />
                            <CardBody>
                                <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                    {course.name}
                                </CardTitle>
                                <CardText className="wd-dashboard-course-description overflow-hidden" style={{height:"100px"}}>
                                    {course.description}
                                </CardText>
                                
                                <div className="d-flex jusitfy-content-between align-items-center mt-2">

                                {isEnrolled(course._id) ? 
                                    <Button onClick={(event) => {
                                        event.preventDefault();
                                        onUnenroll(course._id);
                                    }} className="btn btn-danger me-3">
                                        Unenroll
                                    </Button> : 
                                    <Button onClick={(event) => {
                                        event.preventDefault();
                                        onEnroll(course._id);
                                    }} className="btn btn-success me-3">
                                        Enroll
                                    </Button>
                                }

                                {isFaculty &&
                                    <div>
                                        <Button id="wd-edit-course-click"
                                            onClick={(event) => {
                                                event.preventDefault();
                                                setCourse(course);
                                            } }
                                            className="btn btn-warning me-1">
                                                Edit
                                        </Button>
                                        <Button onClick={(event) => {
                                            event.preventDefault();
                                            onDeleteCourse(course._id);
                                        } } className="btn btn-danger"
                                            id="wd-delete-course-click">
                                            Delete
                                        </Button>
                                    </div>
                                }

                                </div>

                            </CardBody>
                        </Link>
                    </Card>
                </Col>
            ))}
        </Row>

      </div>
    </div>
);}
