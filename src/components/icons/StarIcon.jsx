import React from "react";
import { cn } from "@/lib/utils";

export const StarIcon = ({ className, width = 13, height = 13, color, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 13 13"
    fill="none"
    className={cn("shrink-0", className)}
    style={color ? { color } : undefined}
    {...props}
  >
    <path
      d="M5.17934 0.653645C5.50149 -0.216973 6.73288 -0.216972 7.05504 0.653646L8.11834 3.52717C8.21963 3.80089 8.43544 4.0167 8.70916 4.11799L11.5827 5.18129C12.4533 5.50345 12.4533 6.73483 11.5827 7.05699L8.70916 8.12029C8.43544 8.22158 8.21963 8.43739 8.11834 8.71111L7.05504 11.5846C6.73288 12.4553 5.50149 12.4553 5.17934 11.5846L4.11603 8.71111C4.01475 8.43739 3.79894 8.22158 3.52522 8.12029L0.651692 7.05699C-0.218926 6.73483 -0.218925 5.50345 0.651693 5.18129L3.52522 4.11799C3.79894 4.0167 4.01475 3.80089 4.11603 3.52717L5.17934 0.653645Z"
      fill="currentColor"
    />
  </svg>
);

export default StarIcon;
