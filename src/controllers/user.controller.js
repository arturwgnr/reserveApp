import {
  registerUserService,
  loginUserService,
  addUserResources,
  listUserResources,
  listUserResourcesById,
  updateResource,
} from "../services/user.service.js";

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

export async function listUserResourcesController(req, res) {
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
