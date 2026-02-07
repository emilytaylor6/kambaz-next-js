import { Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import AssignmentControls from "./AssignmentControls";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { IoMdArrowDropdown } from "react-icons/io";
import IndividualAssignmentControlButtons from "./IndividualAssignmentControlButtons";
import { LuNotebookPen } from "react-icons/lu";
import Link from "next/link";

export default function Assignments() {
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

          <ListGroup className="wd-assignments rounded-0">
            <ListGroupItem className="wd-assignment p-2 ps-1">
              <Row>
                <Col xs="auto" className="d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" />
                  <LuNotebookPen className="fs-4" />
                </Col>
                <Col>
                  <Link href="/courses/1234/assignments/123" className="a-link">A1 - ENV + HTML</Link>
                  <p className="fs-6">
                    <span className="text-danger">Multiple Modules </span> | 
                    <b>  Not available until </b> May 6 at 12:00am | 
                    <b> Due </b>May 13 at 11:59pm  |  100 pts
                  </p>
                </Col>
                <Col xs="auto" className="d-flex align-items-center">
                  <IndividualAssignmentControlButtons />
                </Col>
              </Row>
            </ListGroupItem>

            <ListGroupItem className="wd-assignment p-2 ps-1">
              <Row>
                <Col xs="auto" className="d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" />
                  <LuNotebookPen className="fs-4" />
                </Col>
                <Col>
                  <Link href="/courses/1234/assignments/456" className="a-link">A2 - CSS + BOOTSTRAP</Link>
                  <p className="fs-6">
                    <span className="text-danger">Multiple Modules </span> | 
                    <b>  Not available until </b> May 13 at 12:00am | 
                    <b> Due </b>May 20 at 11:59pm  |  100 pts
                  </p>
                </Col>
                <Col xs="auto" className="d-flex align-items-center">
                  <IndividualAssignmentControlButtons />
                </Col>
              </Row>
            </ListGroupItem>

            <ListGroupItem className="wd-assignment p-2 ps-1">
              <Row>
                <Col xs="auto" className="d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" />
                  <LuNotebookPen className="fs-4" />
                </Col>
                <Col>
                  <Link href="/courses/1234/assignments/789" className="a-link">A3 - JAVASCRIPT + REACT</Link>
                  <p className="fs-6">
                    <span className="text-danger">Multiple Modules </span> | 
                    <b>  Not available until </b> May 20 at 12:00am | 
                    <b> Due </b>May 27 at 11:59pm  |  100 pts
                  </p>
                </Col>
                <Col xs="auto" className="d-flex align-items-center">
                  <IndividualAssignmentControlButtons />
                </Col>
              </Row>
            </ListGroupItem>

          </ListGroup>
        </ListGroupItem>

      </ListGroup>

    </div>
);}
