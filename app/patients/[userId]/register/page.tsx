import Image from "next/image";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import * as Sentry from "@sentry/nextjs";

import RegisterForm from "@/components/forms/RegisterForm";
import { getPatient, getUser } from "@/lib/actions/patient.actions";
import { ErrorBoundary } from "@/components/ErrorBoundary";

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

const RegisterContent = async ({ userId }: { userId: string }) => {
  try {
    const user = await getUser(userId);
    const patient = await getPatient(userId);

    if (!user) {
      return (
        <div className="flex h-screen items-center justify-center">
          <h2 className="text-xl font-bold text-red-500">User not found</h2>
        </div>
      );
    }

    if (patient) {
      redirect(`/patients/${userId}/new-appointment`);
    }

    Sentry.metrics.set("user_view_register", user.name);

    return (
      <div className="flex h-screen max-h-screen">
        <section className="remove-scrollbar container">
          <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
            <Image
              src="/assets/icons/logo-full.svg"
              height={1000}
              width={1000}
              alt="patient"
              className="mb-12 h-10 w-fit"
              priority
            />

            <RegisterForm user={user} />

            <p className="copyright py-12">© 2025 CarePulse</p>
          </div>
        </section>

        <Image
          src="/assets/images/register-img.png"
          height={1000}
          width={1000}
          alt="patient"
          className="side-img max-w-[390px]"
          priority
        />
      </div>
    );
  } catch (error) {
    console.error("Error in Register page:", error);
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

const Register = ({ params: { userId } }: SearchParamProps) => {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Suspense fallback={<LoadingState />}>
        <RegisterContent userId={userId} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default Register;
