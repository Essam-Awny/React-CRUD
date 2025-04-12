import React from "react";
import "./Login.css";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "../Context/UserContext";
import { useContext } from "react";
import * as Yup from "yup";
import img from './../../assets/login2.jpg'

export default function Login() {
  let validationSchema = Yup.object({
    email: Yup.string()
      .required("email is required")
      .email("enter valid email"), //check on email
    password: Yup.string()
      .required("password is required")
      .matches(/^[A-Z][a-z0-9]{6,8}$/, "password is not valid"),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleLogin,
  });
  let navigate = useNavigate();

  const [apiError, SetapiError] = useState("");
  let { SetIsLogin } = useContext(UserContext);

  async function handleLogin(formData) {
    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", formData)
      .then((response) => {
        console.log("Success", response);
        if (response.data.message == "success") {
          localStorage.setItem("UserToken", response.data.token);
          SetIsLogin(response.data.token);
          console.log(response.data.token);
          navigate("/view");
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
        SetapiError(error.response.data.message);
        console.log(apiError);
      });
  }

  return (
    <>
      <section className="d-flex justify-content-center align-items-center vh-100 login ">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-md-10 col-lg-7 col-xl-6 order-2 order-lg-1">
            <form className="mx-1 mx-md-4 w-100 p-5 " onSubmit={formik.handleSubmit}>
          <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
            Log In
          </p>
          {apiError ? (
            <div className="api text-danger bg-light px-2 my-2 py-2 rounded">
              {apiError}
            </div>
          ) : null}

          <div className="d-flex flex-row align-items-center mb-4">
            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
            <div data-mdb-input-init className="form-outline flex-fill mb-0">
              <input
                type="email"
                id="formMail"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Your Email"
                className={`form-control ${
                  formik.touched.email && formik.errors.email
                    ? "is-invalid"
                    : ""
                }`}
                required
              />
            </div>
          </div>

          <div className="d-flex flex-row align-items-center mb-4">
            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
            <div data-mdb-input-init className="form-outline flex-fill mb-0">
              <input
                type="password"
                id="formPass"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Password"
                className={`form-control ${
                  formik.touched.password && formik.errors.password
                    ? "is-invalid"
                    : ""
                }`}
                required
              />
            </div>
          </div>

          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
            <button
              type="submit"
              data-mdb-button-init
              data-mdb-ripple-init
              className="btn btn-primary btn-lg"
            >
              LogIn
            </button>
          </div>
        </form>
            </div>
            <div className="col-md-9 col-lg-5 col-xl-6 d-flex align-items-center order-1 order-lg-2">
                      <img
                      src={img}
                         className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
          </div>
        </div>
       
      </section>
    </>
  );
}
