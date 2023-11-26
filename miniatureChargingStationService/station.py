import time
import board
import neopixel
from gpiozero.pins.pigpio import PiGPIOFactory
from gpiozero import AngularServo
import pika
import json

NUM_PIXELS = 17

leftStrip = neopixel.NeoPixel(board.D18, NUM_PIXELS)
factory = PiGPIOFactory()
servo = AngularServo(17, min_angle=-90, max_angle=90, pin_factory=factory)
credentials = pika.PlainCredentials('admin', 'admin')
connection = pika.BlockingConnection(pika.ConnectionParameters(host='192.168.94.1', credentials=credentials))
channel = connection.channel()
channel.exchange_declare(exchange='events', exchange_type='fanout')

def enter_spot():
    for i in range(NUM_PIXELS - 4 + 1):
        leftStrip.fill((0,0,0))
        for j in range(4):
            leftStrip[NUM_PIXELS - i - j - 1] = (0,0,255)
        time.sleep(0.1)

def done_charging():
    for brightness in range(0, 127):
        leftStrip.fill((0, brightness, 0))
        time.sleep(0.01)

    for brightness in range(127, 0, -1):
        leftStrip.fill((0, brightness, 0))
        time.sleep(0.01)

def charging_anim():
    for i in range(NUM_PIXELS):
        leftStrip[i] = (0, i * 255 // NUM_PIXELS, 0)
        time.sleep(0.1)

    for i in range(NUM_PIXELS):
        leftStrip[i] = (0, 0, 0)
        time.sleep(0.1)

def not_allowed_to_enter():
    for i in range(5):
        leftStrip.fill((255, 0, 0))
        time.sleep(0.1)
        leftStrip.fill((0, 0, 0))
        time.sleep(0.1)

    time.sleep(2)

def turn_off_leds():
    leftStrip.fill((0, 0, 0))

def open_barrier():
    servo.angle = 90

def close_barrier():
    servo.angle = -90

def signal_charging(percentage):
    channel.queue_declare(queue='events')
    time.sleep(1)
    channel.basic_publish(exchange='', routing_key='events', body='{"name": "charging_started", "data": {"percentage": ' + percentage + '}}')

def singal_charging_done():
    channel.queue_declare(queue='events')
    time.sleep(1)
    channel.basic_publish(exchange='', routing_key='events', body='{"name": "charging_done", "data": {}')

def signal_vehicle_abusive():
    channel.queue_declare(queue='events')
    time.sleep(1)
    channel.basic_publish(exchange='', routing_key='events', body='{"name": "vehicle_abusive", "data": {}}')

def signal_charging_started():
    channel.queue_declare(queue='events')
    time.sleep(1)
    channel.basic_publish(exchange='', routing_key='events', body='{"name": "charging_started", "data": {}}')

def signal_vehicle_entering():
    channel.queue_declare(queue='events')
    time.sleep(1)
    channel.basic_publish(exchange='', routing_key='events', body='{"name": "vehicle_entering", "data": {}}')

def open_barrier_and_signal_enter():
    open_barrier()
    time.sleep(1)
    for i in range(5):
        enter_spot()
    time.sleep(1)
    turn_off_leds()
    close_barrier()
    
    signal_charging_started()
    for i in range(5):
        signal_charging(i * 20)
        charging_anim()
        time.sleep(2000)
    time.sleep(1)
    turn_off_leds()

    for i in range(3):
        singal_charging_done()
        done_charging()
    time.sleep(1)
    turn_off_leds()

    for i in range(3):
        signal_vehicle_abusive()
        not_allowed_to_enter()
    turn_off_leds()

def vehicle_can_enter_obs(ch, method, properties, body):
    print(" [x] Received %r" % body)

    bod = body.decode()

    name = json.loads(bod)['name']
    data = json.loads(bod)['data']

    if name == 'plate_detected':
        if data.plate.endswith('e'):
            signal_vehicle_entering()
            open_barrier_and_signal_enter()
        else:
            signal_vehicle_abusive()
            for i in range(5):
                not_allowed_to_enter()
        turn_off_leds()

close_barrier()

result = channel.queue_declare(queue='', exclusive=True)
queue_name = result.method.queue
channel.queue_bind(exchange='events', queue=queue_name)
channel.basic_consume(queue=queue_name, auto_ack=True, on_message_callback=vehicle_can_enter_obs)
channel.start_consuming()