import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import * as client from "../../../account/client";
import { FaPencil } from "react-icons/fa6";
import { FaCheck, FaUserCircle } from "react-icons/fa";
import { FormControl } from "react-bootstrap";

export default function PeopleDetails({ uid, isAdmin, onClose }: { uid: string | null; isAdmin: boolean; onClose: () => void; }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [editing, setEditing] = useState(false);

  const saveUser = async () => {
    const [firstName, lastName] = name.split(" ");
    const updatedUser = { ...user, firstName, lastName, email, role };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
    onClose();
  };

  const fetchUser = async () => {
    if (!uid) return;
    const user = await client.findUserById(uid);
    setUser(user);
    setName(`${user.firstName} ${user.lastName}`);
    setEmail(user.email);
    setRole(user.role);
  };

  const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    onClose();
  };

  useEffect(() => {
    if (uid) fetchUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid]);
  if (!uid) return null;
  
  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button onClick={onClose} className="btn position-fixed end-0 top-0 wd-close-details">
        <IoCloseSharp className="fs-1" /> </button>
      <div className="text-center mt-2"> <FaUserCircle className="text-secondary me-2 fs-1" /> </div>
      <hr />

      <div className="text-danger fs-4 wd-name">
        {!editing && isAdmin && (
          <FaPencil onClick={() => setEditing(true)}
              className="float-end fs-5 mt-2 wd-edit" /> )}
        {editing && isAdmin && (
          <FaCheck onClick={() => saveUser()}
              className="float-end fs-5 mt-2 me-2 wd-save" /> )}
        {!editing && (
          <div className="wd-name"
               onClick={() => isAdmin && setEditing(true)}>
            {user.firstName} {user.lastName}</div>)}
        {user && editing && isAdmin && (
          <FormControl className="w-50 wd-edit-name"
            defaultValue={`${user.firstName} ${user.lastName}`}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") { saveUser(); }}}/>)}
      </div>

      <b>Roles:</b>
        {!editing && (
          <div className="wd-roles"
               onClick={() => isAdmin && setEditing(true)}>
            {user.role} </div>)}
        {user && editing && isAdmin && (         
            <span className="wd-roles">         
            <select value={role} onChange={(e) => setRole(e.target.value)}
                    className="form-select w-75 wd-select-role" >
                <option value="STUDENT">Student</option>
                <option value="TA">Assistant</option> 
                <option value="FACULTY">Faculty</option>
                <option value="ADMIN">Administrator</option>
            </select> </span>
        )}

      <b>Email:</b>
      <div className="wd-email">
        {!editing && (
          <div className="wd-name"
               onClick={() => isAdmin && setEditing(true)}>
            {user.email}</div>)}
        {user && editing && isAdmin && (
          <FormControl className="w-75 wd-edit-name"
            defaultValue={`${user.email}`}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") { saveUser(); }}}/>)}
      </div>

      <b>Login ID:</b>        <span className="wd-login-id">      {user.loginId}      </span> <br />
      <b>Section:</b>         <span className="wd-section">       {user.section}      </span> <br />
      <b>Total Activity:</b>  <span className="wd-total-activity">{user.totalActivity}</span> 
      <hr />

      {isAdmin && <button onClick={() => deleteUser(uid)} className="btn btn-danger float-end wd-delete" > Delete </button>}
      <button onClick={onClose}
              className="btn btn-secondary float-end me-2 wd-cancel" > Cancel </button>
    </div>
  );
}
