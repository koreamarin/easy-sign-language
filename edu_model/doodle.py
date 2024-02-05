import tensorflowjs as tfjs
from tensorflow.keras.models import load_model
import os


path = os.path.dirname(os.path.abspath(__file__))
model = load_model(f'{path}/data_114_train_100_model.h5')
tfjs.converters.save_keras_model(model, f'{path}/abcd')
