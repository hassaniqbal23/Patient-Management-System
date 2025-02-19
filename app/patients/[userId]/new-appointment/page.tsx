
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
import Image from "next/image";
import * as Sentry from "@sentry/nextjs";


export default async function NewAppointment({
  params: { userId },
}: SearchParamProps) {

  const  patient = await getPatient(userId)
    Sentry.metrics.set("user_view_new_appointemnt", patient.name)
  
  return (
    <div className="flex h-screen max-h-screen text-gray-300">
      {/* TODO: OTP VARIFICATION | PASSKEYMODAL */}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container ">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="Hero Image"
            width={1000}
            height={1000}
            className="mb-12 h-10 w-fit items-start"
          />
        </div>
        <AppointmentForm 
        type="create"
        userId = {userId}
        patientId = {patient?.$id}
        />
        <p className="copyright mt-10 py-12">
          © 2025 CarePulse
        </p>
      </section>
      <Image
        src="/assets/images/appointment-img.png"
        alt="appointment"
        width={1000}
        height={1000}
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
}
