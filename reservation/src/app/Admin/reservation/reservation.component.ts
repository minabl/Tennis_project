import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../Services/reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})

export class ReservationComponent implements OnInit {
  reservations: any[] = []; 
  
    constructor(
      private reservationService: ReservationService,
      
    ) {}
    ngOnInit() {
      this.loadReservations();
      
      
    }
     // Charger les réservations existantes
  loadReservations() {
    this.reservationService.getReservations().subscribe(
      (data) => {
        this.reservations = data;
        //console.log(this.reservations);
      },
      (error) => {
        console.error('Erreur lors du chargement des réservations :', error);
      }
    );
  }
  deleteReservation(reservationId: number): void {
    // Filtrer la réservation à supprimer
    
    this.reservationService.deleteReservation(reservationId).subscribe((data) => {
      this.reservations = this.reservations.filter(res => res.id !== reservationId);
      this.loadReservations();
    })
    // Appeler une API ou un service pour la suppression réelle si nécessaire
    console.log(`Réservation avec ID ${reservationId} supprimée.`);
  }

}
