import axios from "axios";
import { useFormik } from "formik";
import { Link } from "react-router-dom";

function CreateUsers() {
  const userCreation = useFormik({
    initialValues: {
      name: "",
      mailid: "",
      password: "",
      contactno: "",
    },
    validate: (values) => {
      let error = {};
      if (!values.name) {
        error.name = "Please Enter Name";
      }
      if (!values.mailid) {
        error.mailid = "Please Enter Mail ID";
      }
      if (!values.password) {
        error.password = "Please Enter Password";
      }
      return error
    },
    onSubmit: async (values,{resetForm}) => {
      try{
        const res = await axios.post("https://password-reset-ipux.onrender.com/creatuser",values)
        alert(res.data.message)
        resetForm();  
      }catch(error){
        alert(error.response.data)
      }
    },
  });
  return (
    <form onSubmit={userCreation.handleSubmit}>
      <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
        <div className="bg-white p-3 rounded w-25 text- center">
          <div className="mb-3">
            <label htmlFor="name">User Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="USER NAME"
              value={userCreation.values.name}
              onChange={userCreation.handleChange}
              style={{
                borderColor:
                  userCreation.getFieldMeta("name").error &&
                  userCreation.getFieldMeta("name").touched &&
                  "red",
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="mailid">Email ID</label>
            <input
              type="email"
              className="form-control"
              id="mailid"
              name="mailid"
              placeholder="EMAIL"
              value={userCreation.values.mailid}
              onChange={userCreation.handleChange}
              style={{
                borderColor:
                userCreation.getFieldMeta("mailid").error &&
                userCreation.getFieldMeta("mailid").touched &&
                  "red",
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="PASSWORD"
              value={userCreation.values.password}
              onChange={userCreation.handleChange}
              style={{
                borderColor:
                userCreation.getFieldMeta("password").error &&
                userCreation.getFieldMeta("password").touched &&
                  "red",
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="contactno">Contact Number</label>
            <input
              type="text"
              className="form-control"
              id="contactno"
              placeholder="CONTACT NUMBER"
              value={userCreation.values.contactno}
              onChange={userCreation.handleChange}
            />
          </div>
          <Link to={'/passwordreset'}>Forgot Password?</Link>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CreateUsers;
