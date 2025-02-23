# **AI/ML-Based Cryptographic Algorithm Identification**

Welcome to the repository for the **AI/ML-Based Cryptographic Algorithm Identification** project! This project was developed as part of **DU Hacks 4.0 in 2025 held at DDU Nadiad**, with the goal of creating an intelligent system capable of identifying cryptographic algorithms from modern cryptographic datasets. By leveraging AI and ML techniques, the system analyzes data patterns and features to determine the cryptographic algorithm used, automating the process and enhancing the understanding of algorithm weaknesses to improve security.


# **Real-World Problem Statement: AI/ML-Based Cryptographic Algorithm Identification**


## 🚨 The Challenge

In today’s digital age, cryptographic algorithms are the backbone of secure communication, data protection, and privacy. However, as cyber threats evolve, attackers often exploit weaknesses in cryptographic implementations or use outdated algorithms to breach systems. Identifying the cryptographic algorithm used in a given dataset or communication stream is a critical step in assessing security vulnerabilities, but this process is **highly complex** and **time-consuming** when done manually.

### Why Is This a Real Issue?
1. **Rising Cyberattacks**: Attackers frequently use weak or deprecated cryptographic algorithms to exploit systems. Identifying these algorithms in real-time is crucial for preventing breaches.
2. **Lack of Automation**: Security analysts often rely on manual analysis or heuristic methods to identify cryptographic algorithms, which is error-prone and inefficient.
3. **Complexity of Modern Cryptography**: With the proliferation of cryptographic standards (e.g., AES, RSA, ECC, ChaCha20) and custom implementations, it’s nearly impossible for humans to analyze and identify algorithms at scale.
4. **Hidden Weaknesses**: Even strong algorithms can have weak implementations or configurations, which are difficult to detect without advanced pattern recognition.

## 🎯 The Goal

This project aims to address these challenges by developing an **AI/ML-based system** that can automatically identify cryptographic algorithms from modern cryptographic datasets. By leveraging machine learning, the system will:
- Analyze data patterns and features to determine the algorithm used.
- Automate the identification process, reducing manual effort and human error.
- Provide insights into potential weaknesses in cryptographic implementations.
- Enhance the ability of security teams to respond to threats in real-time.

## 💡 Why This Is Hard

1. **Data Complexity**: Cryptographic datasets are highly complex, with patterns that are difficult to discern without advanced ML techniques.
2. **Algorithm Diversity**: Modern cryptography involves a wide range of algorithms, each with unique characteristics and implementations.
3. **Real-Time Requirements**: Identifying algorithms in real-world scenarios requires high accuracy and low latency, which is challenging to achieve.
4. **Adversarial Environments**: Attackers often obfuscate or modify cryptographic implementations to evade detection, making the problem even more complex.

## 🌍 Real-World Impact

This project has the potential to revolutionize cryptographic security by:
- Enabling faster and more accurate identification of cryptographic algorithms.
- Helping organizations detect and mitigate vulnerabilities in their systems.
- Providing a foundation for building smarter, AI-driven security tools.
- Contributing to the global effort to combat cybercrime and protect sensitive data.

---

By tackling this problem, we aim to bridge the gap between cryptography, machine learning, and cybersecurity, creating a tool that is both innovative and impactful in the real world.



# 📂 Presentation  
You can view the project presentation, some key points are discussed in this ppt regarding the project here:  

