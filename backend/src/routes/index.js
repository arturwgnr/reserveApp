import { Router } from "express";
import { registerUserController } from "../controllers/user.controller.js";
import {
  getUsersController,
  loginUserController,
  addUserResourcesController,
  listUserResourcesController,
  listUserResourcesByIdController,
  updateResourceController,
  addReservationController,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.post("/resources", addUserResourcesController);
router.post("/reservation", addReservationController);

router.get("/users", getUsersController);
router.get("/list", listUserResourcesController);
router.get("/list/:id", listUserResourcesByIdController);

router.put("/update/:id", updateResourceController);

export default router;
