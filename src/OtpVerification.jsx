import React from 'react'
import { useNavigate } from 'react-router';
import { useFormik } from 'formik';
import axios from 'axios';
import { useParams } from 'react-router';

function OtpVerification() {
    const navigate = useNavigate()
    const {mailid} = useParams()
    const otpVerification = useFormik({
      initialValues: {
        mailid:mailid,
        otp: "",
      },
      validate: (values) => {
        let error = {};
        if (!values.otp) {
          error.otp = "Please Enter Mail ID";
        }
        return error
      },
      onSubmit: async (values,{resetForm}) => {
        try{
          const res = await axios.get("https://password-reset-ipux.onrender.com/verifyotp",values)
          alert(res.data.message)
          resetForm();  
          navigate(`/newpassword/${values.mailid}`)
        }catch(error){
          alert(error.response.data.message)
        }
      },
    });
    return (
      <form onSubmit={otpVerification.handleSubmit}>
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
          <div className="bg-white p-3 rounded w-25 text- center">
            <div className="mb-3">
              <label htmlFor="otp">Enter Your OTP</label>
              <input
                type="text"
                className="form-control"
                id="otp"
                name="otp"
                placeholder="OTP"
                value={otpVerification.values.otp}
                onChange={otpVerification.handleChange}
                style={{
                  borderColor:
                  otpVerification.getFieldMeta("otp").error &&
                  otpVerification.getFieldMeta("otp").touched &&
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

export default OtpVerification