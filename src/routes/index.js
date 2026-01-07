import { Router } from "express";
import { registerUserController } from "../controllers/user.controller.js";
import {
  getUsersController,
  loginUserController,
  addUserResourcesController,
  listResourcesController,
  listUserResourcesByIdController,
  updateResourceController,
  addReservationController,
  cancelReservationController,
  listReservationController,
  listReservationActiveController,
  listReservationCancelledController,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.post("/resources", addUserResourcesController);
router.post("/reservation", addReservationController);

router.get("/users", getUsersController);
router.get("/list", listResourcesController);
router.get("/list/:id", listUserResourcesByIdController);
router.get("/reservations", listReservationController);
router.get("/reservations/active", listReservationActiveController);
router.get("/reservations/cancelled", listReservationCancelledController);

router.put("/update/:id", updateResourceController);
router.put("/cancel/:id", cancelReservationController);

export default router;
