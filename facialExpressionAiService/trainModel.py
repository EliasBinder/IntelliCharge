# TensorFlow and tf.keras
import pandas
import tensorflow as tf
from keras import layers
import keras

# Helper libraries
import numpy as np
from sklearn.model_selection import train_test_split

from keras.models import save_model


def train_model():
    # Prepare base model
    vgg16 = tf.keras.applications.VGG16(
        include_top=False,
        input_shape=(48, 48, 3),
        weights='imagenet',
    )

    # Prepare top layer model

    NUM_CLASSES = 7

    top_layer_model = tf.keras.Sequential()
    top_layer_model.add(layers.Dense(256, input_shape=(512,), activation='relu'))
    top_layer_model.add(layers.Dense(256, input_shape=(256,), activation='relu'))
    top_layer_model.add(layers.Dropout(0.5))
    top_layer_model.add(layers.Dense(128, input_shape=(256,), activation='relu'))
    top_layer_model.add(layers.Dense(NUM_CLASSES, activation='softmax'))

    # Prepare data

    train_data_frame = pandas.read_csv('./traningsdata/train.csv', names=['emotion', 'pixels'])

    # Drop rows with empty pixels column from data frame

    train_data_frame = train_data_frame[train_data_frame.pixels != 'pixels']

    # Split pixels column into 3 columns

    x = np.asarray(train_data_frame['pixels'].apply(lambda x: np.repeat(np.fromstring(x, dtype=int, sep=' '), 3).astype(dtype=int).reshape((-1, 48, 48, 3))))  # Pixels are split by space
    y = np.asarray(train_data_frame['emotion']).astype(dtype=int)
    y = keras.utils.to_categorical(y, num_classes=NUM_CLASSES)
    x = np.array([xi[0] for xi in x])
    print(x.shape)

    # Normalize data

    # x_train = x_train.apply(lambda x: x / 255.0)
    # x_test = x_test.apply(lambda x: x / 255.0)

    # Split data into train and test

    x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=42)

    # Log x_train and x_test

    print('x_train')
    print(x_train.shape)

    print('x_test')
    print(x_test.shape)

    # Train model

    inputs = tf.keras.Input(shape=(48, 48, 3))
    vg_output_train = vgg16(x_train)
    vg_output_train = tf.keras.layers.Flatten()(vg_output_train)

    vg_output_test = tf.keras.layers.Flatten()(vgg16(x_test))

    adamax = tf.keras.optimizers.legacy.Adamax()
    top_layer_model.compile(optimizer=adamax,
                            loss='categorical_crossentropy',
                            metrics=['accuracy'])
    top_layer_model.fit(vg_output_train, y_train, epochs=10000, batch_size=50, validation_data=(vg_output_test, y_test))

    # Merge base model and top layer model

    model_predictions = top_layer_model(inputs=tf.keras.layers.Flatten()(vgg16(inputs)))
    final_model = tf.keras.Model(inputs=inputs, outputs=model_predictions)

    # Save model

    config = final_model.get_config()
    weights = final_model.get_weights()
    model_to_save = tf.keras.Model.from_config(config)
    model_to_save.set_weights(weights)

    # Save the model in Keras format

    export_path = './model.keras'
    save_model(model_to_save, export_path)


if __name__ == '__main__':
    train_model()

