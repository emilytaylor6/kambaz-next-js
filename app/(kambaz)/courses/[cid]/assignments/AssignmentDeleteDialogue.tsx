"use client"
import { Modal, Button } from "react-bootstrap";
import { deleteAssignment } from "./reducer";
import { useDispatch } from "react-redux";

export default function AssignmentDeleteDialogue({ show, handleClose, assignmentId}: {
 show: boolean; handleClose: () => void; assignmentId: string }) {
    const dispatch = useDispatch(); 

 return (
  <Modal show={show} onHide={handleClose}>
   <Modal.Header closeButton>
    <Modal.Title>Are you sure you want to delete this assignment?</Modal.Title>
   </Modal.Header>
   <Modal.Body>
    <Button variant="secondary" onClick={handleClose}> No </Button>
    <Button variant="danger"
     onClick={() => {
      dispatch(deleteAssignment(assignmentId));
      handleClose();
     }} > Yes </Button>
   </Modal.Body>
  </Modal>
);}