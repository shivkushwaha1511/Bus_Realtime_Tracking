import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";

const Nav = () => {
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
      <nav className="nav bg-danger d-flex py-1 pt-1">
        <Link href="/" className="nav-item">
          <a className="nav-link text-white fs-2 flex-grow-1 fw-bold">
            Bus Tracker
          </a>
        </Link>

        {state ? (
          <>
            <div className="dropdown pt-1 pe-2">
              <a
                className="btn dropdown-toggle text-white fw-bold fs-5"
                data-bs-toggle="dropdown"
              >
                {state && state.user && state.user.name}
              </a>
              <ul className="dropdown-menu">
                {state && state.user && state.user.role === "Admin" && (
                  <li>
                    <Link href={"/admin"}>
                      <a
                        className={`nav-link text-dark dropdown-item fw-bold ${
                          current === "/admin" && "active bg-danger text-white"
                        }`}
                      >
                        Admin
                      </a>
                    </Link>
                  </li>
                )}
                <li>
                  <Link href={"/user/dashboard"}>
                    <a
                      className={`nav-link text-dark dropdown-item fw-bold ${
                        current === "/user/dashboard" &&
                        "active bg-danger text-white"
                      }`}
                    >
                      Dashboard
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={"/user/profile/update"}>
                    <a
                      className={`nav-link text-dark dropdown-item fw-bold ${
                        current === "/user/profile/update" &&
                        "active bg-danger text-white"
                      }`}
                    >
                      Profile
                    </a>
                  </Link>
                </li>
                <li>
                  <a
                    className="nav-link text-dark dropdown-item fw-bold"
                    onClick={logout}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <Link href="/signup" className="nav-item">
              <a className="nav-link text-white rounded-pill red_pill h-50 mt-1 fs-5 me-2 fw-bold">
                SignUp
              </a>
            </Link>
            <Link href="/signin" className="nav-item">
              <a className="nav-link text-white rounded-pill red_pill fs-5 h-50 mt-1 me-3 fw-bold">
                SignIn
              </a>
            </Link>
          </>
        )}
      </nav>
    </>
  );
};

export default Nav;
