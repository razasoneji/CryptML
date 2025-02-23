# import pickle
# import numpy as np
# import sys
# import json
# from scipy.stats import entropy
#
# # Load the trained model
# MODEL_PATH = "src/main/resources/models/model.pickle"
#
# try:
#     with open(MODEL_PATH, "rb") as f:
#         model = pickle.load(f)
# except FileNotFoundError:
#     print(json.dumps({"error": "Model file not found."}))
#     exit()
#
# # Feature extraction function
# def extract_features(data_hex):
#     try:
#         data_bytes = bytes.fromhex(data_hex)  # Convert hex string to bytes
#         length = len(data_bytes)
#
#         if length == 0:
#             return [0, 0, 0, 0, 0, 0, 0]
#
#         freq = [data_bytes.count(i) for i in range(256)]
#         prob = [f / length if length > 0 else 1/256 for f in freq]
#         ent = entropy(prob, base=2) if length > 0 else 0
#
#         data_int = np.array(list(data_bytes), dtype=np.uint8)
#         mean = np.mean(data_int) if length > 0 else 0
#         std = np.std(data_int) if length > 0 else 0
#
#         has_0x30 = 1 if 48 in data_bytes else 0  # 0x30 check
#         length_mod_16 = length % 16
#         length_mod_8 = length % 8
#
#         return [length, ent, mean, std, has_0x30, length_mod_16, length_mod_8]
#
#     except ValueError:
#         return [0, 0, 0, 0, 0, 0, 0]
#
# # Function to predict algorithm
# def predict_algorithm(input_hex):
#     features = extract_features(input_hex)
#     features_array = np.array(features).reshape(1, -1)
#     prediction = model.predict(features_array)
#     return prediction[0]
#
# # Read input from Spring Boot (command-line argument)
# if __name__ == "__main__":
#     try:
#         input_data = sys.argv[1]  # Read input_hex from command-line
#         result = predict_algorithm(input_data)
#         print(json.dumps({"prediction": result}))
#     except Exception as e:
#         print(json.dumps({"error": str(e)}))
import sys
import os
import pickle
import numpy as np
from scipy.stats import entropy

def extract_features(data_hex):
    try:
        data_bytes = bytes.fromhex(data_hex)
        length = len(data_bytes)

        if length == 0:
            return [0, 0, 0, 0, 0, 0, 0]

        freq = [data_bytes.count(i) for i in range(256)]
        prob = [f / length if length > 0 else 1/256 for f in freq]
        ent = entropy(prob, base=2) if length > 0 else 0

        data_int = np.array(list(data_bytes), dtype=np.uint8)
        mean = np.mean(data_int) if length > 0 else 0
        std = np.std(data_int) if length > 0 else 0

        has_0x30 = 1 if 48 in data_bytes else 0
        length_mod_16 = length % 16
        length_mod_8 = length % 8

        return [length, ent, mean, std, has_0x30, length_mod_16, length_mod_8]

    except ValueError as e:
        print(f"Error processing data: {data_hex} -> {e}")
        return [0, 0, 0, 0, 0, 0, 0]

try:
    # Ensure the argument is provided
    if len(sys.argv) < 2:
        print("Error: No HEX input provided.")
        sys.exit(1)

    input_hex = sys.argv[1]  # Read input from command-line arguments
#     MODEL_PATH = os.path.join(os.path.dirname(__file__), "model.pickle")


    script_dir = os.path.dirname(os.path.abspath(__file__))  # Get the script directory
    model_path = os.path.join(script_dir, 'model.pickle')  # Set the full model path

    with open(model_path, 'rb') as f:
        model = pickle.load(f)


    # Load model
#     with open('model.pickle', 'rb') as f:
#         model = pickle.load(f)

    features = extract_features(input_hex)
    features_array = np.array(features).reshape(1, -1)
    prediction = model.predict(features_array)

    print(prediction[0])  # Print prediction (Spring Boot will read this)
except Exception as e:
    print(f"Error: {str(e)}")
