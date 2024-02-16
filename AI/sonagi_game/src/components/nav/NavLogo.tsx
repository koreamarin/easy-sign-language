import React from "react";
import styled from "styled-components";
import logo1 from "../../assets/images/small_logo1.png";
import logo2 from "../../assets/images/small_logo2.png";

const Containers = styled.span`
  cursor: pointer;
`;

const NavLogo = () => {
  return (
    <Containers>
      <img src={logo1} alt="logo1" />
      <br />
      <img src={logo2} alt="logo2" />
    </Containers>
  );
};

export default NavLogo;
