from flask import Flask, request, jsonify
import numpy as np
from PIL import Image
import io
from tensorflow.keras.models import load_model
from joblib import load
import logging
import sys
import os
from flask_cors import CORS

# Set UTF-8 encoding for stdout and stderr
if sys.version_info.major == 3:
    os.environ["PYTHONIOENCODING"] = "utf-8"
    sys.stdout = open(sys.stdout.fileno(), mode='w', encoding='utf8', buffering=1)
    sys.stderr = open(sys.stderr.fileno(), mode='w', encoding='utf8', buffering=1)

# Configure logging to handle UTF-8 encoding
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s %(levelname)s %(message)s',
    handlers=[logging.StreamHandler(sys.stdout)]
)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the model (assuming it's a Keras model saved in an .h5 file)
model = load_model('model.h5')

def preprocess_image(image):
    # Adjust this function based on your model's requirements.
    image = image.convert('RGB')  # Ensure image is in RGB mode
    image = image.resize((224, 224))  # Resize to 224x224 (example size)
    image = np.array(image)  # Convert to numpy array
    image = image / 255.0  # Normalize pixel values to [0, 1]
    image = np.expand_dims(image, axis=0)  # Add batch dimension
    return image

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the image from the request
        image_file = request.files['image']
        image = Image.open(image_file)

        # Preprocess the image
        processed_image = preprocess_image(image)

        # Make prediction
        prediction = model.predict(processed_image)
        predicted_class = int(prediction[0][0] >= 0.5)  # Assuming a binary classification model with sigmoid activation
        logging.debug(f'Predicted class: {predicted_class}')

        return jsonify({
            'status': 'success',
            'data': {
                'prediction': predicted_class
            }
        })

    except Exception as e:
        logging.error(f'Error: {str(e)}', exc_info=True)
        return jsonify({
            'status': 'fail',
            'message': str(e)
        }), 500

# Load the Diabetes model
numeric_model = load('saved_model.joblib')

@app.route('/model', methods=['POST'])
def model_predict():
    try:
        # Get input data from request
        data = request.json['data']
        # Make prediction
        data = np.array([data]).reshape(1, -1)
        prediction = numeric_model.predict(data)[0]
        logging.debug(f'Prediction: {prediction}')

        return jsonify({
            'status': 'success',
            'data': {
                'prediction': int(prediction)
            }
        })

    except Exception as e:
        logging.error(f'Error: {str(e)}', exc_info=True)
        return jsonify({
            'status': 'fail',
            'message': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True)
