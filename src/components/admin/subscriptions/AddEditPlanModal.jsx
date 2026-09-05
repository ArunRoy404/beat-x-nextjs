"use client";

import React, { useState, useEffect } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { useAdminSubscriptionsStore } from "@/zustandStore/admin/adminStore/adminSubscriptionsStore";

const AddEditPlanModal = () => {
  const isAddPlanModalOpen = useAdminSubscriptionsStore((state) => state.isAddPlanModalOpen);
  const editingPlan = useAdminSubscriptionsStore((state) => state.editingPlan);
  const closeAddPlanModal = useAdminSubscriptionsStore((state) => state.closeAddPlanModal);
  const addPlan = useAdminSubscriptionsStore((state) => state.addPlan);
  const updatePlan = useAdminSubscriptionsStore((state) => state.updatePlan);

  const [formData, setFormData] = useState({
    name: "",
    price: "৳",
    subscribers: "0",
    devices: "1",
    trial: "-",
    period: "/month",
    features: [{ text: "", included: true }],
  });

  useEffect(() => {
    if (editingPlan) {
      setFormData({
        name: editingPlan.name || "",
        price: editingPlan.price || "৳0",
        subscribers: editingPlan.subscribers || "0",
        devices: editingPlan.devices || "1",
        trial: editingPlan.trial || "-",
        period: editingPlan.period || "/month",
        features: editingPlan.features ? [...editingPlan.features] : [{ text: "", included: true }],
      });
    } else {
      setFormData({
        name: "",
        price: "৳",
        subscribers: "0",
        devices: "1",
        trial: "-",
        period: "/month",
        features: [
          { text: "Ad-free experience", included: true },
          { text: "Unlimited offline mode", included: true },
        ],
      });
    }
  }, [editingPlan, isAddPlanModalOpen]);

  if (!isAddPlanModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingPlan) {
      updatePlan({
        ...editingPlan,
        ...formData,
      });
    } else {
      addPlan({
        id: formData.name.toLowerCase().replace(/\s+/g, "-"),
        ...formData,
      });
    }
    closeAddPlanModal();
  };

  const handleFeatureChange = (index, field, value) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures[index] = { ...updatedFeatures[index], [field]: value };
    setFormData({ ...formData, features: updatedFeatures });
  };

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, { text: "", included: true }],
    });
  };

  const removeFeature = (index) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#141414] border border-border/60 rounded-[12px] w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b border-white/10 bg-[var(--modal-header-bg)]">
          <h2 className="text-lg md:text-xl font-semibold text-whitetext">
            {editingPlan ? "Edit Subscription Plan" : "Add New Subscription Plan"}
          </h2>
          <button
            type="button"
            onClick={closeAddPlanModal}
            className="p-1 rounded-md text-light-gray hover:text-whitetext hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-4 md:p-5 flex-1 overflow-y-auto space-y-4">
          <div>
            <label className="block text-xs font-medium text-light-gray mb-1">
              Plan Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Premium Plus"
              className="w-full px-3 py-2 bg-[#0E0E0E] border border-border/50 rounded-[6px] text-sm text-whitetext focus:outline-none focus:border-[#3ADFFA]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-light-gray mb-1">
                Price
              </label>
              <input
                type="text"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="e.g. ৳250"
                className="w-full px-3 py-2 bg-[#0E0E0E] border border-border/50 rounded-[6px] text-sm text-whitetext focus:outline-none focus:border-[#3ADFFA]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-light-gray mb-1">
                Devices Limit
              </label>
              <input
                type="text"
                value={formData.devices}
                onChange={(e) => setFormData({ ...formData, devices: e.target.value })}
                placeholder="e.g. 1"
                className="w-full px-3 py-2 bg-[#0E0E0E] border border-border/50 rounded-[6px] text-sm text-whitetext focus:outline-none focus:border-[#3ADFFA]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-light-gray mb-1">
                Trial Duration
              </label>
              <input
                type="text"
                value={formData.trial}
                onChange={(e) => setFormData({ ...formData, trial: e.target.value })}
                placeholder="e.g. 7d or -"
                className="w-full px-3 py-2 bg-[#0E0E0E] border border-border/50 rounded-[6px] text-sm text-whitetext focus:outline-none focus:border-[#3ADFFA]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-light-gray mb-1">
                Subscribers Count (Display)
              </label>
              <input
                type="text"
                value={formData.subscribers}
                onChange={(e) => setFormData({ ...formData, subscribers: e.target.value })}
                placeholder="e.g. 0.1M"
                className="w-full px-3 py-2 bg-[#0E0E0E] border border-border/50 rounded-[6px] text-sm text-whitetext focus:outline-none focus:border-[#3ADFFA]"
              />
            </div>
          </div>

          {/* Features List Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium text-light-gray">
                Plan Features
              </label>
              <button
                type="button"
                onClick={addFeature}
                className="text-xs text-[#3ADFFA] hover:underline flex items-center gap-1 font-medium"
              >
                <Plus className="w-3.5 h-3.5" /> Add Feature
              </button>
            </div>
            <div className="space-y-2">
              {formData.features.map((feat, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={feat.included}
                    onChange={(e) => handleFeatureChange(index, "included", e.target.checked)}
                    className="w-4 h-4 rounded border-border bg-transparent text-[#3ADFFA] focus:ring-0 cursor-pointer"
                    title="Included?"
                  />
                  <input
                    type="text"
                    value={feat.text}
                    onChange={(e) => handleFeatureChange(index, "text", e.target.value)}
                    placeholder="Feature description"
                    className="flex-1 px-3 py-1.5 bg-[#0E0E0E] border border-border/50 rounded-[6px] text-xs md:text-sm text-whitetext focus:outline-none focus:border-[#3ADFFA]"
                  />
                  {formData.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="p-1 text-red-error hover:bg-white/5 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={closeAddPlanModal}
              className="px-4 py-2 text-xs md:text-sm text-light-gray hover:text-whitetext border border-border/50 rounded-[6px] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs md:text-sm bg-[#3ADFFA] text-[#004B56] font-semibold rounded-[6px] hover:bg-[#3ADFFA]/90 transition-colors"
            >
              {editingPlan ? "Save Changes" : "Create Plan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditPlanModal;
