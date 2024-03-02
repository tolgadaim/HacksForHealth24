import io
import os
import pandas as pd
from google.cloud import vision
from google_vision_ai import VisionAI
from google_vision_ai import prepare_image_local

#Instantiates a client
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'C:/Users/Sean/Desktop/CSE/HacksForHealth24/vision/client_file.json'
client = vision.ImageAnnotatorClient()

# #local image (url option is available too)
# image_path = 'C:/Users/Sean/Desktop/CSE/HacksForHealth24/vision/example_images/sky.webp'
# with io.open(image_path, 'rb') as image_file:
#     content = image_file.read()
# image = vision.Image(content=content)

# response = client.label_detection(image = image)
# for label in response.label_annotations: 
#     print(label.description)
#     print(label.score)

image_path = 'C:/Users/Sean/Desktop/CSE/HacksForHealth24/vision/example_images/sky.webp'
image = prepare_image_local(image_path)
va = VisionAI(client, image)
label_detections = va.label_detection()

df = pd.DataFrame(label_detections)
print(df)