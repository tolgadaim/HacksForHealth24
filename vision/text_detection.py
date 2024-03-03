import io
import os
import pandas as pd
from google.cloud import vision
from google_vision_ai import VisionAI
from google_vision_ai import prepare_image_local

def get_medicine(url):
    #Instantiates a client
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'C:/Users/Sean/Desktop/CSE/HacksForHealth24/vision/client_file.json'
    client = vision.ImageAnnotatorClient()

    #image_path = 'C:/Users/Sean/Desktop/CSE/HacksForHealth24/vision/example_images/test.jpg'
    #image = prepare_image_local(image_path)
    #va = VisionAI(client, image)
    image = vision.Image()
    image.source.image_uri = url
    va = VisionAI(client, image)
    
    export = ""
    texts = va.text_detection()
    for indx, text in enumerate(texts):
        # print(text.description)
        if "TYLENOL" in text.description:
            export = "TYLENOL"
        if "ZICAM" in text.description:
            export = "ZICAM"
        if indx > 3:
            break

    print(export)
    return export

if __name__ == "__main__":
    get_medicine()
