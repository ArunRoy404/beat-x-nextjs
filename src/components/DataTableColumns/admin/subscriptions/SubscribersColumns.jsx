import React from "react";
import CommonTableHeader from "@/components/shared/CommonTable/CommonTableHeader";
import CommonTableCell from "@/components/shared/CommonTable/CommonTableCell";
import CommonTableStatus from "@/components/shared/CommonTable/CommonTableStatus";
import { Check, X } from "lucide-react";
import Image from "next/image";

const PLAN_COLOR_MAP = {
  Free: "text-[#ADAAAA]",
  Premium: "text-[#3ADFFA]",
  Family: "text-[#CC97FF]",
  Student: "text-[#34C759]",
  Students: "text-[#34C759]",
};

export const getSubscribersColumns = () => [
  {
    id: "select",
    header: () => (
      <div className="flex items-center justify-center px-2">
        <input
          type="checkbox"
          className="w-4 h-4 rounded border-border bg-transparent text-[#3ADFFA] focus:ring-0 cursor-pointer"
        />
      </div>
    ),
    cell: () => (
      <div className="flex items-center justify-center px-2">
        <input
          type="checkbox"
          className="w-4 h-4 rounded border-border bg-transparent text-[#3ADFFA] focus:ring-0 cursor-pointer"
        />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: () => <CommonTableHeader>User</CommonTableHeader>,
    cell: ({ row }) => {
      const subscriber = row.original;
      return (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-[#222] relative shrink-0 flex items-center justify-center text-xs font-semibold text-whitetext border border-white/10">
            {subscriber?.avatar ? (
              <Image
                src={subscriber.avatar}
                alt={subscriber.name}
                fill
                className="object-cover"
              />
            ) : (
              (subscriber?.name || "U").charAt(0)
            )}
          </div>
          <span className="text-whitetext font-medium text-sm">
            {subscriber?.name}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "plan",
    header: () => <CommonTableHeader>Plan</CommonTableHeader>,
    cell: ({ getValue }) => {
      const planName = getValue() || "Free";
      const textColorClass = PLAN_COLOR_MAP[planName] || "text-whitetext";
      return (
        <span className={`font-medium text-sm ${textColorClass}`}>
          {planName}
        </span>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <CommonTableHeader>Amount</CommonTableHeader>,
    cell: ({ getValue }) => {
      const amount = getValue();
      return (
        <span className={amount === "৳0" ? "text-light-gray text-sm" : "text-[#3ADFFA] font-medium text-sm"}>
          {amount || "৳0"}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <CommonTableHeader>Status</CommonTableHeader>,
    cell: ({ getValue }) => {
      const status = getValue();
      return <CommonTableStatus status={status} />;
    },
  },
  {
    accessorKey: "startDate",
    header: () => <CommonTableHeader>Start</CommonTableHeader>,
    cell: ({ getValue }) => (
      <CommonTableCell className="text-light-gray text-xs md:text-sm">
        {getValue() || "--"}
      </CommonTableCell>
    ),
  },
  {
    accessorKey: "endDate",
    header: () => <CommonTableHeader>End</CommonTableHeader>,
    cell: ({ getValue }) => (
      <CommonTableCell className="text-light-gray text-xs md:text-sm">
        {getValue() || "--"}
      </CommonTableCell>
    ),
  },
  {
    accessorKey: "autoRenew",
    header: () => <CommonTableHeader>Auto Renew</CommonTableHeader>,
    cell: ({ getValue }) => {
      const isAuto = getValue();
      return (
        <div className="flex items-center gap-1">
          {isAuto ? (
            <span className="inline-flex items-center gap-1 text-[#34C759] text-xs font-medium">
              <Check className="w-3.5 h-3.5" /> Yes
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[#6B6B6B] text-xs font-medium">
              <X className="w-3.5 h-3.5" /> No
            </span>
          )}
        </div>
      );
    },
  },
];
