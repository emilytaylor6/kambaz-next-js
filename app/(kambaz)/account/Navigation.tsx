"use client"
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { usePathname } from "next/navigation";
import { Nav, NavItem, NavLink } from "react-bootstrap";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const links = currentUser ? ["profile"] : ["signin", "signup"];
  const pathname = usePathname(); 
 return (
   <Nav variant="pills">
     {links.map((link) => (
       <NavItem key={link}>
         <NavLink as={Link} href={link} active={pathname.endsWith(link)}>
           {link} </NavLink> </NavItem>
     ))}
   </Nav>
    //  <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
    //    <Link href="signin" id="wd-signin-link" className="list-group-item active border-0"> Signin </Link>
    //    <Link href="signup" id="wd-signup-link" className="list-group-item text-danger border-0"> Signup </Link> 
    //    <Link href="profile" id="wd-profile-link" className="list-group-item text-danger border-0"> Profile </Link> 
    //  </div>
);}
