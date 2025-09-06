import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom"
import axios from 'axios'
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false)

  const [clicked, setClicked] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Password don't match")
    } else {
      try {
        setLoading(true)
        setClicked(true)
        await axios.post('http://localhost:5000/api/auth/register', formData)
        navigate('/login')
        toast.success("Signup successful!");

        // redirect after short delay (so toast shows)
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } catch (error) {
        toast.error(error.response.data.message)
      } finally {
        setLoading(false)
        setClicked(false)
      }
    }
  };

  return (
    <PageContainer>
      <FormWrapper>
        <Title>Create an Account</Title>

        <Form onSubmit={handleSubmit}>
          <Label>Full Name</Label>
          <Input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />

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
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={"12"}
          />

          <Label>Confirm Password</Label>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <SubmitButton type="submit" disabled={clicked}>
            {loading ? (
              <span className="spinner"></span>
            ) : (
              "Sign Up"
            )}
          </SubmitButton>

          {/* Simple CSS for spinner */}
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
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

        </Form>

        <FooterText>
          Already have an account?   <Link to="/login" style={{
            color: "#007bff",
            textDecoration: "none",
            fontWeight: "600"
          }}>Login</Link>
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

const LoginLink = styled.a`
  color: #007bff;
  text-decoration: none;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;
