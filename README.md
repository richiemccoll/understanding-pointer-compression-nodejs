# Understanding Pointer Compression in Node.js

This repo contains:

- a simple server that handles large payloads
- a script that uses `autocannon` to load test the server.

Three routes are exposed:

- one for processing large payloads
- one for generating large payloads
- one for retrieving v8 heap statistics

## Requirements

- Node.js

## Scripts

- `npm start` to start the server
- `npm run bench` to start autocannon

## API Routes

### `POST /large-payload`

#### Request:

```sh
curl -X POST -H "Content-Type: application/json" -d '{"data": "your_large_payload_here"}' http://localhost:3000/large-payload
```

#### Response:

```json
{
  "message": "Payload processed successfully"
}
```

### `GET /generate-large-payload?size={size}`

This route generates a large payload filled with 'A's and returns it as a base64-encoded string. The size of the generated payload can be specified using the size query parameter (in bytes).

#### Request:

```sh
curl http://localhost:3000/generate-large-payload?size=1024
```

### Response:

```json
{
  "message": "Generated a large payload of size 1024 bytes",
  "payload": "QUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQU"
}
```

### `GET /stats`

This route calls `v8.getHeapStatistics()` and returns the response.

#### Request:

```sh
curl http://localhost:3000/stats
```

### Response:

```json
{
  "total_heap_size": 52191232,
  "total_heap_size_executable": 786432,
  "total_physical_size": 45961216,
  "total_available_size": 4322552968,
  "used_heap_size": 21825888,
  "heap_size_limit": 4345298944,
  "malloced_memory": 139368,
  "peak_malloced_memory": 2957344,
  "does_zap_garbage": 0,
  "number_of_native_contexts": 1,
  "number_of_detached_contexts": 0,
  "total_global_handles_size": 8192,
  "used_global_handles_size": 3424,
  "external_memory": 1172400
}
```
