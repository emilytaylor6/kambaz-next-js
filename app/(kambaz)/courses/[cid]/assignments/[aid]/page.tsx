import { Form, FormLabel, FormControl, Row, Col, FormSelect, Container, FormCheck, Button } from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
    <Form>
        <Row controlid="assignment-name" className="ps-3 pe-2">
            <FormLabel id="wd-name">Assignment Name</FormLabel>
            <FormControl id="wd-name" type="assignment" placeholder="Assignment Name" />
        </Row>
        <br />
        <Row controlid="assignment-description" className="ps-3 pe-2">
            <FormControl as="textarea" rows={4} placeholder="Assignment Description" />
        </Row>
        <br /><br />
        <Row controlid="points">
            <Col className="assignment-editor-label"><FormLabel sm={2}>Points</FormLabel></Col>
            <Col sm={8}> <FormControl type="points" placeholder="Points" defaultValue="100" /> </Col>
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
                        <FormControl id="wd-due-date" type="datetime-local" />
                    </Row>
                    <br />
                    <Row className="ps-1 pe-1">
                        <Col className="col-md-6">
                            <FormLabel id="wd-avail-date"><b>Available From</b></FormLabel>
                            <FormControl id="wd-avail-date" type="datetime-local" />
                        </Col>
                        <Col className="col-md-6">
                            <FormLabel id="wd-until-date"><b>Until</b></FormLabel>
                            <FormControl id="wd-until-date" type="datetime-local" />
                        </Col>
                    </Row>
                    <br />
                </Container>
            </Col>
        </Row>
        <hr />
        <Button variant="danger" size="lg" className="me-2 float-end" id="wd-save-assignment-btn" type="submit">Save</Button>
        <Button variant="secondary" size="lg" className="me-2 float-end" id="wd-cancel-assignment-btn">Cancel</Button>
    </Form>
    </div>
);}
