"use client";

import React from "react";
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

const SubscribersCardsContainer = ({ subscribers }) => {
  if (!subscribers || subscribers.length === 0) {
    return (
      <div className="p-8 text-center text-light-gray text-sm">
        No subscribers found.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 p-3">
      {subscribers.map((item) => {
        const textColorClass = PLAN_COLOR_MAP[item.plan] || "text-whitetext";
        return (
          <div
            key={item.id}
            className="p-4 bg-[#141414] border border-border/40 rounded-[8px] flex flex-col gap-3"
          >
            {/* Header: User & Status */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full overflow-hidden bg-[#222] relative shrink-0 flex items-center justify-center text-xs font-semibold text-whitetext border border-white/10">
                  {item.avatar ? (
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    (item.name || "U").charAt(0)
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-whitetext font-medium text-sm">
                    {item.name}
                  </span>
                  <span className={`text-xs font-medium ${textColorClass}`}>
                    {item.plan} Plan
                  </span>
                </div>
              </div>
              <CommonTableStatus status={item.status} />
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-white/5">
              <div>
                <span className="text-light-gray block">Amount:</span>
                <span className="text-whitetext font-medium">{item.amount}</span>
              </div>
              <div>
                <span className="text-light-gray block">Auto Renew:</span>
                {item.autoRenew ? (
                  <span className="inline-flex items-center gap-1 text-[#34C759] font-medium">
                    <Check className="w-3 h-3" /> Yes
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[#6B6B6B] font-medium">
                    <X className="w-3 h-3" /> No
                  </span>
                )}
              </div>
              <div>
                <span className="text-light-gray block">Start Date:</span>
                <span className="text-whitetext">{item.startDate || "--"}</span>
              </div>
              <div>
                <span className="text-light-gray block">End Date:</span>
                <span className="text-whitetext">{item.endDate || "--"}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SubscribersCardsContainer;
