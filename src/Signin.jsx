import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Card, Container } from "react-bootstrap";
import "./signin.css";
import l1 from "./logol.png";

const schema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  zip: Yup.string().required("Zip is required"),
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
              <h2 className="mb-4"> Register</h2>

              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                  city: "",
                  state: "",
                  zip: "",
                  terms: false,
                }}
                validationSchema={schema}
                onSubmit={(values, { setSubmitting }) => {
                  console.log("Form submitted:", values);
                  // simulate async action briefly, then navigate
                  setSubmitting(true);
                  setTimeout(() => {
                    setSubmitting(false);
                    // navigate to movies page after successful submit
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
                    <Row className="mb-3">
                      <Form.Group as={Col} md="6" controlId="firstName">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                          type="text"
                          name="firstName"
                          value={values.firstName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.firstName && !!errors.firstName}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.firstName}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group as={Col} md="6" controlId="lastName">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                          type="text"
                          name="lastName"
                          value={values.lastName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.lastName && !!errors.lastName}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.lastName}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>

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

                    <Row className="mb-3">
                      <Form.Group as={Col} md="6" controlId="password">
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

                      <Form.Group as={Col} md="6" controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="confirmPassword"
                          placeholder="Confirm password"
                          value={values.confirmPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={
                            touched.confirmPassword && !!errors.confirmPassword
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.confirmPassword}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>

                    <Row className="mb-3">
                      <Form.Group as={Col} md="6" controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          type="text"
                          name="city"
                          placeholder="City"
                          value={values.city}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.city && !!errors.city}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.city}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group as={Col} md="3" controlId="state">
                        <Form.Label>State</Form.Label>
                        <Form.Control
                          type="text"
                          name="state"
                          placeholder="State"
                          value={values.state}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.state && !!errors.state}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.state}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group as={Col} md="3" controlId="zip">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control
                          type="text"
                          name="zip"
                          placeholder="Zip"
                          value={values.zip}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.zip && !!errors.zip}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.zip}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>

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
