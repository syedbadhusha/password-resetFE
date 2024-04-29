import React from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router';

function PasswordReset() {
    const navigate = useNavigate()
    const passwordReset = useFormik({
      initialValues: {
        mailid: "",
      },
      validate: (values) => {
        let error = {};
        if (!values.mailid) {
          error.mailid = "Please Enter Mail ID";
        }
        return error
      },
      onSubmit: async (values,{resetForm}) => {
        try{
          values.otplink=`http://localhost:5173/otpverification/${passwordReset.values.mailid}`
          const res = await axios.post("https://password-reset-ipux.onrender.com/userbymailid",values)
          alert(res.data.message)
          resetForm();  
        }catch(error){
          alert(error.response.data.message)
        }
        navigate(`/otpverification/${values.mailid}`)
      },
    });
    return (
      <form onSubmit={passwordReset.handleSubmit}>
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
          <div className="bg-white p-3 rounded w-25 text- center">
            <div className="mb-3">
              <label htmlFor="mailid">Email ID</label>
              <input
                type="email"
                className="form-control"
                id="mailid"
                name="mailid"
                placeholder="EMAIL"
                value={passwordReset.values.mailid}
                onChange={passwordReset.handleChange}
                style={{
                  borderColor:
                  passwordReset.getFieldMeta("mailid").error &&
                  passwordReset.getFieldMeta("mailid").touched &&
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

export default PasswordReset