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
