import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AppContext from "../context/Appcontext";
function Header() {
  const { setLoggedIn, isLoggedIn } = useContext(AppContext);
  useEffect(() => {
    if ("Name" in localStorage) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [setLoggedIn]);

  const loggingOut = (e) => {
    if (isLoggedIn === true) {
      localStorage.clear();
      setLoggedIn(false);
      toast.info("You loged out successfully");
    }
  };
  return (
    <>
      <header className="header">
        <div className="container container--narrow">
          <Link to="/" className="header__logo">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyf3PDgcR1x3VbCyf9YNzOPNhWa7l6-VSyqA&usqp=CAU"
              alt="Food search"
              className="logo_image"
            />
          </Link>
          <nav className="header__nav">
            <input type="checkbox" id="responsive-menu" />
            <label htmlFor="responsive-menu" className="toggle-menu">
              <span>Menu</span>
              <div className="toggle-menu__lines"></div>
            </label>
            <ul className="header__menu">
              {isLoggedIn ? (
                <li className="header__menuItem">
                  <Link to="/account">Account</Link>
                </li>
              ) : (
                <p></p>
              )}
              <li className="header__menuItem">
                <Link to="/login" className="btn btn--sub" onClick={loggingOut}>
                  {isLoggedIn ? "Logout" : "Login"}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
