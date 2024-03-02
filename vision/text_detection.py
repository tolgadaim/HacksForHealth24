import io
import os
import pandas as pd
from google.cloud import vision
from google_vision_ai import VisionAI
from google_vision_ai import prepare_image_local


#Instantiates a client
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'C:/Users/Sean/Desktop/CSE/HacksForHealth24/vision/client_file.json'
client = vision.ImageAnnotatorClient()

image_path = 'C:/Users/Sean/Desktop/CSE/HacksForHealth24/vision/example_images/zicam.JPG'
image = prepare_image_local(image_path)
va = VisionAI(client, image)
import sys
export = ""
texts = va.text_detection()
for indx, text in enumerate(texts):
    print(text.description)
    if "TYLENOL" in text.description:
        export = "TYLENOL"
    if "ZICAM" in text.description:
        export = "ZICAM"
    #draw_boundary(image_path, text.bounding_poly, text.description)
    if indx > 3:
        break

print(export)
sys.exit()