CORE FEATURES

User registration and login with password hashing

Resource (property) management

Reservation-ready data model

Clean separation between routes, controllers, and services

TECH STACK

Node.js

Express

Prisma ORM

PostgreSQL

bcrypt

CURRENT FUNCTIONALITIES

Authentication

Register user

Login user

Resources (Properties)

Create resource

List resources (with optional isActive filter)

Get resource by ID

Update resource (name / active status)

DATABASE MODELS

User

Resource

Reservation

ARCHITECTURE

Routes handle endpoint mapping

Controllers handle HTTP concerns (request/response)

Services contain business logic

Prisma handles database access

PROJECT STATUS

Authentication: Completed

Resource CRUD: Completed

Reservation system: In progress

Conflict logic: Pending

NEXT STEPS

Create reservation endpoint

Implement time conflict validation

Protect routes with JWT

Improve error handling

Write detailed documentation about conflict resolution logic

PURPOSE
This project exists to strengthen backend reasoning, database modeling, and business rule enforcement, serving as a solid portfolio project and interview-ready system.
