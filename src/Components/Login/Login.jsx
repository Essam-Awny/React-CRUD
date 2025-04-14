import React, { useState, useContext } from "react";
import "./Login.css";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import * as Yup from "yup";
import img from './../../assets/login2.jpg';
import { auth } from './../firebase'; // import Firebase auth module
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Enter a valid email"),
    password: Yup.string()
      .required("Password is required")
      .matches(/^[A-Z][a-z0-9]{6,8}$/, "Password is not valid"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleLogin,
  });

  const navigate = useNavigate();
  const [apiError, SetapiError] = useState("");
  const { SetIsLogin } = useContext(UserContext);

  async function handleLogin(formData) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;
      console.log("User logged in successfully:", user);

      // Get the Firebase token
      const token = await user.getIdToken();

      // Store the token and set the login state
      localStorage.setItem("UserToken", token);
      SetIsLogin(token);

      // Redirect to the dashboard or main page
<<<<<<< HEAD
      navigate("/dashboard");
=======
      navigate("/view");
>>>>>>> dacd5ba51a754a744fd456a4573c3a8053538f78
    } catch (error) {
      console.error("Error during login:", error.message);
      SetapiError(error.message);
    }
  }

  return (
    <section className="d-flex justify-content-center align-items-center vh-100 login">
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-10 col-lg-7 col-xl-6 order-2 order-lg-1">
            <form
              className="mx-1 mx-md-4 w-100 p-5"
              onSubmit={formik.handleSubmit}
            >
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                Log In
              </p>

              {apiError ? (
                <div className="api text-danger bg-light px-2 my-2 py-2 rounded">
                  {apiError}
                </div>
              ) : null}

              {/* Email Field */}
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

              {/* Password Field */}
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

              {/* Submit Button */}
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

          {/* Image */}
          <div className="col-md-9 col-lg-5 col-xl-6 d-flex align-items-center order-1 order-lg-2">
            <img src={img} className="img-fluid" alt="Sample image" />
          </div>
        </div>
      </div>
    </section>
  );
}
