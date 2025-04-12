import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup'
import "./SignUp.css"
import { UserContext } from "../Context/UserContext";
import img from './../../assets/login.jpg'
export default function SignUp() {
  //validation
  let validationSchema = Yup.object({
    name: Yup.string().required('name is required').min(3, 'min length is 3').max(30, 'max length is 30'),
    email: Yup.string().required('email is required').email('enter valid email'),  //check on email
    phone: Yup.string().required('phone is required').matches(/^01[1250][0-9]{8}$/, 'phone is not valid'),
    password: Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{6,8}$/, 'password is not valid'),
    rePassword: Yup.string().required('confirm password is required').oneOf([Yup.ref('password')]),


  })
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleRegister,
  });
  let navigate = useNavigate();

  const [apiError, SetapiError] = useState('');
  let {SetIsLogin}=useContext(UserContext);


  async function handleRegister(formData) {
    // console.log("Register Handeled",formData);
    await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', formData)
      .then((response) => {
        console.log("success", response)
        if (response.data.message == 'success') {
          localStorage.setItem("UserToken",response.data.token)
          SetIsLogin(response.data.token)
          console.log(response.data.token)
          navigate('/login')
        }
      })

      .catch((error) => {
        console.log("error", error.response.data.message)
        SetapiError(error.response.data.message)
      })


  }
  



  return (
    <>
      <section className=" vh-100 signup ">
        <div className="container ">
          <div className="row d-flex justify-content-center align-items-center ">
            <div className="col-lg-12 col-xl-11">
              <div className=" text-black">
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>

                      {apiError ? (<div className="api text-danger bg-light px-2 my-2 py-2 rounded">
                        {apiError}

                      </div>) : null}


                      <form className="mx-1 mx-md-4" onSubmit={formik.handleSubmit} action="#">
                        <div className="d-flex flex-row align-items-center mb-3">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div
                            data-mdb-input-init
                            className="form-outline flex-fill mb-0"
                          >
                            <input
                              type="text"
                              id="formName"
                              name="name"
                              value={formik.values.name}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              placeholder="Your Name"
                              className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
                              required
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-3">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div
                            data-mdb-input-init
                            className="form-outline flex-fill mb-0"
                          >
                            <input
                              type="email"
                              id="formMail"
                              name="email"
                              value={formik.values.email}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              placeholder="Your Email"
                              className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                              required
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-3">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div
                            data-mdb-input-init
                            className="form-outline flex-fill mb-0"
                          >
                            <input
                              type="password"
                              id="formPass"
                              name="password"
                              value={formik.values.password}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              placeholder="Password"
                              className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`} required
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-3">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div
                            data-mdb-input-init
                            className="form-outline flex-fill mb-0"
                          >
                            <input
                              type="password"
                              placeholder="Repeat your password"
                              name="rePassword"
                              value={formik.values.rePassword}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              id="formRePass"
                              className={`form-control ${formik.touched.rePassword && formik.errors.rePassword ? 'is-invalid' : ''}`} required
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-3">
                          <i className="fas fa-phone fa-lg me-3 fa-fw"></i>
                          <div
                            data-mdb-input-init
                            className="form-outline flex-fill mb-0"
                          >
                            <input
                              type="tel"
                              placeholder="Your Phone"
                              name="phone"
                              value={formik.values.phone}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              id="formPhone"
                              className={`form-control ${formik.touched.phone && formik.errors.phone ? 'is-invalid' : ''}`} required
                            />
                          </div>
                        </div>

                        <div className="form-check d-flex justify-content-center mb-5">
                          <input
                            className="form-check-input me-2"
                            type="checkbox"
                            value=""
                            id="form2Example3c"
                            required
                          />
                          <label
                            className="form-check-label"
                            htmlFor="form2Example3"
                          >
                            I agree all statements in{" "}
                            <a href="#!">Terms of service</a>
                          </label>
                        </div>

                        <div className="d-flex justify-content-center mx-4 ">
                          <button
                            type="submit"
                            data-mdb-button-init
                            data-mdb-ripple-init
                            className="btn btn-primary btn-lg"
                          >
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center  order-1 order-lg-2">
                      <img
                        src={img}
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
