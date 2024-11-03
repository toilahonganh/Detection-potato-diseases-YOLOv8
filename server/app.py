import datetime
import io
import json
import os
import time
import secrets
from PIL import Image
from flask import Flask, request, jsonify, send_file, session
from flask_mysqldb import MySQL
from flask_session import Session
from flask_marshmallow import Marshmallow
from flask_cors import CORS, cross_origin
from flask_socketio import emit, SocketIO
from werkzeug.utils import secure_filename
from yolov8 import yolov8_predict

app = Flask(__name__)

socketio = SocketIO(app)
ALLOWED_EXTENSIONS = {'mp4', 'avi', 'mkv', 'mov'}
app.secret_key = 'dhbsfbsdbc8223bd'
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Dinhhong@nh1'
app.config['MYSQL_DB'] = 'yolov8shrimp'
mysql = MySQL(app)
ma = Marshmallow(app)

image_dir = "upload"

import json

@app.route("/upload", methods=["POST"])
@cross_origin()
def upload_image():
    try:
        if "image" not in request.files:
            return jsonify({"error": "No image part"})
        
        image = request.files["image"]
        if image.filename == "":
            return jsonify({"error": "No selected image"})
        
        image_bytes = image.read()
        img = Image.open(io.BytesIO(image_bytes))
        model = yolov8_predict(img)

        if model:
            unique_object_types = set()
            kind_counts = {}

            for result in model["results"]:
                object_type = result["Object type"]
                unique_object_types.add(object_type)
                kind_counts[object_type] = kind_counts.get(object_type, 0) + 1
            
            # Chuyển các kiểu object và kind_counts thành chuỗi JSON
            unique_object_types_str = json.dumps(list(unique_object_types))
            kind_counts_str = json.dumps(kind_counts)

            current_time = datetime.datetime.now()
            formatted_time = current_time.strftime("%Y-%m-%d %H:%M:%S")
            image_path = model["image_path"]

            # Lưu dữ liệu vào database
            cur = mysql.connection.cursor()
            query = """INSERT INTO history (image, kind, c_time) VALUES (%s, %s, %s)"""
            values = (image_path, unique_object_types_str, formatted_time)
            cur.execute(query, values)
            mysql.connection.commit()
            cur.close()

            # Tạo phản hồi cho client
            response_data = {
                "image": image_path,
                "c_time": formatted_time,
                "object_types": list(unique_object_types),  # Dữ liệu phản hồi dạng danh sách
                "kind": list(unique_object_types),
            }
            return jsonify([response_data])
        else:
            return jsonify({"message": "No objects detected in the image. Data not pushed to the database."})
    except Exception as e:
        return jsonify({"error": "An error occurred while processing the image: " + str(e)})

@app.route("/getimage/<filename>")
@cross_origin()
def get_image(filename):
    image_path = os.path.join(image_dir, filename)
    return send_file(image_path)

def get_image_list():
    return [
        f for f in os.listdir(image_dir)
        if os.path.isfile(os.path.join(image_dir, f))
    ]

@socketio.on("get_images")
def get_images():
    while True:
        time.sleep(1)
        current_image_list = get_image_list()
        emit("update_images", {"images": current_image_list})

@app.route("/get_details", methods=["POST", "GET"])
@cross_origin()
def get_details():
    try:
        data = request.get_json()
        image = data["image"]
        c_time = data["c_time"]
        kind = data["kind"]

        cur = mysql.connection.cursor()
        cur.execute(f"SELECT * FROM history WHERE image = %s AND c_time = %s AND kind = %s", (image, c_time, kind))
        history_entries = cur.fetchall()
        cur.close()
        history_details = []

        for history_entry in history_entries:
            entry_details = {
                "image": history_entry[0],
                "c_time": history_entry[1].strftime("%Y-%m-%d %H:%M:%S"),
                "kind": json.loads(history_entry[2])
            }
            history_details.append(entry_details)

        return jsonify({"success": True, "history_details": history_details})
    except Exception as e:
        return jsonify({"success": False, "message": "Error when retrieving history details: " + str(e)})

def delete_image(image_name):
    try:
        image_path = os.path.join(image_dir, image_name)
        if os.path.exists(image_path):
            os.remove(image_path)
            print(f"Removed image: {image_name}")
        else:
            print(f"Image does not exist: {image_name}")
    except Exception as e:
        print(f"Error deleting image {image_name}: {str(e)}")

@app.route("/delete_history", methods=["POST"])
@cross_origin()
def delete_history():
    try:
        data = request.get_json()
        image = data["image"]

        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM history WHERE image = %s", (image,))
        history_entry = cur.fetchone()

        if history_entry:
            cur.execute("DELETE FROM history WHERE image = %s", (image,))
            mysql.connection.commit()
            delete_image(image)
            cur.close()
            return jsonify({"success": True, "message": "History deleted successfully"})
        else:
            cur.close()
            return jsonify({"success": False, "message": "No history found to delete"})
    
    except Exception as e:
        return jsonify({"success": False, "message": "Error when deleting history: " + str(e)})

@app.route('/getAllImage', methods=["GET"])
def get_all():
    try:
        offset = request.args.get("offset")
        offset = int(offset) if offset else 0

        cur = mysql.connection.cursor()
        query = """
            SELECT image, MAX(c_time) AS newest_time, 
                   GROUP_CONCAT(kind) AS kind
            FROM history
            GROUP BY image
            ORDER BY newest_time DESC
            LIMIT 20 OFFSET %s
        """
        cur.execute(query, (offset,))
        data = cur.fetchall()
        cur.close()
        return jsonify({"images": data})

    except Exception as e:
        return jsonify({"error": str(e)})


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

if __name__ == "__main__":
    app.run(debug=True, port=8080)
