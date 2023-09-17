import Logo from "./Logo";
import Search from "./Search";

export default function Navbar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search />
      {children}
    </nav>
  );
}
