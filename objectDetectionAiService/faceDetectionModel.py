import base64

import numpy as np

import torch

import tensorflow as tf
import kornia as K
from kornia.core import Tensor
from kornia.contrib import FaceDetector, FaceDetectorResult, FaceKeypoint

def detect(img_data):
    # Convert img_raw to tensor
    img_data = base64.b64decode(img_data)

    decoded = tf.image.decode_jpeg(img_data)

    decoded = tf.keras.preprocessing.image.img_to_array(decoded)

    img_raw = decoded

    # Convert to PIL image

    img_pil = tf.keras.preprocessing.image.array_to_img(img_raw)

    # preprocess
    if img_raw is not None and len(img_raw.shape) == 3:
        img = K.image_to_tensor(img_raw, keepdim=False)
        img = K.color.bgr_to_rgb(img.float())


        # create the detector and find the faces !
        face_detection = FaceDetector()

        with torch.no_grad():
            dets = face_detection(img)
        dets = [FaceDetectorResult(o) for o in dets[0]]

        img_vis = img_raw.copy()

        vis_threshold = 0.7

        faces = []

        for b in dets:
            if b.score < vis_threshold:
                continue

            cropped_face = img_pil.crop(
                (int(b.top_left[0]), int(b.top_left[1]), int(b.bottom_right[0]), int(b.bottom_right[1])))
            # Make it a square image with 48x48 pixels and make it grayscale
            cropped_face = cropped_face.resize((48, 48)).convert('L')
            # Convert to gray values ranging from 0 to 255 in an array
            cropped_face_array = np.array(cropped_face, dtype=np.uint8)
            # Flatten the array
            cropped_face_flat = cropped_face_array.flatten()
            # Join the array to a string with space as delimiter
            cropped_face_str = ' '.join(cropped_face_flat.astype(str))
            # Add the cropped face to the list of faces
            faces.append(cropped_face_str)

        return faces