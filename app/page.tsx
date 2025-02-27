"use client";

import { PatientForm } from "@/components/forms/PatientForm";
import { PassKeyModal } from "@/components/PassKeyModal";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  const handleAdminClick = () => {
    setShowModal(true);
  };

  return (
    <div className="flex h-screen max-h-screen text-gray-300">
      <PassKeyModal show={showModal} onClose={() => setShowModal(false)} />
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="Hero Image"
            width={1000}
            height={1000}
            className="mb-12 h-10 w-fit items-start"
          />
        </div>
        <PatientForm />
        <div className="text-14-regular mt-20 flex justify-between">
          <p className="justify-items-end text-dark-600 xl:text-left">
            © 2025 CarePulse
          </p>
          <button
            onClick={handleAdminClick}
            className="text-green-500 hover:text-green-400 cursor-pointer"
          >
            Admin
          </button>
        </div>
      </section>
      <Image
        src="/assets/images/onboarding-img.png"
        alt="Patient"
        width={1000}
        height={1000}
        className="side-img max-w-[50%]"
      />
    </div>
  );
}
