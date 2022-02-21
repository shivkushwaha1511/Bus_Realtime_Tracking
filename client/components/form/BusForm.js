const AddBus = ({
  handleSubmit,
  busNo,
  setBusNo,
  name,
  setName,
  contact,
  setContact,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        <label className="fw-bold">Bus number</label>
        <input
          value={busNo}
          className="form-control"
          type="text"
          placeholder="Enter bus number"
          onChange={(e) => {
            e.target.value = e.target.value.toUpperCase();
            setBusNo(e.target.value);
          }}
        />
      </div>
      <div className="form-group mb-3">
        <label className="fw-bold">Driver name</label>
        <input
          value={name}
          className="form-control"
          type="text"
          placeholder="Enter driver name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group mb-3">
        <label className="fw-bold">Driver mobile number</label>
        <input
          value={contact}
          className="form-control"
          type="number"
          placeholder="Enter mobile number"
          onChange={(e) => setContact(e.target.value)}
        />
      </div>
      <div className="text-center pt-3">
        <button
          className="btn btn-danger fs-5 fw-bold"
          disabled={!name || !contact || !busNo}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddBus;
