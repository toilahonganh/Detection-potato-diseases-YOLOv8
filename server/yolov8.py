import os
import cv2
import time
import shutil
import random
import string
from PIL import Image
from ultralytics import YOLO


def generate_random_string(length):
    characters = string.ascii_letters + string.digits  # Chữ cái và số
    return ''.join(random.choice(characters) for _ in range(length))

UPLOAD_DIR = 'upload' 

if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

model = YOLO('best_239.pt')

def yolov8_predict(image_path):
    try:
        results = model.predict(image_path, save=False, imgsz=640, conf=0.5)
        result = results[0]

        # Kiểm tra nội dung của result
        print("Result:", result)
        print("Boxes:", result.boxes)
        print("Classes:", result.names)

        predictions = []
        for box in result.boxes:
            class_id = result.names[box.cls[0].item()]
            
            prediction = {
                "Object type": class_id,
            }
            predictions.append(prediction)

        if predictions:
            current_time = int(time.time())
            random_string = generate_random_string(10)
            image_name = f'{random_string}{current_time}.jpg'
            im = Image.fromarray(result.plot()[:, :, ::-1])
            im.save(os.path.join(UPLOAD_DIR, image_name))

            result = {"results": predictions, "image_path": image_name}
            return result
        else:
            result = {}
            return result
    except Exception as e:
        return 'Error processing prediction: ' + str(e)





