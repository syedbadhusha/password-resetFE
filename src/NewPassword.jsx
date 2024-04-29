import React from 'react'
import { useNavigate } from 'react-router';
import { useFormik } from 'formik';
import axios from 'axios';
import { useParams } from 'react-router';


function NewPassword() {
  const navigate = useNavigate()
  const {mailid} = useParams()
  const newPassword = useFormik({
    initialValues: {
      mailid:mailid,
      newPassword:"",
      reEnterdPassword:""
    },
    validate: (values) => {
      let error = {};
      if (!values.newPassword) {
        error.newPassword = "Please Enter Mail ID";
      }
      if (!values.reEnterdPassword) {
        error.reEnterdPassword = "Please Enter Mail ID";
      }
      return error
    },
    onSubmit: async (values,{resetForm}) => {
      try{
        const res = await axios.put(`https://password-reset-ipux.onrender.com/updatenewpassword`,values)
        alert(res.data.message)
        resetForm();  
        navigate('/')
      }catch(error){
        alert(error.response.data.message)
      }
    },
  });
  return (
    <form onSubmit={newPassword.handleSubmit}>
      <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
        <div className="bg-white p-3 rounded w-25 text- center">
          <div className="mb-3">
            <label htmlFor="newPassword">Enter New Password</label>
            <input
              type="password"
              className="form-control"
              id="newPassword"
              name="newPassword"
              placeholder="Enter Your New Password"
              value={newPassword.values.newPassword}
              onChange={newPassword.handleChange}
              style={{
                borderColor:
                newPassword.getFieldMeta("newPassword").error &&
                newPassword.getFieldMeta("newPassword").touched &&
                  "red",
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="reEnterdPassword">Re-Enter New Password</label>
            <input
              type="password"
              className="form-control"
              id="reEnterdPassword"
              name="reEnterdPassword"
              placeholder="Re-Enter Your New Password"
              value={newPassword.values.reEnterdPassword}
              onChange={newPassword.handleChange}
              style={{
                borderColor:
                newPassword.getFieldMeta("reEnterdPassword").error &&
                newPassword.getFieldMeta("reEnterdPassword").touched &&
                  "red",
              }}
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Send OTP
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default NewPassword