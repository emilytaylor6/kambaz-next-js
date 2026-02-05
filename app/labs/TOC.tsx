// import Link from "next/link";
// export default function TOC() {
//  return (
//    <ul>
//      <li>
//        <Link href="/labs" id="wd-lab1-link">
//          Home </Link>
//      </li>
//      <li>
//        <Link href="/labs/lab1" id="wd-lab1-link">
//          Lab 1 </Link>
//      </li>
//      <li>
//        <Link href="/labs/lab2" id="wd-lab2-link">
//          Lab 2 </Link>
//      </li>
//      <li>
//        <Link href="/labs/lab3" id="wd-lab3-link">
//          Lab 3 </Link>
//      </li>
//      <li>
//         <Link href="/" id="wd-lab3-link">
//         Kambaz </Link>
//      </li>
//      <li>
//         <Link href="https://github.com/emilytaylor6/kambaz-next-js/" id="wd-github">
//         GitHub Repo </Link>
//      </li>
//    </ul>
// );}

import { Nav, NavItem, NavLink } from "react-bootstrap";
// import Link from "next/link";
export default function TOC() {
 return (
   <Nav variant="pills">
     <NavItem>
       <NavLink href="/labs">Labs</NavLink>
     </NavItem>
     <NavItem>
       <NavLink href="/labs/lab1">Lab 1</NavLink>
     </NavItem>
     <NavItem>
       <NavLink href="/labs/lab2">Lab 2</NavLink>
     </NavItem>
     <NavItem>
       <NavLink href="/labs/lab3">Lab 3</NavLink>
     </NavItem>
     <NavItem>
       <NavLink href="/">Kambaz</NavLink>
     </NavItem>
     <NavItem>
       <NavLink href="https://github.com/emilytaylor6/kambaz-next-js/">My GitHub</NavLink>
     </NavItem>
   </Nav>
);}
