package com.project.backend.Services;


import com.project.backend.Entities.CryptographicData;
import com.project.backend.Entities.User;
import com.project.backend.Repositories.CryptographicDataRepository;
import com.project.backend.Repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;


import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final CryptographicDataRepository cryptographicDataRepository;

    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    @Autowired
    public UserService(UserRepository userRepository,CryptographicDataRepository cryptographicDataRepository) {
        this.userRepository = userRepository;
        this.cryptographicDataRepository = cryptographicDataRepository;
    }


//    public void savePrediction(String inputHex, String predicted ) {
//
//    }

    public void savePrediction(String inputHex, String predicted) {
        // Get authenticated user
        log.info("Got request to save prediction in user service");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();// Get logged-in user's username

        log.info("Got at start");
        Optional<User> optionalUser = userRepository.findByUsername(username); // Assuming you have a method to find a user by username

        if (optionalUser.isPresent()) {
            log.info("Saving prediction for user {}", username);
            User user = optionalUser.get();

            // Create and save CryptographicData entity
            CryptographicData cryptographicData = new CryptographicData();
            cryptographicData.setData(inputHex);
            cryptographicData.setPredictedAlgorithm(predicted);
            cryptographicData.setUser(user);

            cryptographicDataRepository.save(cryptographicData);
        } else {
            throw new RuntimeException("Error in setting prediction for user. User not found for username: " + username);
        }
    }
}
