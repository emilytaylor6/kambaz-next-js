"use client"
import { Button, InputGroup, FormControl, Col, Row } from "react-bootstrap";
import { FaMagnifyingGlass, FaPlus } from "react-icons/fa6";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function AssignmentControls() {
    const { cid } = useParams(); 
    
    return (
        <div id="wd-assignment-controls" className="text-nowrap">
            <Row>
                <Col>
                    <InputGroup className="float-end" size="lg" id='wd-assignment-search'>
                        <InputGroupText>
                            <FaMagnifyingGlass className="position-relative me-2" style={{ bottom: "1px" }} />
                        </InputGroupText>
                        <FormControl type="search" placeholder="Search..."/>
                    </InputGroup>
                </Col>
                <Col xs="auto">
                    <Link href={`/courses/${cid}/assignments/create`}>
                        <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-assignment-btn">
                            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                            Assignment
                        </Button>
                    </Link>
                    <Button variant="secondary" size="lg" className="me-2 float-end" id="wd-add-group-btn">
                        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                        Group
                    </Button>
                </Col>
            </Row>
        </div>
    );
}