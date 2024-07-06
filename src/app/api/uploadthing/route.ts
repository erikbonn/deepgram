import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";
import dotenv from "dotenv";

dotenv.config();

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,

  // Apply an (optional) custom config:
  config: {
    uploadthingSecret: process.env.UPLOADTHING_SECRET,
    uploadthingId: process.env.UPLOADTHING_APP_ID,
    callbackUrl: process.env.UPLOADTHING_URL,
  },
});
