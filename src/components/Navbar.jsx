import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

function Navbar() {
  const [show, handleShow] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });

    // Listen for coming soon event
    const handleComingSoon = () => setShowComingSoon(true);
    window.addEventListener("showComingSoon", handleComingSoon);

    return () => {
      window.removeEventListener("scroll", () => {});
      window.removeEventListener("showComingSoon", handleComingSoon);
    };
  }, []);

  return (
    <>
      <div className={`navbar ${show && "navbar__black"}`}>
        <img
          className="navbar__logo"
          src="https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2016.png"
          alt="Netflix Logo"
          onClick={() => {
            navigate("/");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          style={{ cursor: "pointer" }}
        />

        <div className="navbar__actions">
          <button
            className="navbar__subscribe"
            onClick={() => navigate("/subscription")}
          >
            Subscribe
          </button>
          {user && (
            <button
              className="navbar__signout"
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              Sign Out
            </button>
          )}
          <button className="navbar__theme" onClick={toggleTheme}>
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          <div
            className="navbar__profile"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <img
              className="navbar__avatar"
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
              alt="Profile Avatar"
            />
            {showProfileMenu && (
              <div className="profile__dropdown">
                <div
                  className="profile__item"
                  onClick={() => setShowComingSoon(true)}
                >
                  Account
                </div>
                <div
                  className="profile__item"
                  onClick={() => setShowComingSoon(true)}
                >
                  Settings
                </div>
                <div
                  className="profile__item"
                  onClick={() => setShowComingSoon(true)}
                >
                  Help Center
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showComingSoon && (
        <div className="coming-soon-modal">
          <div className="coming-soon-content">
            <h3>This Feature will be available soon</h3>
            <button
              className="coming-soon-close"
              onClick={() => setShowComingSoon(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
