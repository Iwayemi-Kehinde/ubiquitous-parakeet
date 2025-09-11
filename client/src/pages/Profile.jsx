import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("You must be logged in to view profile");
      navigate("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        toast.error("Session expired, please log in again");
        localStorage.removeItem("accessToken");
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  if (!user) return null; // could put a spinner here

  return (
    <PageContainer>
      <ProfileWrapper>
        <Title>My Profile</Title>

        <ProfileInfo>
          <Label>Name:</Label>
          <Value>{user.name}</Value>

          <Label>Email:</Label>
          <Value>{user.email}</Value>
        </ProfileInfo>

        <LogoutButton onClick={() => dispatch(logout())}>Logout</LogoutButton>
      </ProfileWrapper>
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

const ProfileWrapper = styled.div`
  background: white;
  padding: 40px;
  border-radius: 12px;
  width: 500px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: 700;
  color: #333;
`;

const ProfileInfo = styled.div`
  margin-bottom: 30px;
`;

const Label = styled.p`
  font-weight: 600;
  color: #555;
  margin: 10px 0 5px;
`;

const Value = styled.p`
  color: #333;
  font-size: 16px;
`;

const LogoutButton = styled.button`
  padding: 14px;
  border-radius: 10px;
  border: none;
  background: #ff4d4f;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #d9363e;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
`;
