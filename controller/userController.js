import User from "../model/userModel.js";

export const create = async (req, res) => {
  try {
    console.log("req", req.body);
    const userData = new User(req.body);

    const { email } = userData;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists." });
    }
    userData
      .save()
      .then((savedUser) => {
        res.status(200).json(savedUser);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message, status: false });
      });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

export const fetch = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res.status(404).json({ message: "Users not found." });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;

    const userExist = await User.findOne({ _id: id });
    if (!userExist) {
      return res.status(404).json({ message: "User not found." });
    }
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findOne({ _id: id });
    if (!userExist) {
      return res.status(404).json({ message: "User not found." });
    }
    const deletedUser = await User.findOneAndDelete(id);
    res.status(201).json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};
