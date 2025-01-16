
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
import Image from "next/image";

export default async function NewAppointment({
  params: { userId },
}: SearchParamProps) {

  const  patient = await getPatient(userId)
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
        patientId = {patient.$id}
        />
        <p className="justify-items-end text-dark-600 xl:text-left">
          © 2024 CarePulse
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
