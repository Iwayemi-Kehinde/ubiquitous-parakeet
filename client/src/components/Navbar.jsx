import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaSearch, FaHeart, FaShoppingCart, FaUser, FaBars } from "react-icons/fa";


export default function Navbar() {
  return (
    <OverallContainer>
      <Logo>E Commerce</Logo>

      <NavLinks>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/shop">Shop</Link>
        </li>
        <li>
          <Link to="/categories">Categories</Link>
        </li>
        <li>
          <Link to="/deals">Deals</Link>
        </li>
      </NavLinks>

      <SearchContainer>
        <input type="search" placeholder="Search...." />
        <button>
          <FaSearch />
        </button>
      </SearchContainer>

      <IconContainer>
        <IconWrapper>
          <FaHeart />
        </IconWrapper>
        <IconWrapper>
          <FaShoppingCart />
        </IconWrapper>
        <Link to="/sign-up">
          <IconWrapper>
            <FaUser color="#444" />
          </IconWrapper>
        </Link>

        <MobileMenu>
          <FaBars />
        </MobileMenu>
      </IconContainer>
    </OverallContainer>
  );
}


// ---------------- Styled Components ----------------

const OverallContainer = styled.div`
  display: flex;
  padding: 20px 4%;
  box-shadow: 0px 0px 4px grey;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background: white;
  z-index: 100;
`;

const Logo = styled.div`
  color: black;
  font-size: 20px;
  font-weight: 700;
`;

const NavLinks = styled.ul`
  display: flex;
  gap: 20px;
  list-style: none;

  li a {
    color: black;
    font-size: 16px;
    text-decoration: none;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: #007bff; 
    }
  }

  @media (max-width: 768px) {
    display: none; /* hide nav links on mobile */
  }
`;


const SearchContainer = styled.div`
border: 1px solid #ccc;
width: 330px;
position: relative;
input {
 border: none;
 outline: none;
 width: 100%;
 height: 100%;
 padding: 10px;
}
button {
    background-color: #007bff;
    color: #fff;
    font-size: 16px;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    padding: 12px;
    border: none;
    cursor: pointer;
    }

    @media (max-width: 768px) {
        display: none; 
      }
`

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  color: #444;
  font-size: 20px;
`;

const IconWrapper = styled.div`
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: black;
  }

  &:first-child:hover {
    color: red; /* Heart turns red */
  }
`;

const MobileMenu = styled.div`
  display: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;