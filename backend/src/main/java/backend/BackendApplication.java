package backend;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("*").allowedMethods("*").allowedHeaders("*");
            }
        };
    }

    @Autowired
    private UserRepository userRepository;

    public void executeProcesses() {
        
        Thread processo1Thread = new Thread(new Process(userRepository));
        Thread processo2Thread = new Thread(new Process2(userRepository));

        
        processo1Thread.start();
        processo2Thread.start();
    }
    public static class Process implements Runnable {
        private UserRepository userRepository;

        public Process(UserRepository userRepository) {
            this.userRepository = userRepository;
        }

        public void run() {
           
            List<User> users = userRepository.findAll();
        
        }
    }


    public static class Process2 implements Runnable {
        private UserRepository userRepository;

        public Process2(UserRepository userRepository) {
            this.userRepository = userRepository;
        }

        public void run() {
            
            User existingUser = userRepository.findByEmail("example@example.com");
            
        }
    }
}
