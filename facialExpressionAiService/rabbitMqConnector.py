import json

import numpy as np

import pika

from aiRunner import predict

credentials = pika.PlainCredentials('admin', 'admin')
connection = pika.BlockingConnection(pika.ConnectionParameters(host='rabbitmqhackathon', credentials=credentials))
channel = connection.channel()
channel.queue_declare(queue='image_face')
channel.queue_declare(queue='events')
channel.exchange_declare(exchange='image_face', exchange_type='fanout')

def callback(ch, method, props, body):
    body = body.decode()
    print(" [x] Received %r" % body)
    prediction = predict(np.repeat(np.fromstring(body, dtype=int, sep=' '), 3).reshape((-1, 48, 48, 3)))
    print(prediction)
    event = {
        'name': 'face_expression',
        'data': int(prediction)
    }
    channel.basic_publish(exchange='', routing_key='events', body=json.dumps(event, indent=4).encode('utf-8'))


channel.basic_consume(queue='image_face', auto_ack=True, on_message_callback=callback)
channel.start_consuming()

