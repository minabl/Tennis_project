package com.app.reservation_back.Service;

import com.app.reservation_back.Repository.AppUserRepository;
import com.app.reservation_back.Repository.ReservationRepository;
import com.app.reservation_back.Repository.TerrainRepository;
import com.app.reservation_back.entites.AppUser;
import com.app.reservation_back.entites.Reservation;
import com.app.reservation_back.entites.Terrain;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.time.Duration;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReservationServices implements IServiceReservation{
    private final ReservationRepository reservationRepository;
    private final ServiceUser serviceUser;
    private final TerrainRepository terrainRepository;
    @Override
    public Reservation createRsv(Reservation reservation) {
        if (reservation.getTerrain() == null || reservation.getTerrain().getId() == 0) {
            throw new IllegalArgumentException("Le terrain est obligatoire.");
        }

        if (reservation.getJoueur() == null || reservation.getJoueur().getUsername() == null) {
            throw new IllegalArgumentException("Le joueur est obligatoire.");
        }

        // Charger le terrain depuis la base
        Terrain terrain = terrainRepository.findById(reservation.getTerrain().getId())
                .orElseThrow(() -> new IllegalArgumentException("Terrain non trouvé."));

        // Charger le joueur depuis la base
        AppUser joueur = serviceUser.LoadUserByUserName(reservation.getJoueur().getUsername());
        if (joueur == null) {
            throw new IllegalArgumentException("Utilisateur non trouvé.");
        }

        // Associer le terrain et le joueur à la réservation
        reservation.setTerrain(terrain);
        reservation.setJoueur(joueur);

        // Vérifier la validité de la durée de réservation
        long duree = Duration.between(reservation.getDebutReservation(), reservation.getFinReservation()).toHours();
        if (duree < 1 || duree > 4) {
            throw new IllegalArgumentException("La durée doit être comprise entre 1 et 4 heures.");
        }

        // Vérifier les conflits de réservation
        List<Reservation> overlappingReservations = reservationRepository.findOverlappingReservations(
                terrain,
                reservation.getDebutReservation(),
                reservation.getFinReservation()
        );

        if (!overlappingReservations.isEmpty()) {
            throw new IllegalStateException("Le terrain est déjà réservé pendant cette période.");
        }

        // Enregistrer la réservation
        return reservationRepository.save(reservation);
    }


    /*
    public Reservation createRsv(Reservation reservation) {
        if (reservation.getTerrain() == null || reservation.getTerrain().getId() == 0) {
            throw new IllegalArgumentException("Le terrain est obligatoire.");
        }

        // Charger le terrain depuis la base
        Terrain terrain = terrainRepository.findById(reservation.getTerrain().getId())
                .orElseThrow(() -> new IllegalArgumentException("Terrain non trouvé."));

        reservation.setTerrain(terrain); // Associer le terrain à la réservation

        // Vérifier la durée de la réservation
        long duree = Duration.between(reservation.getDebutReservation(), reservation.getFinReservation()).toHours();
        if (duree < 1 || duree > 4) {
            throw new IllegalArgumentException("La durée doit être entre 1 et 4 heures.");
        }

        // Vérifier les conflits de réservation
        List<Reservation> overlappingReservations = reservationRepository.findOverlappingReservations(
                terrain,
                reservation.getDebutReservation(),
                reservation.getFinReservation()
        );

        if (!overlappingReservations.isEmpty()) {
            throw new IllegalStateException("Le terrain est déjà réservé pendant cette période.");
        }

        return reservationRepository.save(reservation);
    }*/

    public Reservation findReservationById(int id) {
        return reservationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Réservation non trouvée."));
    }
    @Override
    public Reservation findRsvById(int id) {
        return reservationRepository.findById(id).get();
    }

    @Override
    public List<Reservation> findAllRsvs() {
        return reservationRepository.findAll();
    }

    @Override
    public Reservation updateRsv(Reservation rsv) {
        return reservationRepository.save(rsv);
    }

    @Override
    public void deleteRsv(int id) {
        reservationRepository.deleteById(id);

    }
}
