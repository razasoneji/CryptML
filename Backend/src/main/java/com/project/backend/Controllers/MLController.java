package com.project.backend.Controllers;


import com.project.backend.Services.MLService;
import com.project.backend.Services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;
import java.util.logging.Logger;

//
//@RestController
//@RequestMapping("/api/ml")
//public class MLController {
//    private final MLService mlService;
//
//
//    public MLController(MLService mlService) {
//        this.mlService = mlService;
//    }
//
//    private static final Logger log = Logger.getLogger(MLController.class.getName());
//
//    @PostMapping("/predict")
//    public String predict(@RequestBody Map<String, String> input) {
//        log.info("Received Request in the mlcontroller.");
//        String inputHex = input.get("input_hex");
//        Optional<String> result = mlService.predictAlgorithm(inputHex);
//        log.info("Predicted op from controller. : " + result.orElse(""));
//        return result.orElse("{\"error\": \"Prediction failed\"}");
//    }
//}


@RestController
@RequestMapping("/api/ml")
public class MLController {

    private final MLService mlService;

    private final UserService userService;


    @Autowired
    public MLController(MLService mlService,UserService userService) {
        this.userService = userService;
        this.mlService = mlService;
    }



    private static final Logger log = Logger.getLogger(MLController.class.getName());

    @PostMapping("/predict")
    public ResponseEntity<Map<String, String>> predict(@RequestBody Map<String, String> input) {
        log.info("Received Request in the ML Controller.");

        if (!input.containsKey("input_hex")) {
            log.info("Input has no 'input_hex' key.");
            return ResponseEntity.badRequest().body(Map.of("error", "Missing 'input_hex' field"));
        }

        String inputHex = input.get("input_hex");
        Optional<String> result = mlService.predictAlgorithm(inputHex);

        if (result.isPresent()) {
            log.info("result is present.");
            log.info("Sending to user service from ml controller.");
            userService.savePrediction(input.get("input_hex"),result.get());
            return ResponseEntity.ok(Map.of("predicted_algorithm", result.get()));
        } else {
            log.info("result is not present");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Prediction failed"));
        }
    }
}

