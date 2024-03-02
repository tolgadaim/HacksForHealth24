from flask import Flask, request, jsonify
from text_detection import get_medicine

app = Flask(__name__)

@app.route('/detect_medicine', methods=['POST'])
def detect_medicine():
    # Receive image file from frontend
    #image_file = request.files['image']

    # Save image to a temporary location
    #temp_image_path = '/tmp/temp_image.jpg'  # Adjust this path as needed
    #image_file.save(temp_image_path)

    # Call get_medicine function to process the image
    medicine = get_medicine()


    return jsonify({'medicine': medicine})

if __name__ == '__main__':
    app.run(debug=True)  # You may want to change this in production

    