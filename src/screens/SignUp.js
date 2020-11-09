import React from 'react'
import  '../Theme/css/main.css'
function SignUp() {
    return (
        <div className='main'>
        <div className='containerProject'>
          <form method="POST" className='appointmentform' id="appointment-form">
            <h2>Sign Up form</h2>
            <div className="form-group-1">
              <input type="text" name="first_name" id="first_name" placeholder="First_Name" required />
              <input type="text" name="last_name" id="last_name" placeholder="Last_Name" required />
              <input type="email" name="email" id="email" placeholder="Email" required />
              <input type="password" name="password" id="password" placeholder="Password" required />
              <input type="confirm_password" name="confirm_password" id="confirm_password" placeholder="Confirm_Password" required />



              <input type="file" name="file" id="file" required />
              <input type="number" name="phone_number" id="phone_number" placeholder="Phone number" required />
              {/* <div className="select-list">
                <select name="course_type" id="course_type">
                  <option slected value>Course Type</option>
                  <option value="society">Society</option>
                  <option value="language">Language</option>
                </select>
              </div> */}
              <input type="text" name="location" id="location" placeholder="Location" required />
              <input type="text" name="Desc" id="Desc" placeholder="Description" required />
              <input type="text" name="Material" id="Material" placeholder="Material" required />
              <input type="text" name="skill" id="skill" placeholder="Add a skill" required />


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

export default SignUp
