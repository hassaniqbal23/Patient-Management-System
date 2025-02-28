import { DataTable } from "@/components/table/DataTable";
import StatCards from "@/components/StatCards";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { columns } from "@/components/table/columns";

const AdminContent = async () => {
  let appointments;
  try {
    appointments = await getRecentAppointmentList();
    console.log(appointments, "appointments data");
  } catch (error: any) {
    console.error("Admin page error:", error.message);
    appointments = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
      documents: [],
    };
  }

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
            count={appointments?.scheduledCount ?? 0}
            label="scheduled appointments"
            icon="/assets/icons/appointments.svg"
          />
          <StatCards
            type="pending"
            count={appointments?.pendingCount ?? 0}
            label="pending appointments"
            icon="/assets/icons/pending.svg"
          />
          <StatCards
            type="cancelled"
            count={appointments?.cancelledCount ?? 0}
            label="cancelled appointments"
            icon="/assets/icons/cancelled.svg"
          />
        </section>
        <DataTable columns={columns} data={appointments?.documents ?? []} />
      </main>
    </div>
  );
};

const Admin = () => {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <AdminContent />
    </ErrorBoundary>
  );
};

export default Admin;
