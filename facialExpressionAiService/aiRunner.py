# TensorFlow and tf.keras
import keras
import numpy as np

model = keras.models.load_model('./model.keras')

def predict(img_data):
    prediction = model.predict(img_data)
    selected = np.argmax(prediction)
    return selected




