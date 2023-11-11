import pika

from aiRunner import predict

credentials = pika.PlainCredentials('admin', 'admin')
connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost', credentials=credentials))
channel = connection.channel()
channel.queue_declare(queue='image_face')
channel.exchange_declare(exchange='image_face', exchange_type='fanout')

def callback(ch, method, props, body):
    body = body.decode()
    print(" [x] Received %r" % body)
    prediction = predict(body)
    channel.basic_publish(exchange='', routing_key='events', body=prediction)


channel.basic_consume(queue='image_face', auto_ack=True, on_message_callback=callback)
channel.start_consuming()