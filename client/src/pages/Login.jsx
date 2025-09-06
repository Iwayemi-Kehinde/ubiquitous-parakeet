import React, { useState } from "react";
import styled from "styled-components";
import {Link}  from "react-router-dom"

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your API call here
    console.log("Sign Up Data:", formData);
  };

  return (
    <PageContainer>
      <FormWrapper>
        <Title>Login Account</Title>

        <Form onSubmit={handleSubmit}>

          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            minLength={"12"}
            required
          />

          <SubmitButton type="submit">Login</SubmitButton>
        </Form>

        <FooterText>
          Don't have an account? <Link to="/sign-up" style={{
              color: "#007bff",
              textDecoration: "none",
              fontWeight: "600"
          }}>Sign up</Link>
        </FooterText>
      </FormWrapper>
    </PageContainer>
  );
}

// ---------------- Styled Components ----------------
const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f6d365, #fda085);
`;

const FormWrapper = styled.div`
  background: white;
  padding: 40px;
  border-radius: 12px;
  width: 500px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: 700;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: 600;
  color: #555;
`;

const Input = styled.input`
  padding: 12px;
  margin-bottom: 20px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 15px;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
  }
`;

const SubmitButton = styled.button`
  padding: 14px;
  border-radius: 10px;
  border: none;
  background: #007bff;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #0056b3;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
`;

const FooterText = styled.p`
  text-align: center;
  margin-top: 20px;
  color: #555;
  font-size: 15px;
`;


