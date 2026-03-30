"use client"
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../modules/GreenCheckmark";
import { useState } from "react";
import { FaTrash } from "react-icons/fa6";
import AssignmentDeleteDialogue from "./AssignmentDeleteDialogue";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function IndividualAssignmentControlButtons({ assignmentId, assignments } : { assignmentId: string, assignments: any[] }) {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <div className="float-end">
            <GreenCheckmark />
            <IoEllipsisVertical className="fs-4" />
            <FaTrash className="text-danger me-2 mb-1" onClick={handleShow} />

            <AssignmentDeleteDialogue show={show} assignmentId={assignmentId} handleClose={handleClose} assignments={assignments} />
        </div>
    );
} 