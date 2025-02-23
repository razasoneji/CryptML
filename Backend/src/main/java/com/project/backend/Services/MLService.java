package com.project.backend.Services;



import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Optional;

//@Service
//public class MLService {
//
//    private static final Logger log = LoggerFactory.getLogger(MLService.class);
//    private static final String PYTHON_SCRIPT = "src/main/resources/scripts/predict.py";
//
//    public Optional<String> predictAlgorithm(String inputHex) {
//        log.info("Received request to predict algorithm in the ML SERVICE.");
//        try {
//            log.info("Inside the try block of predictAlgorithm");
//            // Construct command: python3 predict.py "HEX_DATA"
//            ProcessBuilder processBuilder = new ProcessBuilder("python3", PYTHON_SCRIPT, inputHex);
//            processBuilder.redirectErrorStream(true);
//            Process process = processBuilder.start();
//            log.info("Reaced midway of process.");
//            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
//            StringBuilder output = new StringBuilder();
//            String line;
//            while ((line = reader.readLine()) != null) {
//                output.append(line);
//            }
//            log.info("Finally going to return the predicted algorithm.");
//
//            return Optional.of(output.toString());  // Return JSON response
//        } catch (Exception e) {
//            log.info("Exception caught while trying to predict algo in its service.");
//            e.printStackTrace();
//            return Optional.empty();
//        }
//    }
//}
//
@Service
public class MLService {
    private static final Logger log = LoggerFactory.getLogger(MLService.class);
    private static final String PYTHON_SCRIPT = "src/main/resources/scripts/predict.py";

    public Optional<String> predictAlgorithm(String inputHex) {
        log.info("Received request to predict algorithm in the ML SERVICE.");
        try {
            log.info("Inside the try block of predictAlgorithm");

            // Detect OS and use the correct Python command
            String pythonCommand = System.getProperty("os.name").toLowerCase().contains("win") ? "python" : "python3";

            ProcessBuilder processBuilder = new ProcessBuilder(pythonCommand, PYTHON_SCRIPT, inputHex);
            processBuilder.redirectErrorStream(true);
            Process process = processBuilder.start();

            // Read output from Python script
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            StringBuilder output = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line);
            }

            // Wait for process to finish
            int exitCode = process.waitFor();
            if (exitCode != 0) {
                log.error("Python script exited with error code: " + exitCode);
                return Optional.empty();
            }

            log.info("Returning the predicted algorithm.");
            return Optional.of(output.toString());
        } catch (Exception e) {
            log.error("Exception caught while predicting algorithm.", e);
            return Optional.empty();
        }
    }
}
