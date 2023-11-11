import pika

from faceDetectionModel import detect
from objectDetectionModel import predict

credentials = pika.PlainCredentials('admin', 'admin')
connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost', credentials=credentials))
channel = connection.channel()
channel.exchange_declare(exchange='images', exchange_type='fanout')

def callback(ch, method, props, body):
    print(" [x] Received %r" % body)
    predictionObject = predict(body)
    predictionFace = detect(body)
    if predictionObject is not None:
        channel.basic_publish(exchange='', routing_key='events', body=predictionObject)
    if predictionFace is not None:
        for face in predictionFace:
            channel.basic_publish(exchange='', routing_key='image_face', body=face)


channel.basic_consume(queue='images', auto_ack=False, on_message_callback=callback)

while True:
    pass