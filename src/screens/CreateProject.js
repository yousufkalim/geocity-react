import React from 'react'
import  '../Theme/css/main.css'
function CreateProject() {
    return (
        <div className='main'>
        <div className='containerProject'>
          <form method="POST" className='appointmentform' id="appointment-form">
            <h2>Create A Project</h2>
            <div className="form-group-1">
              <input type="text" name="Project_name" id="Project_name" placeholder="Project_Name" required />
              <div className="select-list">
                <select name="Category" id="Category">
                  <option slected value>Category 1</option>
                  <option value="society">Category 2</option>
                  <option value="language">Category 3</option>
                </select>
              </div> 

              <input type="file" name="file" id="file" required />
            
              <input type="text" name="Desc" id="Desc" placeholder="Description" required />
        
            </div>
            {/* <div className="form-group-2">
              <h3>How would you like to bo located ?</h3>
              <div className="select-list">
                <select name="confirm_type" id="confirm_type">
                  <option seleected value>By phone</option>
                  <option value="by_email">By email</option>
                </select>
              </div>
              <div className="select-list">
                <select name="hour_appointment" id="hour_appointment">
                  <option seleected value>Hours : 8am 10pm</option>
                  <option value="9h-11h">Hours : 9am 11pm</option>
                </select>
              </div>
            </div>
            <div className="form-check">
              <input type="checkbox" name="agree-term" id="agree-term" className="agree-term" />
              <label htmlFor="agree-term" className="label-agree-term"><span><span /></span>I agree to the  <a href="#" className="term-service">Terms and Conditions</a></label>
            </div> */}
            <div className="form-submit">
              <input type="submit" name="submit" id="submit" className="submit" defaultValue="Request an appointment" />
            </div>
          </form>
        </div>
      </div>
    )
}

export default CreateProject
