import base64

import numpy as np

import tensorflow as tf

MODEL_DIR = "./trainingsdata/model.gz"
model = tf.keras.applications.MobileNetV3Small(
    input_shape=None,
    alpha=1.0,
    minimalistic=False,
    include_top=True,
    weights='imagenet',
    input_tensor=None,
    classes=1000,
    pooling=None,
    dropout_rate=0.2,
    classifier_activation='softmax',
    include_preprocessing=True
)

def predict(img_data):
    img = convert_img(img_data)
    prediction = model.predict(img)
    prediction = tf.keras.applications.mobilenet_v3.decode_predictions(prediction)
    car_names = ['beach wagon', 'station wagon', 'wagon', 'estate car', 'beach waggon', 'station waggon', 'waggon',
                 'limousine', 'limo',
                 'tow truck', 'tow car', 'wrecker',
                 'police van', 'police wagon', 'paddy wagon', 'patrol wagon', 'wagon', 'black Maria']
    print(prediction)


def convert_img(img_data):
    img_data = base64.b64decode(img_data)

    decoded = tf.image.decode_jpeg(img_data)

    decoded = tf.keras.preprocessing.image.img_to_array(decoded)

    decoded = np.expand_dims(decoded, axis=0)
    decoded = tf.keras.applications.mobilenet_v3.preprocess_input(decoded)

    # convert PIL image to numpy array
    return decoded

