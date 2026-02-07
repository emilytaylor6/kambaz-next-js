import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import { Badge } from "react-bootstrap";

export default function AssignmentControlButtons() {
    return (
        <div className="float-end">
            <Badge bg="secondary" className="text-black border-secondary">40% of Total</Badge>
            <BsPlus className="fs-3" />
            <IoEllipsisVertical className="fs-4" />
        </div>
    );
} 