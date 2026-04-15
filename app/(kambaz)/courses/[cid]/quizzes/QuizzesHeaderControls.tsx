"use client"

import Link from "next/link";
import { useParams } from "next/navigation";
import { Button, Col, FormControl, InputGroup, Row } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { FaMagnifyingGlass, FaPlus } from "react-icons/fa6";

export default function QuizzesHeaderControls({ canEdit, setSearch } : { canEdit: boolean, setSearch: (search: string) => void }) {
    const { cid } = useParams();

    return (
        <div id="wd-quizzes-header-controls" className="text-nowrap">
            <Row className="justify-content-between align-items-center">
                <Col xs={12} md={6}>
                    <InputGroup className="float-end" size="lg" id="wd-quizzes-search">
                        <InputGroupText>
                            <FaMagnifyingGlass className="position-relative me-2" style={{ bottom: "1px" }} />
                        </InputGroupText>
                        <FormControl 
                            type="search" 
                            placeholder="Search..."
                            onChange={(e) => setSearch(e.target.value)}
                        /> 
                    </InputGroup>
                </Col>

                {canEdit && (
                    <Col xs={12} md="auto" className="mt-2 mt-md-0">
                        <Link href={`/courses/${cid}/quizzes/create`}>
                            <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-quiz-btn">
                                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                                Quiz
                            </Button>
                        </Link>
                    </Col>
                )}
            </Row>
        </div>
    )
}