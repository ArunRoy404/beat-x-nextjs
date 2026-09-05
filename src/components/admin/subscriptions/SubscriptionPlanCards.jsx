"use client";

import React from "react";
import CommonCard from "@/components/shared/CommonCard/CommonCard";
import { useAdminSubscriptionsStore } from "@/zustandStore/admin/adminStore/adminSubscriptionsStore";
import { SquarePen, Trash2, Check } from "lucide-react";
import {
  StarIcon,
  OfflineIcon,
  HifiAudioIcon,
  ListenAnyDeviceIcon,
  PeoplesIcon,
  AccountsIcon,
} from "@/components/icons";

const PLAN_THEMES = {
  free: {
    iconColor: "text-[#ADAAAA]",
    tagColor: "text-[#ADAAAA]",
    activeCheckColor: "text-[#34C759]",
  },
  premium: {
    iconColor: "text-[#CC97FF]",
    tagColor: "text-[#3ADFFA]",
    activeCheckColor: "text-[#CC97FF]",
  },
  family: {
    iconColor: "text-[#34C759]",
    tagColor: "text-[#CC97FF]",
    activeCheckColor: "text-[#34C759]",
  },
  student: {
    iconColor: "text-[#3ADFFA]",
    tagColor: "text-[#34C759]",
    activeCheckColor: "text-[#3ADFFA]",
  },
};

const renderFeatureIcon = (featureText, isIncluded, theme) => {
  const text = (featureText || "").toLowerCase();

  if (!isIncluded) {
    if (text.includes("offline")) return <OfflineIcon className="text-light-gray/40 w-4 h-4" />;
    if (text.includes("hifi") || text.includes("audio") || text.includes("spatial"))
      return <HifiAudioIcon className="text-light-gray/40 w-3.5 h-3.5" />;
    return <OfflineIcon className="text-light-gray/40 w-4 h-4" />;
  }

  if (text.includes("ad-supported")) return <Check className={`w-3.5 h-3.5 ${theme.activeCheckColor}`} />;
  if (text.includes("offline")) return <OfflineIcon className={`w-4 h-4 ${theme.iconColor}`} />;
  if (text.includes("hifi") || text.includes("audio") || text.includes("lossless"))
    return <HifiAudioIcon className={`w-3.5 h-3.5 ${theme.iconColor}`} />;
  if (text.includes("device") || text.includes("listen"))
    return <ListenAnyDeviceIcon className={`w-3.5 h-3.5 ${theme.iconColor}`} />;
  if (text.includes("kids") || text.includes("safe"))
    return <PeoplesIcon className={`w-3.5 h-3.5 ${theme.iconColor}`} />;
  if (text.includes("accounts") || text.includes("hulu") || text.includes("showtime"))
    return <AccountsIcon className={`w-4 h-4 ${theme.iconColor}`} />;

  return <StarIcon className={`w-3.5 h-3.5 ${theme.iconColor}`} />;
};

const SubscriptionPlanCards = () => {
  const plans = useAdminSubscriptionsStore((state) => state.plans);
  const openEditPlanModal = useAdminSubscriptionsStore((state) => state.openEditPlanModal);
  const deletePlan = useAdminSubscriptionsStore((state) => state.deletePlan);

  if (!plans || plans.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      {plans.map((plan) => {
        const themeKey = plan.id?.toLowerCase() || "free";
        const theme = PLAN_THEMES[themeKey] || PLAN_THEMES.free;

        return (
          <CommonCard
            key={plan.id}
            className="flex flex-col justify-between min-h-[260px] p-5 hover:border-[#3ADFFA]/30 transition-all duration-200"
          >
            <div>
              {/* Card Header: Plan Name & Actions */}
              <div className="flex items-center justify-between z-10 relative mb-3">
                <h3 className="text-whitetext text-xl md:text-2xl font-semibold tracking-tight">
                  {plan.name}
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openEditPlanModal(plan)}
                    className="p-1.5 rounded-[6px] bg-[#3ADFFA]/10 border border-[#3ADFFA]/30 text-[#3ADFFA] hover:bg-[#3ADFFA]/20 transition-colors cursor-pointer"
                    title="Edit Plan"
                  >
                    <SquarePen className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete "${plan.name}" plan?`)) {
                        deletePlan(plan.id);
                      }
                    }}
                    className="p-1.5 rounded-[6px] bg-[#ED1010]/10 border border-[#ED1010]/30 text-[#ED1010] hover:bg-[#ED1010]/20 transition-colors cursor-pointer"
                    title="Delete Plan"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Mini Metric Summary Box Grid */}
              <div className="grid grid-cols-4 gap-2 bg-[#141414] p-3 rounded-[8px] border border-[#222222] relative z-10 text-center items-center my-3">
                {/* Metric 1: Subscribers */}
                <div className="flex flex-col items-center justify-center">
                  <span className="text-whitetext font-bold text-sm md:text-base leading-tight">
                    {plan.subscribers}
                  </span>
                  <span className="text-light-gray text-[10px] md:text-[11px] font-normal mt-0.5">
                    Subscribers
                  </span>
                </div>

                {/* Metric 2: Devices */}
                <div className="flex flex-col items-center justify-center border-l border-white/5">
                  <span className="text-whitetext font-bold text-sm md:text-base leading-tight">
                    {plan.devices}
                  </span>
                  <span className="text-light-gray text-[10px] md:text-[11px] font-normal mt-0.5">
                    Devices
                  </span>
                </div>

                {/* Metric 3: Trial */}
                <div className="flex flex-col items-center justify-center border-l border-white/5">
                  <span className="text-whitetext font-bold text-sm md:text-base leading-tight">
                    {plan.trial}
                  </span>
                  <span className="text-light-gray text-[10px] md:text-[11px] font-normal mt-0.5">
                    Trial
                  </span>
                </div>

                {/* Metric 4: Price */}
                <div className="flex flex-col items-center justify-center border-l border-white/5">
                  <div className="flex items-baseline gap-0.5 justify-center">
                    <span className="text-whitetext font-bold text-sm md:text-base leading-tight">
                      {plan.price}
                    </span>
                    <span className="text-light-gray text-[10px] font-normal">
                      {plan.period || "/month"}
                    </span>
                  </div>
                  <span className="text-light-gray text-[10px] md:text-[11px] font-normal mt-0.5">
                    Price
                  </span>
                </div>
              </div>

              {/* Features List */}
              <div className="flex flex-col gap-2.5 relative z-10 mt-4">
                {plan.features?.map((feature, idx) => {
                  const isIncluded = feature.included;
                  return (
                    <div key={idx} className="flex items-center gap-2.5 text-xs md:text-sm">
                      {renderFeatureIcon(feature.text, isIncluded, theme)}
                      <span
                        className={
                          isIncluded
                            ? "text-whitetext font-normal"
                            : "text-light-gray/50 font-normal text-xs md:text-sm"
                        }
                      >
                        {feature.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </CommonCard>
        );
      })}
    </div>
  );
};

export default SubscriptionPlanCards;
