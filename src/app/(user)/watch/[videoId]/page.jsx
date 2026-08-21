import { notFound } from "next/navigation";
import UserVideoPlayerPage from "@/templates/user/watch/UserVideoPlayerPage";
import { findVideoById } from "@/dummyData/user/userWatchData";

const page = async ({ params }) => {
  const { videoId } = await params;
  const video = findVideoById(videoId);

  if (!video) {
    notFound();
  }

  return <UserVideoPlayerPage video={video} />;
};

export default page;
