import TYlogo from "../assets/TYlogo.svg";

export default function Banner() {
  return (
    <div className="banner">
      <div className="logo">
        <img src={TYlogo} alt="Teknolojik Yemekler Logo" />
      </div>
    </div>
  );
}
