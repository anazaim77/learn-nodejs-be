const Reminders = require("../models/reminders");
const { Op } = require("sequelize");

const createReminder = async (req, res) => {
  try {
    const { body } = req;
    const tempReminder = {
      user: body.user ?? 0,
      description: body.description ?? "",
      date: req.body.date || new Date(),
    };

    const newReminderAdded = await Reminders.create(tempReminder)
      .then((res) => res.get())
      .catch((error) => {
        console.log("error add reminder", error);
        return null;
      });
    return res.status(201).json(newReminderAdded);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

const getAllReminder = async (req, res) => {
  try {
    const { user, after } = req.query;
    const queryFilter = {
      user,
      date: { [Op.gte]: new Date(parseInt(after)) },
    };
    if (!user) delete queryFilter.user;
    if (!after) delete queryFilter.date;

    const allReminders = await Reminders.findAll({ where: queryFilter }).catch(
      (error) => {
        console.log("error get reminder", error);
        return null;
      }
    );
    return res.status(200).json(allReminders);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

const getAllReminderById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).send("ID not found");
    }

    const allRemindersById = await Reminders.findOne({ where: { id } }).catch(
      (error) => {
        console.log("error get by id reminder", error);
        return null;
      }
    );
    if (!allRemindersById) {
      return res.status(404).send("ID not found");
    }
    return res.status(200).json(allRemindersById);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

const notAllowedMethod = (_, res) => {
  return res.status(405).send();
};

module.exports = {
  createReminder,
  getAllReminder,
  getAllReminderById,
  notAllowedMethod,
};
