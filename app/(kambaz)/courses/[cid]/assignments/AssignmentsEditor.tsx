"use client"
import { redirect } from "next/navigation";
import { Modal, FormControl, Button } from "react-bootstrap";

export default function AssignmentsEditor({ show, handleClose, dialogTitle, assignmentName, setAssignmentName, addAssignment,}: {
 show: boolean; handleClose: () => void; dialogTitle: string; assignmentName: string; setAssignmentName: (name: string) => void;
 addAssignment: () => void; }) {
 return (
  <Modal show={show} onHide={handleClose}>
   <Modal.Header closeButton>
    <Modal.Title>{dialogTitle}</Modal.Title>
   </Modal.Header>
   <Modal.Body>
    <FormControl value={assignmentName}
     onChange={(e) => { setAssignmentName(e.target.value); }} />
   </Modal.Body>
   <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}> Cancel </Button>
    <Button variant="primary"
     onClick={() => {
      addAssignment();
      redirect(`./page`);
     }} > Save </Button>
   </Modal.Footer>
  </Modal>
);}
