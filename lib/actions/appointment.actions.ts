"use server";

import { revalidatePath } from "next/cache";
import { ID, Query } from "node-appwrite";
import * as Sentry from "@sentry/nextjs";

import {
  APPOINTMENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
  messaging,
} from "../appwrite.config";
import { formatDateTime, parseStringify } from "../utils";

export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    if (!databases || !DATABASE_ID || !APPOINTMENT_COLLECTION_ID) {
      throw new Error("Database configuration missing");
    }

    const newAppointment = await databases.createDocument(
      DATABASE_ID,
      APPOINTMENT_COLLECTION_ID,
      ID.unique(),
      appointment
    );

    revalidatePath("/admin");
    return parseStringify(newAppointment);
  } catch (error) {
    console.error("Error creating appointment:", error);
    Sentry.captureException(error);
    throw error;
  }
};

export const getRecentAppointmentList = async () => {
  try {
    if (!databases || !DATABASE_ID || !APPOINTMENT_COLLECTION_ID) {
      throw new Error("Database configuration missing");
    }

    const appointments = await databases.listDocuments(
      DATABASE_ID,
      APPOINTMENT_COLLECTION_ID,
      [Query.orderDesc("$createdAt")]
    );

    const counts = appointments.documents.reduce(
      (acc, appointment) => {
        switch (appointment.status) {
          case "scheduled":
            acc.scheduledCount++;
            break;
          case "pending":
            acc.pendingCount++;
            break;
          case "cancelled":
            acc.cancelledCount++;
            break;
        }
        return acc;
      },
      { scheduledCount: 0, pendingCount: 0, cancelledCount: 0 }
    );

    return {
      ...counts,
      documents: appointments.documents,
    };
  } catch (error) {
    console.error("Error fetching appointments:", error);
    Sentry.captureException(error);
    throw error;
  }
};

export const sendSMSNotification = async (userId: string, content: string) => {
  try {
    if (!messaging) {
      throw new Error("Messaging service not initialized");
    }

    const message = await messaging.createSms(
      ID.unique(),
      content,
      [],
      [userId]
    );
    return parseStringify(message);
  } catch (error) {
    console.error("Error sending SMS notification:", error);
    Sentry.captureException(error);
    throw error;
  }
};

export const updateAppointment = async ({
  appointmentId,
  userId,
  timeZone,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  try {
    if (!databases || !DATABASE_ID || !APPOINTMENT_COLLECTION_ID) {
      throw new Error("Database configuration missing");
    }

    const updatedAppointment = await databases.updateDocument(
      DATABASE_ID,
      APPOINTMENT_COLLECTION_ID,
      appointmentId,
      appointment
    );

    if (!updatedAppointment) {
      throw new Error("Failed to update appointment");
    }

    const smsMessage = `Greetings from CarePulse. ${
      type === "schedule"
        ? `Your appointment is confirmed for ${
            formatDateTime(appointment.schedule!, timeZone).dateTime
          } with Dr. ${appointment.primaryPhysician}`
        : `We regret to inform that your appointment for ${
            formatDateTime(appointment.schedule!, timeZone).dateTime
          } is cancelled. Reason: ${appointment.cancellationReason}`
    }.`;

    await sendSMSNotification(userId, smsMessage);
    revalidatePath("/admin");

    return parseStringify(updatedAppointment);
  } catch (error) {
    console.error("Error updating appointment:", error);
    Sentry.captureException(error);
    throw error;
  }
};

export const getAppointment = async (appointmentId: string) => {
  try {
    if (!databases || !DATABASE_ID || !APPOINTMENT_COLLECTION_ID) {
      throw new Error("Database configuration missing");
    }

    const appointment = await databases.getDocument(
      DATABASE_ID,
      APPOINTMENT_COLLECTION_ID,
      appointmentId
    );

    return parseStringify(appointment);
  } catch (error) {
    console.error("Error retrieving appointment:", error);
    Sentry.captureException(error);
    throw error;
  }
};
