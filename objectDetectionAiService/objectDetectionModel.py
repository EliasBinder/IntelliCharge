import base64

import numpy as np

import tensorflow as tf

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

    # get and filter results
    car_names = ['beach_wagon', 'station_wagon', 'wagon', 'estate_car', 'beach_waggon', 'station_waggon', 'waggon',
                 'limousine', 'limo',
                 'tow_truck', 'tow_car', 'wrecker', 'minivan',
                 'police_van', 'police_wagon', 'paddy_wagon', 'patrol_wagon', 'wagon', 'black_maria',
                 'car_wheel', 'sports_car', 'sport_car', 'coupe', 'convertible', 'cabriolet', 'golfcart', 'golf_cart']
    prediction = prediction[0]
    results = []
    for pred in prediction:
        if pred[1] in car_names:
            results.append('car')
        else:
            results.append(pred[1])

    # remove duplicates
    results = list(dict.fromkeys(results))
    return results


def convert_img(img_data):
    img_data = base64.b64decode(img_data)

    decoded = tf.image.decode_jpeg(img_data)

    decoded = tf.keras.preprocessing.image.img_to_array(decoded)

    decoded = np.expand_dims(decoded, axis=0)
    decoded = tf.keras.applications.mobilenet_v3.preprocess_input(decoded)

    return decoded

