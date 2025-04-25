// Import the `useAzureMonitor()` function from the `@azure/monitor-opentelemetry` package.
import { useAzureMonitor } from "@azure/monitor-opentelemetry";

// To debug open telemetry, import the line below and enable it via the diag.setLogger line in the initialiseOpenTelemetry function
import { diag, DiagConsoleLogger, DiagLogLevel } from "@opentelemetry/api";
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

console.debug("About to set up OTEL");

// Call the `useAzureMonitor()` function to configure OpenTelemetry to use Azure Monitor.
useAzureMonitor();

console.debug("Completed set up OTEL");
