"use server";

import { Query, ID } from "node-appwrite";
import * as Sentry from "@sentry/nextjs";
import { databases, users } from "../appwrite.config";
import { parseStringify } from "../utils";

export const getPatient = async (userId: string) => {
  try {
    if (!databases) {
      throw new Error("Database connection not initialized");
    }

    const patients = await databases.listDocuments(
      process.env.DATABASE_ID!,
      process.env.PATIENT_COLLECTION_ID!,
      [Query.equal("userId", userId)]
    );

    return patients.documents[0] || null;
  } catch (error) {
    console.error("Error getting patient:", error);
    Sentry.captureException(error);
    throw error;
  }
};

export const getUser = async (userId: string) => {
  try {
    if (!users) {
      throw new Error("Users service not initialized");
    }

    const user = await users.get(userId);
    return parseStringify(user);
  } catch (error) {
    console.error("Error getting user:", error);
    Sentry.captureException(error);
    throw error;
  }
};

export const createUser = async (user: CreateUserParams) => {
  try {
    // Create new user -> https://appwrite.io/docs/references/1.5.x/server-nodejs/users#create
    const newuser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );

    return parseStringify(newuser);
  } catch (error: any) {
    // Check existing user
    if (error && error?.code === 409) {
      const existingUser = await users.list([
        Query.equal("email", [user.email]),
      ]);

      return existingUser.users[0];
    }
    console.error("An error occurred while creating a new user:", error);
  }
};
export const registerPatient = async (data: RegisterUserParams) => {
  try {
    if (!databases) {
      throw new Error("Database connection not initialized");
    }

    const newPatient = await databases.createDocument(
      process.env.DATABASE_ID!,
      process.env.PATIENT_COLLECTION_ID!,
      data.userId,
      data
    );

    return parseStringify(newPatient);
  } catch (error) {
    console.error("Error registering patient:", error);
    Sentry.captureException(error);
    throw error;
  }
};
