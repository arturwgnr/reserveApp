import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function getUsersService() {
  const users = await prisma.user.findMany();

  if (users.length === 0) {
    throw new Error("NO_USERS_AVAILABLE");
  }

  return users;
}

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

export async function addReservation({
  userId,
  resourceId,
  startTime,
  endTime,
}) {
  const status = "ACTIVE";

  const start = new Date(startTime);
  const end = new Date(endTime);

  const resource = await prisma.resource.findUnique({
    where: { id: resourceId },
  });

  if (!resource) {
    throw new Error("RESOURCE_NOT_FOUND");
  }

  if (resource.isActive === false) {
    throw new Error("RESOURCE_NOT_AVAILABLE");
  }

  if (start >= end) {
    throw new Error("INCORRECT_TIME");
  }

  const userCheck = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!userCheck) {
    throw new Error("USER_NOT_FOUND");
  }

  //checks

  const existingReservation = await prisma.reservation.findUnique({
    where: { id },
  });

  if (
    existingReservation.startTime < end &&
    existingReservation.endTime > start
  ) {
    throw new Error("RESERVATION_TIME_CONFLICT");
  }

  const newReservation = await prisma.reservation.create({
    data: { userId, resourceId, startTime: start, endTime: end, status },
  });

  return newReservation;
}
