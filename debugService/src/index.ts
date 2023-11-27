import { Elysia } from "elysia";
import {rabbitConfig} from "./rabbit/rabbitUtil";

let clients: any = [];

const app = new Elysia()
    .state('version', '0.0.1')
    .ws("/update", {
        open(ws) {
            clients.push(ws);
        },
        close(ws) {
            clients = clients.filter((client: any) => client !== ws);
        }
    })
    .get("/", () => Bun.file('public/index.html'))
    .listen(3001);

export const rabbit = rabbitConfig

export const sendUpdate = (update: any) => {
    clients.forEach((client: any) => {
        client.send(update);
    })
}

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
