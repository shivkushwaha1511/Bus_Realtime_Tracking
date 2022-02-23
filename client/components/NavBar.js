import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";

const NavBar = () => {
  const [state, setState] = useContext(UserContext);
  const router = useRouter();
  // Making link active in dropdown
  const [current, setCurrent] = useState("");

  useEffect(() => {
    setCurrent(process.browser && window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const logout = () => {
    localStorage.removeItem("auth");
    setState(null);
    router.push("/signin");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-danger d-flex py-1 pt-1">
        <div className="container-fluid">
          <Link href="/">
            <a className="navbar-brand text-white fs-2 fw-bold hover_eff">
              Bus Tracker
            </a>
          </Link>
          <a
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </a>

          {state ? (
            <div
              className="collapse navbar-collapse justify-content-end fs-5"
              id="navbarNav"
            >
              <ul className="navbar-nav">
                {state && state.user && state.user.role === "Admin" && (
                  <li className="nav-item">
                    <Link href={"/admin"}>
                      <a
                        className={`nav-link text-white fw-bold px-3 me-2 hover_eff ${
                          current === "/admin" && "active rounded-pill red_pill"
                        }`}
                      >
                        Admin
                      </a>
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link href={"/user/dashboard"}>
                    <a
                      className={`nav-link text-white fw-bold px-3 me-2 hover_eff ${
                        current === "/user/dashboard" &&
                        "active rounded-pill red_pill"
                      }`}
                    >
                      Dashboard
                    </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href={"/user/profile/update"}>
                    <a
                      className={`nav-link text-white fw-bold px-3 me-2 hover_eff ${
                        current === "/user/profile/update" &&
                        "active rounded-pill red_pill"
                      }`}
                    >
                      Profile
                    </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-white fw-bold px-3 me-2 hover_eff"
                    onClick={logout}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <div
                className="collapse navbar-collapse justify-content-end fs-5"
                id="navbarNav"
              >
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link href="/signup">
                      <a
                        className={`nav-link text-white fw-bold px-3 me-2 hover_eff ${
                          current === "/signup" &&
                          "active rounded-pill red_pill"
                        }`}
                      >
                        SignUp
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/signin" className="nav-item">
                      <a
                        className={`nav-link text-white fw-bold px-3 me-2 mb-2 hover_eff ${
                          current === "/signin" &&
                          "active rounded-pill red_pill"
                        }`}
                      >
                        SignIn
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
