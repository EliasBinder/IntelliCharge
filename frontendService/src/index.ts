import {Elysia} from "elysia";
import {frontend} from "./functions/frontend";
import {rabbitConfig} from "./rabbit/rabbitUtil";

let clients: any = [];

const regex = /\/update/g

const app = new Elysia()
    .state('version', '1.0.0')
    .ws("/update", {
        open(ws) {
            clients.push(ws);
        },
        close(ws) {
            clients = clients.filter((client: any) => client !== ws);
        }
    })
    .get("*", frontend)
    .listen(3000);

export const rabbit = rabbitConfig

export const sendUpdate = (update: any) => {
    clients.forEach((client: any) => {
        client.send(update);
    })
}

console.log(
  `📡 Frontend Service is running at ${app.server?.hostname}:${app.server?.port}`
);
