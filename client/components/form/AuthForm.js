import { SyncOutlined } from "@ant-design/icons";

const AuthForm = ({
  handleSubmit,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  loading,
  secret,
  setSecret,
  page,
  updatePage = false,
}) => (
  <form className="px-4 py-3" onSubmit={handleSubmit}>
    {page !== "signin" && (
      <div className="form-group mt-1">
        <label className="fw-bold">Name</label>
        <input
          value={name}
          type="text"
          className="form-control"
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
    )}
    <div className="form-group mt-3">
      <label className="fw-bold">Email address</label>
      <input
        value={email}
        type="email"
        className="form-control"
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
        disabled={updatePage}
      />
    </div>
    <div className="form-group mt-3">
      <label className="fw-bold">
        {updatePage ? "New password" : "Password"}
      </label>
      <input
        value={password}
        type="password"
        className="form-control"
        placeholder="Enter password"
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>

    {!updatePage && page !== "signin" && (
      <>
        <div className="form-group mt-3">
          <label className="fw-bold">Pick a question</label>
          <select className="form-control">
            <option>Your favorite movie?</option>
            <option>Your favorite food?</option>
            <option>Your favorite teacher name?</option>
            <option>Your best friend name</option>
            <option>Your pet name?</option>
          </select>
          <small>You can use this to reset password</small>
        </div>
        <div className="form-group mt-2">
          <input
            value={secret}
            type="text"
            className="form-control"
            placeholder="Enter your secret here"
            onChange={(e) => setSecret(e.target.value)}
          />
        </div>
      </>
    )}
    <div className="mt-4 d-grid">
      <button
        disabled={
          updatePage
            ? false
            : page === "signin"
            ? !email || !password || loading
            : !name || !email || !password || !secret || loading
        }
        className="btn btn-danger text-white fw-bold fs-5"
      >
        {loading ? (
          <SyncOutlined spin twoToneColor="#fff" className="py-2" />
        ) : updatePage ? (
          "Update"
        ) : page === "signin" ? (
          "Sign In"
        ) : (
          "Sign Up"
        )}
      </button>
    </div>
  </form>
);

export default AuthForm;
