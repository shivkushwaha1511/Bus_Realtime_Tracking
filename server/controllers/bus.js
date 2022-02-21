import Bus from "../models/Bus";

export const addBus = async (req, res) => {
  const { busNo, name, contact } = req.body;

  if (!busNo) {
    return res.json({ error: "Bus no. is required" });
  }

  const exist = await Bus.findOne({ busNo });
  if (exist) {
    return res.json({ error: "Bus already exists" });
  }

  if (!name) {
    return res.json({ error: "Driver name is required" });
  }

  if (!(contact && contact.length === 10)) {
    return res.json({
      error: "Driver contact is required and must of length 10",
    });
  }

  try {
    const bus = new Bus({
      busNo,
      name,
      contact,
    });

    await bus.save();

    res.json({
      ok: true,
    });
  } catch (err) {
    return res.json({ error: "Error! Try again" });
  }
};

export const getBus = async (req, res) => {
  try {
    const bus = await Bus.find();
    res.json(bus);
  } catch (err) {
    console.log(err);
  }
};

export const deleteBus = async (req, res) => {
  try {
    await Bus.findByIdAndDelete(req.params._id);
    res.json({ ok: "Bus deleted" });
  } catch (err) {
    res.json({ error: "Error! Try again" });
  }
};

export const busByBusno = async (req, res) => {
  try {
    const bus = await Bus.findOne({ busNo: req.params.busNo });
    res.json(bus);
  } catch (err) {
    console.log(err);
  }
};

export const updateBus = async (req, res) => {
  const data = {};

  if (req.body.busNo) {
    data.busNo = req.body.busNo;
  }

  if (req.body.name) {
    data.name = req.body.name;
  }

  if (req.body.contact) {
    data.contact = req.body.contact;
  }

  try {
    await Bus.findByIdAndUpdate(req.params._id, data);
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
    res.json({ error: "Error! try again" });
  }
};
