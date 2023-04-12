import http from "node:http";
import url from "node:url";
import v8 from "node:v8";
import { StringDecoder } from "string_decoder";

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname.replace(/^\/+|\/+$/g, "");
  const query = parsedUrl.query;

  const buffer = await new Promise((resolve) => {
    const decoder = new StringDecoder("utf-8");
    let data = "";

    req.on("data", (chunk) => {
      data += decoder.write(chunk);
    });

    req.on("end", () => {
      data += decoder.end();
      resolve(data);
    });
  });

  let payload;
  if (buffer) {
    try {
      payload = JSON.parse(buffer);
    } catch (err) {
      payload = null;
    }
  }

  const handler = router[path] || notFound;
  const { statusCode, response } = await handler(query, payload);

  res.setHeader("Content-Type", "application/json");
  res.writeHead(statusCode);
  res.end(JSON.stringify(response));
});

const largePayloadHandler = async () => {
  return {
    statusCode: 200,
    response: { message: "Payload processed successfully" },
  };
};

const statsHandler = () => {
  return { statusCode: 200, response: v8.getHeapStatistics() };
};

const generateLargePayloadHandler = (query, payload, callback) => {
  const size = parseInt(query.size, 10) || 1024; // Default size is 1KB
  const largePayload = Buffer.alloc(size, "A"); // Generate a large payload filled with 'A's

  return {
    statusCode: 200,
    message: `Generated a large payload of size ${size} bytes`,
    payload: largePayload.toString("base64"), // Return the payload as a base64-encoded string
  };
};

const notFound = () => {
  return { statusCode: 404, message: "Route not found" };
};

const router = {
  "large-payload": largePayloadHandler,
  "generate-large-payload": generateLargePayloadHandler,
  stats: statsHandler,
};

const port = 3000;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
