import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function registerUserService({ email, password }) {
  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userExists) {
    throw new Error("USER_EXISTS");
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash: hash,
      role: "USER",
    },
  });

  return user;
}

export async function loginUserService({ email, password }) {
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!existingUser) {
    throw new Error("USER_NOT_FOUND");
  }

  const userPassword = existingUser.passwordHash;

  const passwordCheck = await bcrypt.compare(password, userPassword);

  if (!passwordCheck) {
    throw new Error("WRONG_PASSWORD");
  } else {
    return existingUser;
  }
}

export async function addUserResources({ name, isActive }) {
  const existingResource = await prisma.resource.findUnique({
    where: { name },
  });

  if (existingResource) {
    throw new Error("NAME_ALREADY_IN_USE");
  }

  const newResource = await prisma.resource.create({
    data: { name, isActive },
  });

  return newResource;
}

export async function listUserResources({ isActive }) {
  const resources = await prisma.resource.findMany({
    where: { isActive },
  });

  return resources;
}

export async function listUserResourcesById({ id }) {
  const resource = await prisma.resource.findUnique({
    where: { id },
  });

  if (!resource) {
    throw new Error("RESOURCE_NOT_FOUND");
  }

  return resource;
}

export async function updateResource({ id, name, isActive }) {
  const resource = await prisma.resource.findUnique({
    where: { id },
  });

  if (!resource) {
    throw new Error("RESOURCE_NOT_FOUND");
  }

  const resourceUpdated = await prisma.resource.update({
    where: { id },
    data: { name, isActive },
  });

  return resourceUpdated;
}
