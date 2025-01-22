import { StreamAvatarServerHelper } from "@avatara/avatar-stream/server";

export const streamAvatarServer = new StreamAvatarServerHelper({
  apikey: process.env.API_KEY ?? "",
});
