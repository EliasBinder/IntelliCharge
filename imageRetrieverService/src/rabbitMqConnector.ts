import client from "amqplib";

const connectToRabbit = async () => {
    const connection = await client.connect('amqp://admin:admin@rabbitmqhackathon:5672');
    const channel = await connection.createChannel();
    await channel.assertQueue('images')
    await channel.assertQueue('debug_images')
    return await connection.createChannel();
}

export const rabbitConfig = await connectToRabbit();