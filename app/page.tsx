"use client"

import Image from "next/image"

export default function Home() {
return (
  <div className="flex h-screen max-h-screen">
    <section className="remove-scrollbar container my-auto">
     <div className="sub-container max-w-[496px]">
      <Image 
      src="/assets/images/onboarding-img.png"
       alt="Hero Image"
       width={596}
       height={696}
       className="rounded-lg object-conver"
      />
     </div>
     <form action="">
      <input type="text" />
     </form>
    </section>
  </div>
)
}
