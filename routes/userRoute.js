import express from "express";
import {
  create,
  fetch,
  update,
  deleteUser,
} from "../controller/userController.js";

const route = express.Router();

route.post("/create", create);
route.get("/fetch", fetch);
route.put("/update/:id", update);
route.delete("/update/:id", deleteUser);

export default route;
