import React from "react";

const PlaylistCardMeta = ({ title, songCount = 0 }) => {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <h3 className="truncate text-[15px] font-semibold text-whitetext group-hover:text-secondary transition-colors">
        {title}
      </h3>
      <p className="truncate text-[12px] text-light-gray/70 mt-0.5">
        {songCount > 0 ? `${songCount} curated tracks` : "Empty playlist"}
      </p>
    </div>
  );
};

export default PlaylistCardMeta;
