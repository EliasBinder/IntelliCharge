import time
import board
import neopixel
from gpiozero.pins.pigpio import PiGPIOFactory
from gpiozero import AngularServo

import pika

# Define the number of leftStrip in the strip
NUM_PIXELS = 34

# Initialize the neopixel strip
leftStrip = neopixel.NeoPixel(board.D18, NUM_PIXELS)
factory = PiGPIOFactory()
servo = AngularServo(17, min_angle=-90, max_angle=90, pin_factory=factory)

connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
channel = connection.channel()

def enter_spot():
    for i in range(NUM_PIXELS - 4 + 1):
        leftStrip.fill((0,0,0))
        for j in range(4):
            leftStrip[i+j] = (0,0,255)
        time.sleep(0.1)

# Define a function to animate the strip
def done_charging():
    # Pulse through the brightness levels
    for brightness in range(0, 127):
        leftStrip.fill((0, brightness, 0))
        time.sleep(0.01)

    for brightness in range(127, 0, -1):
        leftStrip.fill((0, brightness, 0))
        time.sleep(0.01)

def charging_anim():

    # Turn on the LEDs progressively in the color red
    for i in range(NUM_PIXELS):
        leftStrip[i] = (0, i * 255 // NUM_PIXELS, 0)
        time.sleep(0.1)

    # Turn off the LEDs progressively
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

def open_barrier_and_signal_enter(ch, method, properties, body):
    print(" [x] Received %r" % body)
    open_barrier()
    time.sleep(1)
    for i in range(5):
        enter_spot()
    time.sleep(1)
    turn_off_leds()
    close_barrier
    for i in range(5):
        charging_anim()
    time.sleep(1)
    turn_off_leds()
    channel.queue_declare(queue='charging_completed')
    channel.basic_publish(exchange='', routing_key='charging_completed', body='Charging was successfully completed.')
    for i in range(3):
        done_charging()
    turn_off_leds()
    time.sleep(1)
    channel.queue_declare(queue='vehicle_abusive')
    channel.basic_publish(exchange='', routing_key='vehicle_abusive', body='Charging is done and vehicle is stationary for too long.')
    for i in range(3):
        not_allowed_to_enter()
    turn_off_leds()
    time.sleep(1)

channel.basic_consume(queue='vehicle_can_enter', auto_ack=True, on_message_callback=open_barrier_and_signal_enter)

time.sleep(1)
close_barrier()
for i in range(3):
    charging_anim()
time.sleep(1)
done_charging()