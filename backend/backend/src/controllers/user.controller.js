import {
  getUsersService,
  registerUserService,
  loginUserService,
  addUserResources,
  listUserResources,
  listUserResourcesById,
  updateResource,
  addReservation,
  cancelReservation,
  listReservation,
  listReservationActive,
  listReservationCancelled,
} from "../services/user.service.js";

export async function getUsersController(req, res) {
  try {
    const users = await getUsersService();

    res.status(200).json({ message: "Users List:", users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function registerUserController(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const user = await registerUserService({ email, password });

    res.status(201).json({ message: "User created", user });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

export async function loginUserController(req, res) {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const login = await loginUserService({ email, password });

    res.status(200).json({ message: "Login successfull", login });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function addUserResourcesController(req, res) {
  const { name, isActive } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const resource = await addUserResources({ name, isActive });

    res.status(201).json({ message: `${name} added successfully`, resource });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function listResourcesController(req, res) {
  let { isActive } = req.query;

  if (req.query.isActive === "true") {
    isActive = true;
  } else if (req.query.isActive === "false") {
    isActive = false;
  }

  try {
    const resources = await listUserResources({ isActive });

    res.status(200).json({ message: "Resource list:", resources });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function listUserResourcesByIdController(req, res) {
  const { id } = req.params;

  try {
    const resource = await listUserResourcesById({ id });

    res.status(200).json({ message: "Resource:", resource });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateResourceController(req, res) {
  const { name, isActive } = req.body;
  const { id } = req.params;

  try {
    const resourceUpdated = await updateResource({ id, name, isActive });

    res.status(200).json({ message: "Update:", resourceUpdated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//RESERVATION CONTROLLER

export async function listReservationController(req, res) {
  try {
    const reservations = await listReservation();

    res.status(200).json({ message: "Reservations:", reservations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
export async function listReservationActiveController(req, res) {
  try {
    const reservations = await listReservationActive();

    res.status(200).json({ message: "Active Reservations:", reservations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
export async function listReservationCancelledController(req, res) {
  try {
    const reservations = await listReservationCancelled();

    res.status(200).json({ message: "Cancelled Reservations:", reservations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function addReservationController(req, res) {
  const { userId, resourceId, startTime, endTime } = req.body;

  try {
    const newReservation = await addReservation({
      userId,
      resourceId,
      startTime,
      endTime,
    });

    res
      .status(201)
      .json({ message: "Reservation added successfully", newReservation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function cancelReservationController(req, res) {
  const { id } = req.params;

  try {
    const updatedReservation = await cancelReservation({ id });

    res
      .status(200)
      .json({ message: "Reservation cancelled", updatedReservation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
