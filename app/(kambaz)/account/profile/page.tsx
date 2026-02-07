import Link from "next/link";
import { Form, FormControl, FormSelect } from "react-bootstrap";
export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>
      <Form> 
      <FormControl defaultValue="alice" id="wd-username" placeholder="username" className="mb-2" />
      <FormControl defaultValue="123" id="wd-password" placeholder="password" className="mb-2" />
      <FormControl defaultValue="Alice" id="wd-firstname" placeholder="First Name" className="mb-2" />
      <FormControl defaultValue="Wonderland" id="wd-lastname" placeholder="Last Name" className="mb-2" />
      <FormControl defaultValue="2000-01-01" type="date" id="wd-dob" className="mb-2" />
      <FormControl defaultValue="alice@wonderland" type="email" id="wd-email" placeholder="email" className="mb-2" />
      <FormSelect defaultValue="FACULTY" id="wd-role" className="mb-2 pd-1">
          <option value="USER">User</option>
          <option value="FACULTY">Faculty</option>
          <option value="ADMIN">Admin</option>
          <option value="STUDENT">Student</option>
      </FormSelect>
      </Form>
      <Link id="wd-profile-signout-btn" href="signin" className="btn btn-danger w-100 mb-2">Sign out</Link>
    </div>
);}
