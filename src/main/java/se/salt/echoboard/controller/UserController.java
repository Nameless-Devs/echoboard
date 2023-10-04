package se.salt.echoboard.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import se.salt.echoboard.model.EchoBoardUser;

@RestController
@RequestMapping("api/user")
@CrossOrigin("*")
public class UserController {

    @GetMapping
    public ResponseEntity<EchoBoardUser> getAuthenticatedUser(){
        EchoBoardUser user = EchoBoardUser.builder().name("Mikey Tester")
                .id(12345)
                .email("mikey.mike@gmail.com")
                .picture("https://lh3.googleusercontent.com/a/ACg8ocLAWnojfjPfMGVFs7PIJYrZjGtH_c4uHmIKOzXW29NT=s96-c")
                        .build();
        return ResponseEntity.ok(user);
    }

}
