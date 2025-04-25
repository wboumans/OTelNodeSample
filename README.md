Changes compared to version from Rohit: 

* Converted to ESM modules
* Replaced the @azure/functions with @azure/monitor-opentelemetry
  * Using the same OTEL versions, to avoid mixing OTEL 2.0 with 1.x as used in @azure/monitor-opentelemetry
  * See https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-opentelemetry/package.json
* Split the application into otel setup (otel.mjs) and application setup (index.mjs)
* experimental loader added to NODE_OPTIONS and languageWorkers__node__arguments to load otel.mjs as per https://github.com/open-telemetry/opentelemetry-js/blob/main/doc/esm-support.md


Status: Failing to report remote spans in Azure Monitor

See the failing.log file for a failed startup, problematic lines are marked with -->

* index.mjs and function/* files are loaded before the OTEL init runs
* OTEL span is undefined when invoking the function


To reproduce locally:

Create a local settings file:

```
{
  "IsEncrypted": false,
  "Values": {
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "APPLICATIONINSIGHTS_CONNECTION_STRING": "<REDACTED>",
    "languageWorkers__node__arguments": "--inspect=4001 --enable-source-maps --experimental-loader=@opentelemetry/instrumentation/hook.mjs --import ./src/otel.mjs",
    "NODE_OPTIONS": "--inspect=4001 --enable-source-maps --experimental-loader=@opentelemetry/instrumentation/hook.mjs --import ./src/otel.mjs"
  },
  "ConnectionStrings": {}
}
```

Build and start:


npm i
npm start

Access the function

curl http://localhost:4000/api/httpTrigger1?name=test



