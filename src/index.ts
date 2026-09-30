import { Channel, socketPath } from "./channel.ts";
import { listen, USAGE } from "./listen.ts";
import { registerModal } from "./modal.ts";
import type { HunkExtensionAPI } from "hunkdiff/extension";

export default function registerHunkReview(hunk: HunkExtensionAPI) {
  let channel: Channel | undefined;

  hunk.on("changeset_loaded", () => {
    if (!channel) {
      channel = new Channel(socketPath(process.pid));
      channel.open();
    }
  });

  hunk.on("shutdown", () => channel?.close());

  registerModal(
    hunk,
    (decision) =>
      channel?.broadcast(
        decision === "approve" ? "review-approved" : "review-denied",
      ) ?? 0,
  );

  hunk.registerCliCommand(
    {
      name: "review",
      summary: "Listen for decisions made in a Hunk review",
      usage: USAGE,
    },
    async (parameters, context) => ({
      kind: "exit",
      code: await listen(parameters, context),
    }),
  );
}
