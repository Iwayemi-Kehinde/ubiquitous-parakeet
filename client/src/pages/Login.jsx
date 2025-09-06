import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setClicked(true);

      await axios.post("http://localhost:5000/api/auth/login", formData);

      toast.success("Login successful!");

      // redirect after short delay
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
      setClicked(false);
    }
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
            required
            minLength={"12"}
          />

          <SubmitButton type="submit" disabled={clicked}>
            {loading ? <span className="spinner"></span> : "Login"}
          </SubmitButton>

          {/* Spinner CSS */}
          <style jsx="true">{`
            .spinner {
              width: 18px;
              height: 18px;
              border: 3px solid white;
              border-top: 3px solid transparent;
              border-radius: 50%;
              animation: spin 1s linear infinite;
            }
            @keyframes spin {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
          `}</style>
        </Form>

        <FooterText>
          Don&apos;t have an account?{" "}
          <Link
            to="/sign-up"
            style={{
              color: "#007bff",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Sign up
          </Link>
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

  display: flex;
  align-items: center;
  justify-content: center;

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
