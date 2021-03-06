import React from "react";
import GithubIcon from "../../assets/icons/Github.png";
import FooterStyle from "./Footer.css"

function Footer() {
  return (
    <footer className="footer-margin fixed-bottom footer-position pt-2" style={FooterStyle}>
      <a href="https://github.com/carlypeyton/Project3" target="_blank" rel="noopener noreferrer">
        <img src={GithubIcon} alt="Github Logo" className="icon"/></a>
    </footer>
  );
}

export default Footer;