from tensorflow.keras.models import load_model
import tensorflowjs as tfjs
import os

path = os.path.dirname(os.path.abspath(__file__))
model = load_model(f'{path}/test/model.h5')
tfjs.converters.save_keras_model(
 model, f'{path}/test')
