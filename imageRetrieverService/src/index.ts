import { Elysia } from "elysia";
import {image, imageBody} from "./functions/image";
const app = new Elysia()
    .state('version', '0.0.1')
    .get("/", () => "Hello Elysia")
    .post("/image", image, imageBody)
    .listen(4000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
