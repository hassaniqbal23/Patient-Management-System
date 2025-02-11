import { Button } from "@/components/ui/button";
import { Doctors } from "@/constants";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import * as Sentry from "@sentry/nextjs";
import { getUser } from "@/lib/actions/patient.actions";

interface SearchParamProps {
  params: {
    userId: string;
  };
  searchParams: {
    appointmentId?: string;
  };
}

const Success = async ({
  params: { userId },
  searchParams,
}: SearchParamProps) => {
  const appointmentId = searchParams?.appointmentId || "";
  const appointment = await getAppointment(appointmentId);

  if (!appointment) {
    return notFound();
  }

  const doctor = Doctors.find(
    (doc) => doc.name === appointment.primaryPhysician
  );
  const user = await getUser(userId);

  Sentry.metrics.set("user_view_appointemnt-sucess", user.name);

  if (!doctor) {
    return notFound();
  }

  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="h-10 w-fit object-contain"
          />
        </Link>
        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            alt="success"
            width={300}
            height={350}
            className="object-contain"
          />
        </section>
        <h2 className="header mb-6 max-w-[600px] text-center text-white">
          Your <span className="text-green-500">appointment request</span> has
          been successfully submitted!
        </h2>
        <p className="text-white">We&apos;ll be in touch shortly to confirm.</p>
        <section className="request-details text-white">
          <p>Request appointment details</p>
          <div className="flex items-center gap-3">
            <Image
              src={doctor.image}
              alt="doctor"
              width={48}
              height={48}
              className="rounded-full"
            />
            <p className="whitespace-nowrape"> Dr.{doctor?.name}</p>
          </div>
          <div className="flex gap-2 ">
            <Image
              src="/assets/icons/calendar.svg"
              alt="calendar"
              width={24}
              height={24}
            />
            <p>{formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>
        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>
        <p className="copyright">© 2025 CarePulse</p>
      </div>
    </div>
  );
};

export default Success;
