import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";
import Image from "next/image";
import Link from "next/link";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
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
        {/* <PatientForm /> */}
        <RegisterForm user={user} />
        <div className="text-14-regular mt-20 flex justify-between">
          <p className="justify-items-end text-dark-600 xl:text-left">
            © 2024 CarePulse
          </p>
          <Link href="/?admin=true" className="text-green-500">
            Admin
          </Link>
        </div>
      </section>
      {/* <Image
        src="/assets/images/register-img.png"
        alt="Patient"
        width={1000}
        height={1000}
        className="side-img max-w-[300px] "
      /> */}
    </div>
  );
};

export default Register;
