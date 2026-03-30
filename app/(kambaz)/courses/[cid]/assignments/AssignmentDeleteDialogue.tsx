"use client"
import { Modal, Button } from "react-bootstrap";
import { setAssignments } from "./reducer";
import { useDispatch } from "react-redux";
import * as client from "../../client";

export default function AssignmentDeleteDialogue({ show, handleClose, assignmentId, assignments}: {
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 show: boolean; handleClose: () => void; assignmentId: string; assignments: any[] }) {
    const dispatch = useDispatch(); 

  const onRemoveAssignment = async (assignmentId: string) => {
    await client.deleteAssignment(assignmentId);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch(setAssignments(assignments.filter((a: any) => a._id !== assignmentId)));
  };

 return (
  <Modal show={show} onHide={handleClose}>
   <Modal.Header closeButton>
    <Modal.Title>Are you sure you want to delete this assignment?</Modal.Title>
   </Modal.Header>
   <Modal.Body>
    <Button variant="secondary" onClick={handleClose}> No </Button>
    <Button variant="danger"
     onClick={() => {
      // dispatch(deleteAssignment(assignmentId));
      onRemoveAssignment(assignmentId);
      handleClose();
     }} > Yes </Button>
   </Modal.Body>
  </Modal>
);}