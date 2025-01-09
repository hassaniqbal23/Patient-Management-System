import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";
import Image from "next/image";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  return (
    <div className="flex h-screen max-h-screen text-gray-300 ">
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
        <p className="copyright py-12">© 2025 CarePulse</p>
      </section>
    </div>
  );
};

export default Register;
