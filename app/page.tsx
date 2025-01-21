"use client"

import {PatientForm} from "@/components/forms/PatientForm"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
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
   <PatientForm />
   <div className="text-14-regular mt-20 flex justify-between">
    <p className="justify-items-end text-dark-600 xl:text-left">
    © 2025 CarePulse
    </p>
    <Link href="/?admin=true" className="text-green-500">
    Admin 
    </Link>
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
)
}
