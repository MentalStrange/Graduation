import { Link } from 'react-router-dom';
import './../../styles/App.css';
import { Image } from '@chakra-ui/react';
import logo from "./../../assets/Images/purpleLogo.png";

function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top navbar-light d-flex flex-row justify-content-around p-3">
        <Link to={'/'}> <Image src={logo} alt="logo" width={"120px"}/></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarTogglerDemo01">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Services</a>
            </li>
          </ul>
        </div>
        <Link to="/Auth">
        <button type="button" className="btn btn-outline-dark">Log In</button>
        </Link>
      </nav>
    </>
  );
}

export default Navbar;