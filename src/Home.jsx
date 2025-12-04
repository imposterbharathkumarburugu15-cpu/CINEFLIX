import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";
import "./Home.css";
import popImg from "./pop.png";
import { useNavigate, Link } from "react-router-dom"; 

// Validation schema
const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "At least 6 characters").required("Password is required"),
});

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="page-root">
      <header className="site-header">
        <h1 className="brand">CINEFLIX</h1>
      </header>

      <main className="home-wrap">
        <div className="card-shell">
          {/* left image */}
          <aside className="left-panel" aria-hidden="true">
            <img src={popImg} alt="Cineflix visual" className="left-image" />
          </aside>

          {/* right form */}
          <section className="right-panel">
            <div className="form-box">
              <h1>Welcome !</h1>
              <h2 className="title">Login Page .. </h2>

              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={schema}
                onSubmit={(values, { setSubmitting }) => {
                  navigate("/movies"); 
                  setSubmitting(false);
                }}
              >
                {({ handleSubmit, handleChange, handleBlur, values, touched, errors, isSubmitting }) => (
                  <Form noValidate onSubmit={handleSubmit} className="login-form">
                    <Form.Group className="mb-3" controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.email && !!errors.email}
                        aria-required="true"
                      />
                      <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        name="password"
                        type="password"
                        placeholder="Enter password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.password && !!errors.password}
                        aria-required="true"
                      />
                      <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    </Form.Group>

                    <div className="meta-row">
                      <div className="signup-cta">
                        <p>Note Type Any Email You get acess.</p>
                        <span>Don’t have an account?</span>
                        <Link to="/sign" className="link" style={{ marginLeft: "5px" }}>
                          Sign up
                        </Link>
                      </div>
                    </div>

                    <Button type="submit" className="submit-btn" disabled={isSubmitting}>
                      {isSubmitting ? "Logging in..." : "Login"}
                    </Button>
                  </Form>
                )}
              </Formik>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
