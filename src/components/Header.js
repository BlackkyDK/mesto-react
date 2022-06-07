import Logo from "../images/Logo.svg";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={Logo} alt="Место" />
    </header>
  );
}

export default Header;
