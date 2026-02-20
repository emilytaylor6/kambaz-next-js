'use client'
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function CourseNavigation() {
  const params = useParams();
  const cid = params.cid;
  const pathname = usePathname();
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

  /**
   * handles the "people" string and produces a link to /people/table instead of /people 
   * @param link the given link
   * @returns the given link or /people/table if the link is people, both as fully lowercase
   */
  const produceLink = (link: string) => {
    if (link === "People") {
      return link.toLowerCase() + "/table";
    }
    return link.toLowerCase();
  }

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link key={link} href={`/courses/${cid}/${produceLink(link)}`} id={`wd-course-${link.toLowerCase()}-link`} 
        className={`list-group-item border-0 ${pathname.includes(link.toLowerCase()) ? "active" : "text-danger"}`}>
          {link}
        </Link>
      ))}
    </div>
  );}
