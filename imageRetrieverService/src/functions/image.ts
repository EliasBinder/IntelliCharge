import {Context, t} from "elysia";
import {rabbitConfig} from "../rabbitMqConnector";

type bodyType = {
    file: Blob
}

export const image = async (context: Context) => {
    const body = context.body as bodyType
    const file = body.file
    const fileArray = await file.arrayBuffer()

    //Convert fileArray to base64

    const base64 = Buffer.from(fileArray).toString('base64')

    console.log('Sending to RabbitMQ: ' + base64);

    rabbitConfig.sendToQueue('images', Buffer.from(base64));

    return 'Image sent to RabbitMQ';
}

export const imageBody = {
    'type': 'formdata',
    body: t.Object({
        file: t.File()
    })
}