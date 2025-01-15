package com.app.reservation_back.Service;

import com.app.reservation_back.entites.AppUser;
import com.app.reservation_back.entites.Reservation;

import java.time.LocalDate;
import java.util.List;

public interface IServiceReservation {
    Reservation createRsv(Reservation rsv);
    Reservation findRsvById(int id);
    List<Reservation> findAllRsvs();
    Reservation updateRsv(Reservation rsv);
    void deleteRsv(int id);
    //public List<Reservation> getRsvByDate(LocalDate date) ;
}
