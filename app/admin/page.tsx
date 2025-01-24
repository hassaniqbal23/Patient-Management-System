import {DataTable} from "@/components/table/DataTable";
import StatCards from "@/components/StatCards";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {columns, Payment} from "@/components/table/columns";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
}

const Admin = async() => {
  const data = await getData()
  const appointments = await getRecentAppointmentList()
  return (
    <div className="mx-auto max-w-7xl flex flex-col space-y-14">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="logo"
            height={32}
            width={162}
            className="h-8 w-fit"
          />
        </Link>
        <p className="text-16 font-semibold text-white">Admin Dashboard</p>
      </header>
      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header text-white">Welcome 👋</h1>
          <p className="text-dark-700">
            Start the day with managing new appointments
          </p>
        </section>
        <section className="admin-stat">
          <StatCards
            type="appointments"
            count={appointments?.scheduledCount}
            label="scheduled apointments"
            icon="/assets/icons/appointments.svg"
          />
          <StatCards
            type="pending"
            count={appointments?.pendingCount}
            label="pending apointments"
            icon="/assets/icons/pending.svg"
          />
          <StatCards
            type="cancelled"
            count={appointments?.cancelledCount}
            label="cancelled apointments"
            icon="/assets/icons/cancelled.svg"
          />
        </section>
        {/* <DataTable columns={columns} data={appointments?.documents  }/> */}
                <DataTable columns={columns} data={data}/>

      </main>
    </div>
  );
};

export default Admin;
