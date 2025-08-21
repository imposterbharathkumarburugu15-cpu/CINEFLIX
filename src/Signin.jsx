import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Form,
  Button,
  Row,
  Col,
  InputGroup,
  Card,
  Container,
} from "react-bootstrap";
import "./signin.css";
import l1 from "./logol.png"; // update path if needed

const schema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  username: Yup.string().required("Username is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  zip: Yup.string().required("Zip is required"),
  terms: Yup.boolean().oneOf([true], "You must accept the terms"),
});

const Signin = () => {
  return (
    <div className="main-content signin-container`">
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
                validationSchema={schema}
                onSubmit={(values, { setSubmitting }) => {
                  console.log("Form submitted:", values);
                  setSubmitting(false);
                  alert("Form submitted ✅");
                }}
                initialValues={{
                  firstName: "",
                  lastName: "",
                  username: "",
                  city: "",
                  state: "",
                  zip: "",
                  terms: false,
                }}
              >
                {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  values,
                  touched,
                  errors,
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

                    <Row className="mb-3">
                      <Form.Group as={Col} md="12" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <InputGroup hasValidation>
                          
                          <Form.Control
                            type="text"
                            name="username"
                            placeholder="@Username.gmail.com"
                            aria-describedby="inputGroupPrepend"
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.username && !!errors.username}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.username}
                          </Form.Control.Feedback>
                        </InputGroup>
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
                    </Row>

                    <Form.Group className="mb-3" controlId="terms">
                      <Form.Check
                        required
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

                    <Button type="submit" className="mt-2" variant="dark">
                      Submit form
                    </Button>
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

export default Signin;
