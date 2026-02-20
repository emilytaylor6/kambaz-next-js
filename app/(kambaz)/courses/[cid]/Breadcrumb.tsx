"use client";
import { usePathname } from "next/navigation";

export default function Breadcrumb({ course }: { course: { name: string } | undefined; }) {
 const pathname = usePathname();
 const sectionUncapitalized = pathname.split("/").pop();

 /** captitalizes the first letter of the given string */
 function capitalizeFirstLetter(section : string | undefined ) {
    if (!section || section.length === 0) return section;
    return section.charAt(0).toUpperCase() + section.slice(1);
 }
 const sectionCapitalized = capitalizeFirstLetter(sectionUncapitalized);

 let fullPath = course?.name;
 if (sectionCapitalized) {
    fullPath = fullPath + ` > ${sectionCapitalized}`;
 }

 return (
   <span>
        {fullPath}
   </span>
);}
