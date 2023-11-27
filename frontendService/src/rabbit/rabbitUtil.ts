import client from "amqplib";
import {sendUpdate} from "../index";

const setupRabbit = async () => {
    const connection = await client.connect('amqp://admin:admin@rabbitmqhackathon:5672');
    const channel = await connection.createChannel();
    await channel.checkQueue('events')
    await channel.consume('events', (msg) => {
        if (!msg)
            return;
        channel.ack(msg!)
        const content = msg.content.toString();
        console.log('Received from RabbitMQ: ' + content);
        try {
            sendUpdate(content);
        } catch (e) {
            console.log(e);
        }
    });
    return {connection, channel};
}

export let rabbitConfig = await setupRabbit();

