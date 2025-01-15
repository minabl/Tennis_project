package com.app.reservation_back.Controller;
import com.app.reservation_back.Repository.AppUserRepository;
import com.app.reservation_back.Repository.TerrainRepository;
import com.app.reservation_back.Service.ReservationServices;
import com.app.reservation_back.entites.Reservation;
import com.app.reservation_back.entites.Terrain;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/reservations")
public class ReservationController {

    private final ReservationServices reservationService;
    private final TerrainRepository terrainRepository;



    @PostMapping("/add")

    public ResponseEntity<String> createReservation(@RequestBody Reservation reservation) {
        try {
            reservationService.createRsv(reservation);
            return ResponseEntity.ok("Réservation effectuée avec succès.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erreur lors de la réservation : " + e.getMessage());
        }
    }
    /*
    public ResponseEntity<?> createReservation(@RequestBody Map<String, Object> reservationData) {
        try {
            // Récupérer les données depuis le JSON
            int terrainId = (int) reservationData.get("terrain");
            String reservedBy = (String) reservationData.get("reservedBy");
            String debutReservation = (String) reservationData.get("debutReservation");
            String finReservation = (String) reservationData.get("finReservation");

            // Charger le terrain
            Terrain terrain = terrainRepository.findById(terrainId)
                    .orElseThrow(() -> new IllegalArgumentException("Terrain non trouvé."));

            // Créer l'objet Reservation
            Reservation reservation = new Reservation();
            reservation.setTerrain(terrain);
            reservation.setJoueur(appUserRepository.findByUsername(reservedBy));
            reservation.setDebutReservation(LocalDateTime.parse(debutReservation));
            reservation.setFinReservation(LocalDateTime.parse(finReservation));

            Reservation savedReservation = reservationService.createRsv(reservation);
            return ResponseEntity.ok(savedReservation);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }*/

    /**/

    @GetMapping("/all")
    public ResponseEntity<List<Reservation>> getAllRsvs() {
        List<Reservation> rsvs = reservationService.findAllRsvs();
        return new ResponseEntity<>(rsvs, HttpStatus.OK);

    }


    @DeleteMapping("/delete/{id}")
    public void deleteRdv(@PathVariable int id) {
        reservationService.deleteRsv(id);
    }


}
