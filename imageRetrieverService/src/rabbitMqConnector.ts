import client, {Connection} from "amqplib";

const connectToRabbit = async () => {
    const connection = await client.connect('amqp://admin:admin@rabbitmqhackathon:5672');
    const channel = await connection.createChannel();
    await channel.assertQueue('testQueue');
    return channel;
}

export const rabbitConfig = await connectToRabbit();