[View Presentation](https://docs.google.com/presentation/d/1HG2yGzrDRv5D98kzMdwgv0mOmoPEIMLZ/edit?usp=sharing&ouid=113623327821126759756&rtpof=true&sd=true)

## 🚀 Tech Stack  

Our project leverages a modern and scalable technology stack for both frontend and backend development, ensuring high performance, security, and maintainability.  

### **🖥 Frontend**  
- React with Vite for a fast and efficient development experience  
- Tailwind CSS and PostCSS for a responsive and modern UI  
- Aceternity UI and ShadCN for prebuilt UI components  
- Axios for API communication  
- Lucid React for enhanced UI elements  

### **🧠 Machine Learning**  
- Python-based Random Forest model for predictions  
- Required libraries for model training, evaluation, and inference  
- A dedicated predictor file for handling predictions  

### **🔐 Backend**  
- Spring Boot for a robust and scalable backend  
- JWT for secure authentication and authorization  
- Cryptographic libraries for data protection  
- Spring Security for enforcing security best practices  
- Additional dependencies to ensure a production-ready API  

This tech stack enables a seamless integration between frontend, backend, and machine learning components, ensuring a smooth user experience. 🚀  
```plaintext
Backend/
├── pom.xml
├── mvnw
├── mvnw.cmd
├── src/
│   ├── main/
│   │   ├── java/com/project/backend/
│   │   │   ├── BackendApplication.java
│   │   │   ├── Configurations/
│   │   │   │   ├── AppConfig.java
│   │   │   │   ├── WebSecurityConfig.java
│   │   │   ├── Controllers/
│   │   │   │   ├── AlgorithmController.java
│   │   │   │   ├── AuthController.java
│   │   │   │   ├── CryptographicDataController.java
│   │   │   │   ├── EncryptionController.java
│   │   │   │   ├── MLController.java
│   │   │   │   ├── UserController.java
│   │   │   ├── Entities/
│   │   │   │   ├── Algorithm.java
│   │   │   │   ├── AuthResponse.java
│   │   │   │   ├── CryptographicAlgorithm.java
│   │   │   │   ├── CryptographicData.java
│   │   │   │   ├── LoginRequest.java
│   │   │   │   ├── RefreshTokenRequest.java
│   │   │   │   ├── SignupRequest.java
│   │   │   │   ├── User.java
│   │   │   ├── ExceptionHandler/
│   │   │   │   ├── GlobalExceptionHandler.java
│   │   │   ├── Exceptions/
│   │   │   │   ├── BearerTokenNotFoundException.java
│   │   │   │   ├── InvalidJwtAccessToken.java
│   │   │   │   ├── InvalidJwtRefreshToken.java
│   │   │   ├── Filters/
│   │   │   │   ├── JwtAuthFilter.java
│   │   │   ├── Repositories/
│   │   │   │   ├── AlgorithmRepository.java
│   │   │   │   ├── CryptographicDataRepository.java
│   │   │   │   ├── UserRepository.java
│   │   │   ├── Services/
│   │   │   │   ├── AlgorithmService.java
│   │   │   │   ├── CryptographicDataService.java
│   │   │   │   ├── EncryptionService.java
│   │   │   │   ├── JwtService.java
│   │   │   │   ├── LoginService.java
│   │   │   │   ├── MLService.java
│   │   │   │   ├── RefreshService.java
│   │   │   │   ├── SignupService.java
│   │   │   │   ├── UserDetailsServiceImpl.java
│   │   │   │   ├── UserService.java
│   │   ├── resources/
│   │   │   ├── application.properties
│   │   │   ├── data.sql
│   │   │   ├── scripts/
│   │   │   │   ├── model.pickle
│   │   │   │   ├── predict.py
│   ├── test/
│   │   ├── java/com/project/backend/
│   │   │   ├── BackendApplicationTests.java
_______________________________________________________________________________
Frontend/
├── src/
│   ├── components/        # Reusable UI components
│   ├── lib/               # Utility functions or external libraries
│   ├── ui/                # UI pages and layout components
│   │   ├── Dashboard.tsx              # Dashboard page
│   │   ├── DocumentationPage.tsx       # Documentation page
│   │   ├── History.tsx                 # History page
│   │   ├── HistoryListItem.tsx         # History list item component
│   │   ├── LandingPage.tsx             # Landing page
│   │   ├── Layout.tsx                  # Main layout wrapper
│   │   ├── Login.tsx                   # Login page
│   │   ├── ProfilePage.tsx             # User profile page
│   │   ├── SignUp.tsx                  # Sign-up page
│   ├── App.css            # Global styles for the App component
│   ├── App.tsx            # Main application component
│   ├── index.css          # Global styles
│   ├── main.tsx           # Entry point of the React app
│   ├── types.ts           # TypeScript type definitions
│   ├── vite-env.d.ts      # Vite environment types
```
# Relevant Diagrams for the project

### Use Case Diagram for the project
![Use case](https://github.com/razasoneji/CryptML/blob/main/Backend/images/UseCaseDiagram_final.png?raw=true)

### State Diagram for the project

![]()
![Class Diagram](https://github.com/razasoneji/CryptML/blob/main/Backend/images/Final_Class_Diagram.png?raw=true)


### Activity Diagram for the project

### Authentication Activity Diagram
![actovity Diagram](https://github.com/razasoneji/CryptML/blob/main/Backend/images/Final_Authentication_Activity.png?raw=true)


### Encryption Activity Diagram
![dsfsdf](https://github.com/razasoneji/CryptML/blob/main/Backend/images/Final_Encryption_Activity.png?raw=true)



### Prediction Activity Diagram 
![dsfsdf](https://github.com/razasoneji/CryptML/blob/main/Backend/images/Final_Prediction_Activity.png?raw=true)




### Sequence Diagram for the project


### Login Sequence Diagram 

![dsfdsfsdf](https://github.com/razasoneji/CryptML/blob/main/Backend/images/Final_login.png?raw=true)


### Refresh Sequence Diagram
![actovsdfity Diagram](https://github.com/razasoneji/CryptML/blob/main/Backend/images/Final_Refresh.png?raw=true)


### Signup Sequence Diagram
![dsfssdfdf](https://github.com/razasoneji/CryptML/blob/main/Backend/images/Final_Signup.png?raw=true)




### State Diagram for the project


### Prediction State Diagram
![dsfsdfssdfdf](https://github.com/razasoneji/CryptML/blob/main/Backend/images/State_Prediction_final.png?raw=true)

### Encrypting State Diagram 
![dsfdsdsffdsfsdf](https://github.com/razasoneji/CryptML/blob/main/Backend/images/State_Final_Encrypting.png?raw=true)



### User profile State Diagram
![dsfsdfssdfsdfsdfdf](https://github.com/razasoneji/CryptML/blob/main/Backend/images/State_User_Final_profile.png?raw=true)


### User Authentication State Diagram
![actovsdfitdsfyasdf Diagram](https://github.com/razasoneji/CryptML/blob/main/Backend/images/State_Final_UserAuthentication.png?raw=true)












