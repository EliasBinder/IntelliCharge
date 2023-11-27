import json

import pika

from faceDetectionModel import detect
from objectDetectionModel import predict

credentials = pika.PlainCredentials('admin', 'admin')
connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost', credentials=credentials))
channel = connection.channel()
channel.exchange_declare(exchange='images', exchange_type='fanout')
channel.queue_declare(queue='events')
channel.queue_declare(queue='images_face')
channel.queue_declare(queue='images_car')

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
        # if predictionObject includes a car, send the image to the license plate detection service
        # for object in predictionObject:
        #     if object == 'car':
        channel.basic_publish(exchange='', routing_key='images_car', body=body)
    if predictionFace is not None:
        for face in predictionFace:
            channel.basic_publish(exchange='', routing_key='images_face', body=face)


channel.basic_consume(queue='images', auto_ack=True, on_message_callback=callback)
channel.start_consuming()

