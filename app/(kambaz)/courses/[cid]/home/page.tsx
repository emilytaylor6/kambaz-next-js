import Modules from "../modules/page";
import CourseStatus from "./Status";
export default function Home() {
 return (
   <div id="wd-home">
     <table>
       <tbody>
         <tr>
           <td valign="top" width="80%"> <Modules />      </td>
           <td valign="top">             <CourseStatus /> </td>
         </tr>
       </tbody>
     </table>
   </div>
);}
