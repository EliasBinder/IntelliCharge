import json

import pika

from faceDetectionModel import detect
from objectDetectionModel import predict

credentials = pika.PlainCredentials('admin', 'admin')
connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost', credentials=credentials))
channel = connection.channel()
channel.exchange_declare(exchange='images', exchange_type='fanout')
channel.queue_declare(queue='events')
channel.queue_declare(queue='image_face')

def callback(ch, method, props, body):
    body = body.decode()
    print(" [x] Received %r" % body)
    predictionObject = predict(body)
    predictionFace = detect(body)
    if predictionObject is not None:
        print('Prediction')
        event = {
            'name': 'objects_detected',
            'data': predictionObject
        }
        print('Event')
        print(json.dumps(event))
        channel.basic_publish(exchange='', routing_key='events', body=json.dumps(event).encode('utf-8'))
    if predictionFace is not None:
        for face in predictionFace:
            channel.basic_publish(exchange='', routing_key='image_face', body=face)


channel.basic_consume(queue='images', auto_ack=True, on_message_callback=callback)
channel.start_consuming()

