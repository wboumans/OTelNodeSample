import { app } from "@azure/functions";

app.setup({
  // capabilities: { WorkerOpenTelemetryEnabled: true },
  enableHttpStream: true,
});
