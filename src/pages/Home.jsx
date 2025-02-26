import { Link } from "react-router-dom";
import Banner from "../components/Banner";
import TYlogo from "../assets/TYlogo.svg";
import { Button } from "reactstrap";

export default function Home() {
  return (
    <>
      <main className="home-container">
        <div className="banner">
          <div className="logo">
            <img src={TYlogo} alt="Teknolojik Yemekler Logo" />
          </div>

          <h1 className="slogan">KOD ACIKTIRIR PİZZA, DOYURUR</h1>
          <div className="aciktim">
            <Link to="/order">ACIKTIM </Link>
          </div>
        </div>
      </main>
    </>
  );
}
