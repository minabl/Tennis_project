package com.app.reservation_back.Repository;

import com.app.reservation_back.entites.AppUser;
import com.app.reservation_back.entites.Reservation;
import com.app.reservation_back.entites.Terrain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation,Integer> {
    @Query("SELECT r FROM Reservation r WHERE r.terrain = :terrain " +
            "AND (:start < r.finReservation AND :end > r.debutReservation)")
    List<Reservation> findOverlappingReservations(
            @Param("terrain") Terrain terrain,
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end
    );
    List<Reservation> findByTerrainAndDebutReservationBetween(
            Terrain terrain,
            LocalDateTime debutReservation,
            LocalDateTime finReservation
    );

}
