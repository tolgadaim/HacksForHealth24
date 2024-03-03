import io
import os
import pandas as pd
import sys
from google.cloud import vision
from google_vision_ai import VisionAI
from google_vision_ai import prepare_image_local
from drug_named_entity_recognition import find_drugs

DrugsList = [
    "Tylenol",
    "Advil",
    "Aleve",
    "Aspirin",
    "Zicam",
    "Benadryl",
    "Claritin",
    "Zyrtec",
    "Sudafed",
    "Pepto-Bismol",
    "Imodium",
    "Robitussin",
    "Mucinex",
    "Tums",
    "Rolaids"
]

def get_medicine(url):
    #Instantiates a client
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'C:/Users/Sean/Desktop/CSE/HacksForHealth24/vision/client_file.json'
    client = vision.ImageAnnotatorClient()
    filename = os.path.basename(url)

    # Search for the image file in the Downloads folder
    downloads_folder = os.path.expanduser('~') + '/Downloads'
    image_path = None
    for file in os.listdir(downloads_folder):
        if file.startswith(filename):
            image_path = os.path.join(downloads_folder, file)
            break

    if image_path is None:
        print("Image file not found for the provided URL.")
        return None

    #image_path = 'C:/Users/Sean/Desktop/CSE/HacksForHealth24/vision/example_images/test.jpg'
    image = prepare_image_local(image_path)
    #va = VisionAI(client, image)
    # image = vision.Image()
    # image.source.image_uri = url
    va = VisionAI(client, image)
    
    export = ""
    texts = va.text_detection()
    for indx, text in enumerate(texts):
        # print(text.description)
                
        # if "TYLENOL" in text.description:
        #     export = "TYLENOL"
        #     break
        # if "ZICAM" in text.description:
        #     export = "ZICAM"
        for drug in DrugsList:
            if drug.lower() in text.description.lower():
                export = drug.lower()
                break
        if export != "":
            break
        if indx > 3:
            break

    print(export)
    return export


def main():
    # Check if at least one argument is provided
    if len(sys.argv) < 2:
        print("Usage: python script.py <argument>")
        return
    
    # Get the first command-line argument
    arg1 = sys.argv[1]
    get_medicine(arg1)

if __name__ == "__main__":
    main()
