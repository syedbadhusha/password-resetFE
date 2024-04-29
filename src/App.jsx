import { BrowserRouter, Route, Routes } from "react-router-dom"
import CreateUsers from "./CreateUsers"
import PasswordReset from "./PasswordReset"
import OtpVerification from "./OtpVerification"
import NewPassword from "./NewPassword"
import 'bootstrap/dist/css/bootstrap.css'
import { ContetWraper } from "./Context"
import { useState } from "react"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CreateUsers/>}/>
        <Route path="/passwordreset" element={<PasswordReset/>}/>
        <Route path="/otpverification/:mailid" element={<OtpVerification/>}/>
        <Route path="/newpassword/:mailid" element={<NewPassword/>}/>
      </Routes>
    </BrowserRouter>
    )
}

export default App
