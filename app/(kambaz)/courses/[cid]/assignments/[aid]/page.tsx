export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <h3 id="wd-name">Assignment Name</h3>
      <input id="wd-name" defaultValue="A1 - ENV + HTML" />
      <br /><br />
      <textarea id="wd-description" defaultValue=
        "The assignment is available online Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following: Your full name and section Links to each of the lab assignments Link to the Kambaz application Links to all relevant source code repositories The Kanbaz application should include a link to navigtae back to to the landing page."/>
      <br />
      <br/>
      <table>
        <tbody>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" defaultValue={100} />
          </td>
        </tr>
        <br/>

        <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
                <select id="wd-group">
                    <option defaultValue="ASSIGNMENTS">ASSIGNMENTS</option>
                    <option value="QUIZZES">QUIZZES</option>
                </select>
            </td>
        </tr>
        <br/>

        <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-grade">Display Grade as</label>
            </td>
            <td>
                <select id="wd-grade">
                    <option defaultValue="PERCENTAGE">PERCENTAGE</option>
                    <option value="POINTS">POINTS</option>
                </select>
            </td>
        </tr>
        <br/>

        <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-type">Submission Type</label>
            </td>
            
            <td>
                <select id="wd-type">
                    <option defaultValue="Online">Online</option>
                    <option value="Paper">On Paper</option>
                    <option value="None">No Submission</option>
                </select>
                <br/><br/>
                <label htmlFor="wd-online-entry">Online Entry Options</label><br></br>

                <input type="checkbox" name="check-online" id="wd-chkbox-text"/>
                <label htmlFor="wd-chkbox-text">Text Entry</label><br/>

                <input type="checkbox" name="check-online" id="wd-chkbox-url"/>
                <label htmlFor="wd-chkbox-url">Website URL</label><br/>

                <input type="checkbox" name="check-online" id="wd-chkbox-media"/>
                <label htmlFor="wd-chkbox-media">Media Recordings</label><br/>

                <input type="checkbox" name="check-online" id="wd-chkbox-annotation"/>
                <label htmlFor="wd-chkbox-annotation">Student Annotation</label><br/>

                <input type="checkbox" name="check-online" id="wd-chkbox-file"/>
                <label htmlFor="wd-chkbox-file">File Uploads</label><br/>
            </td>
        </tr>
        <br/>

        <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-assign">Assign</label>
            </td>
            <td>
                <label  htmlFor="wd-assign">Assign to</label><br/>
                <input id="wd-name" defaultValue="Everyone" />
                <br/><br/>
                
                <label htmlFor="wd-due-date">Due</label><br/>
                <input type="date"
                    defaultValue="2024-05-13"
                    id="wd-due-date"/>
                <br/><br/>

                <td>
                    <label htmlFor="wd-avail-date">Available From </label><br/>
                    <input type="date"
                        defaultValue="2024-05-06"
                        id="wd-avail-date"/>
                </td>

                <td>
                    <label htmlFor="wd-until-date">Until</label><br/>
                    <input type="date"
                        defaultValue="2024-05-20"
                        id="wd-until-date"/><br/>
                </td>
        
            </td>
        </tr>
      </tbody>
      </table>
      <hr></hr>

      <table width="100%">
        <tbody>
        <tr>
            <td align="right">
                <button>Cancel</button>
                <button>Save</button>
            </td>
        </tr>
        </tbody>
      </table>

    </div>
);}
