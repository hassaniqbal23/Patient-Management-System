import clsx from "clsx";
import Image from "next/image";
import React from "react";

interface StatCardsProps {
  type: "appointments" | "pending" | "cancelled";
  count: number | undefined;
  label: string;
  icon: string;
}
const StatCards = ({ type, count, label, icon }: StatCardsProps) => {
  return (
    <div
      className={clsx("stat-card", {
        "bg-appointments": type === "appointments",
        "bg-pending": type === "pending",
        "bg-cancelled": type === "cancelled",
      })}
    >
      <div className="flex items-center gap-4">
        <Image
          src={icon}
          alt={type}
          height={32}
          width={32}
          className="size-8 w-fit"
        />
        <h2 className="text-32-bold text-white">{count}</h2>
      </div>
      <p className="text-14-regular text-white">{label}</p>
    </div>
  );
};

export default StatCards;
