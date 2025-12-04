import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Card, Container } from "react-bootstrap";
import "./signin.css";
import l1 from "./logol.png";

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  terms: Yup.boolean().oneOf([true], "You must accept the terms"),
});

const Sign = () => {
  const navigate = useNavigate();

  return (
    <div className="main-content signin-container">
      <header className="site-header">
        <h1>CINEFLIX</h1>
      </header>

      <Container fluid className="d-flex justify-content-center align-items-start">
        <Card className="signin-card midterm">
          <div className="signin-left">
            <img src={l1} alt="illustration" className="signin-img" />
          </div>

          <div className="signin-right">
            <Card.Body>
              <h2 className="mb-4">Sign In</h2>

              <Formik
                initialValues={{ email: "", password: "", terms: false }}
                validationSchema={schema}
                onSubmit={(values, { setSubmitting }) => {
                  // show console info, then navigate to /movies
                  setSubmitting(true);
                  console.log("Sign form submitted:", values);

                  // small timeout to allow button disabled state to show briefly
                  setTimeout(() => {
                    setSubmitting(false);
                    // Navigate to movies page
                    navigate("/movies");
                  }, 300);
                }}
              >
                {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  values,
                  touched,
                  errors,
                  isSubmitting,
                }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="name@example.com"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.email && !!errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.password && !!errors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="terms">
                      <Form.Check
                        name="terms"
                        label="Agree to terms and conditions"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.terms && !!errors.terms}
                        feedback={errors.terms}
                        feedbackType="invalid"
                        checked={values.terms}
                      />
                    </Form.Group>

                    <Row>
                      <Col>
                        <Button
                          type="submit"
                          variant="dark"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Submitting..." : "Submit"}
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Sign;
