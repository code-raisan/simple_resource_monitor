import express from "express";
import { sendResource } from "./utils";

const app: express.Express = express();

app.get("/api/resource/", (_Request: express.Request, Response: express.Response) =>{
  Response.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive"
  });

  sendResource(Response, 1000);
})

app.listen(3000, () => console.log("http://localhost:3000/api/resource/"));