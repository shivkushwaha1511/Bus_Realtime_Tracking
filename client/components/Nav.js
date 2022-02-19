import Link from "next/link";

const Nav = () => {
  return (
    <>
      <nav className="nav bg-danger d-flex py-1 pt-1">
        <Link href="/" className="nav-item">
          <a className="nav-link text-white fs-2 flex-grow-1 fw-bold">
            Bus Tracker
          </a>
        </Link>
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
      </nav>
    </>
  );
};

export default Nav;
