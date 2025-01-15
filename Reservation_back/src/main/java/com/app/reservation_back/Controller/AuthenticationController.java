package com.app.reservation_back.Controller;

import com.app.reservation_back.Service.ServiceUser;
import com.app.reservation_back.entites.AppUser;
import com.app.reservation_back.entites.Reservation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/")
public class AuthenticationController {
 private final ServiceUser serviceUser;

    @PostMapping("addUser")
    public ResponseEntity<AppUser> registerUser(@RequestBody AppUser user) {
        return ResponseEntity.ok(serviceUser.createAppUser(user));
    }
    @GetMapping("/all")
    public ResponseEntity<List<AppUser>> getAllAppUsers() {
        List<AppUser> AppUser = serviceUser.getAllAppUsers();
        return new ResponseEntity<>(AppUser, HttpStatus.OK);

    }


}

