import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
import Image from "next/image";
import * as Sentry from "@sentry/nextjs";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Suspense } from "react";

interface SearchParamProps {
  params: {
    userId: string;
  };
}

const LoadingState = () => (
  <div className="flex h-screen items-center justify-center">
    <div className="animate-spin rounded-full border-t-4 border-blue-500 border-solid h-12 w-12"></div>
  </div>
);

const AppointmentContent = async ({ userId }: { userId: string }) => {
  try {
    const patient = await getPatient(userId);

    if (!patient) {
      return (
        <div className="flex h-screen items-center justify-center">
          <h2 className="text-xl font-bold text-red-500">Patient not found</h2>
        </div>
      );
    }

    Sentry.metrics.set("user_view_new_appointemnt", patient?.name || "Unknown");

    return (
      <div className="flex h-screen max-h-screen text-gray-300">
        <section className="remove-scrollbar container my-auto">
          <div className="sub-container">
            <Image
              src="/assets/icons/logo-full.svg"
              alt="Hero Image"
              width={1000}
              height={1000}
              className="mb-12 h-10 w-auto"
              priority
            />
          </div>
          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient.$id}
          />
          <p className="copyright mt-10 py-12">© 2025 CarePulse</p>
        </section>
        <Image
          src="/assets/images/appointment-img.png"
          alt="appointment"
          width={1000}
          height={1000}
          className="side-img max-w-[390px] w-auto"
          priority
        />
      </div>
    );
  } catch (error) {
    console.error("Error in AppointmentContent:", error);
    Sentry.captureException(error);
    return (
      <div className="flex h-screen items-center justify-center">
        <h2 className="text-xl font-bold text-red-500">
          Something went wrong. Please try again later.
        </h2>
      </div>
    );
  }
};

export default function NewAppointment({
  params: { userId },
}: SearchParamProps) {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Suspense fallback={<LoadingState />}>
        <AppointmentContent userId={userId} />
      </Suspense>
    </ErrorBoundary>
  );
}
