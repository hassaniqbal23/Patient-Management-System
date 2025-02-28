import { Client, Databases, Users, Messaging } from "node-appwrite";

export const {
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
  PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID,
} = process.env;

// Validate environment variables
if (
  !ENDPOINT ||
  !PROJECT_ID ||
  !API_KEY ||
  !DATABASE_ID ||
  !PATIENT_COLLECTION_ID ||
  !APPOINTMENT_COLLECTION_ID
) {
  throw new Error("Missing required environment variables");
}

let client: Client;
let databases: Databases;
let users: Users;
let messaging: Messaging;

// Initialize Appwrite clients only on the server side
if (typeof window === "undefined") {
  client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(API_KEY);

  databases = new Databases(client);
  users = new Users(client);
  messaging = new Messaging(client);
}

export { databases, users, messaging };
