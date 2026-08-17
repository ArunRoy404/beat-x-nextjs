import { axiosPrivate } from "@/lib/axios/axiosPrivate";

export async function getSchedulerStatusRequest() {
  const res = await axiosPrivate.get("/admin/scheduler/status");
  return res.data.data;
}

export async function triggerSchedulerJobRequest({ jobName }) {
  const res = await axiosPrivate.post(`/admin/scheduler/jobs/${jobName}/run`);
  return res.data.data;
}
