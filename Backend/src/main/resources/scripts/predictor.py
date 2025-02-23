import pickle
import numpy as np
from scipy.stats import entropy

# Define the same feature extraction function used during training
def extract_features(data_hex):
    try:
        data_bytes = bytes.fromhex(data_hex)  # Convert hex string to bytes
        length = len(data_bytes)

        if length == 0:
            return [0, 0, 0, 0, 0, 0, 0]

        freq = [data_bytes.count(i) for i in range(256)]
        prob = [f / length if length > 0 else 1/256 for f in freq]
        ent = entropy(prob, base=2) if length > 0 else 0

        # Convert bytes to integer array
        data_int = np.array(list(data_bytes), dtype=np.uint8)
        mean = np.mean(data_int) if length > 0 else 0
        std = np.std(data_int) if length > 0 else 0

        has_0x30 = 1 if 48 in data_bytes else 0  # 0x30 check
        length_mod_16 = length % 16
        length_mod_8 = length % 8

        return [length, ent, mean, std, has_0x30, length_mod_16, length_mod_8]

    except ValueError as e:
        print(f"Error processing data: {data_hex} -> {e}")
        return [0, 0, 0, 0, 0, 0, 0]

# Load the trained model (assumes the model is saved in 'model.pickle')
try:
    with open('model.pickle', 'rb') as f:
        model = pickle.load(f)
except FileNotFoundError:
    print("Error: Model file 'model.pickle' not found.")
    exit()

# Define a testing function
def test_model(input_hex):
    # Extract features from the input hex string
    features = extract_features(input_hex)
    # Reshape to match model input dimensions (1 sample, n_features)
    features_array = np.array(features).reshape(1, -1)
    # Use the model to predict the algorithm
    prediction = model.predict(features_array)
    return prediction[0]

# Take user input for HEX string
input_hex = input("Enter the encrypted data in HEX format: ").strip()

try:
    # Ensure the input is a valid HEX string
    bytes.fromhex(input_hex)  # This will raise an error if it's not valid hex
    print("\nProcessing Hex Input:", input_hex)  # Show the entered hex value

    # Predict algorithm
    predicted_algo = test_model(input_hex)
    print("\nPredicted Algorithm:", predicted_algo)

except ValueError:
    print("Error: Invalid HEX input. Please enter a valid HEX string.")
