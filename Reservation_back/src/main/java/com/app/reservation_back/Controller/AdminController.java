package com.app.reservation_back.Controller;

import com.app.reservation_back.Service.ServiceUser;
import com.app.reservation_back.entites.AppUser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/")
public class AdminController {
    private final ServiceUser serviceUser;
    @GetMapping("getJoueur/{id}")
    public ResponseEntity<AppUser> getJoueur(@PathVariable int id) {
        // Example service call to fetch a Joueur object
        AppUser joueur = serviceUser.getAppUserById(id);

        if (joueur != null) {
            return ResponseEntity.ok(joueur);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PutMapping("update")
    public ResponseEntity<AppUser >update(@RequestBody AppUser updatedActeur){
        int id =updatedActeur.getId();
        AppUser existUser = serviceUser.getAppUserById(id);
        if (existUser.isEnabled()) {
            throw new RuntimeException("User is already activated");
        }

        // Activer l'utilisateur
        existUser.setEnabled(true);
        return new ResponseEntity<>(serviceUser.updateAppUser(updatedActeur),HttpStatus.OK);

    }
    @DeleteMapping("delete/{id}")
    public void deleteAppUser(@PathVariable int id) {
        serviceUser.deleteAppUserById(id);
    }


}
