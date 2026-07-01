import React from "react"
import CommonCard from "@/components/shared/CommonCard/CommonCard"
import RecentUploadCard from "./RecentUploadCard"

const RecentUploads = ({ uploads }) => {
  return (
    <CommonCard 
      title="Recent Uploads"
      subtitle="Latest music uploads"
      link={{ text: "View All", href: "/admin/dashboard/music" }}
      className="flex flex-col gap-4 h-[380px] w-full overflow-hidden"
    >
      {/* List */}
      <div className="flex-1 flex flex-col gap-2 z-10 relative overflow-y-auto pr-1">
        {(uploads || []).slice(0, 5).map((item, index) => (
          <RecentUploadCard key={item?.id || index} item={item} index={index} />
        ))}
      </div>
    </CommonCard>
  )
}

export default RecentUploads
