import { Component, OnInit } from '@angular/core';
import { format } from 'date-fns'; // Importation pour le formatage des dates
import { ReservationService } from '../Services/reservation.service';
import { TerrainService } from '../Services/Terrains/terrain.service';
import { StatsService } from '../Services/Status/stats.service';
import { ActivatedRoute } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-reservation-calendar',
  templateUrl: './reservation-calendar.component.html',
  styleUrls: ['./reservation-calendar.component.css'],
})
export class ReservationCalendarComponent implements OnInit {
  terrains: any[] = []; // Liste des terrains
  reservations: any[] = []; 
  dureeOptions = [1, 2, 3, 4]; // Options disponibles pour la durée (en heures)
  reservation = {
    terrainId: null as number | null,
    reservedBy: '',
    debutReservation: '',
    finReservation: '',
    duree: 1 // Par défaut, 1 heure
  };

  constructor(
    private reservationService: ReservationService,
    private terrainService: TerrainService,
    private stats: StatsService,
    private route: ActivatedRoute 
  ) {}

  ngOnInit() {

    const hashedId = this.route.snapshot.paramMap.get('id');
  const bytes = CryptoJS.AES.decrypt(hashedId!, 'secret-key');
  const terrainIdFromRoute = bytes.toString(CryptoJS.enc.Utf8);
    //const terrainIdFromRoute = this.route.snapshot.paramMap.get('id');
  if (terrainIdFromRoute) {
    this.reservation.terrainId = +terrainIdFromRoute; // Convertir en nombre si nécessaire
    console.log('Terrain ID from route:', this.reservation.terrainId);
  }
    this.loadTerrains();
    this.initializeReservation();
    this.loadReservations();
    
    
  }
  calculateEndDate() {
    if (this.reservation.debutReservation && this.reservation.duree) {
      const debut = new Date(this.reservation.debutReservation);
      
  
      // Formater la date de fin en `yyyy-MM-dd HH:mm:ss`
      this.reservation.finReservation = format(debut.setHours(debut.getHours() + this.reservation.duree), 'yyyy-MM-dd HH:mm:ss');
    }
  }

  // Initialiser les données par défaut
  initializeReservation() {
    this.reservation.reservedBy = this.stats.authState.UserEmail || ''; // Pré-remplissage du nom
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

 // Charge les terrains
loadTerrains() {
  this.terrainService.getTerrains().subscribe(
    (data) => {
      this.terrains = data;
      // Vérifier si l'ID du terrain sélectionné existe parmi les terrains chargés
      if (this.reservation.terrainId) {
        const terrain = this.terrains.find(t => t.id === this.reservation.terrainId);
        if (!terrain) {
          alert("Le terrain sélectionné n'existe pas.");
          this.reservation.terrainId = null; // Réinitialiser si le terrain n'existe pas
        }
      }
      console.log('Terrains chargés:', this.terrains);
    },
    (error) => {
      console.error('Erreur lors du chargement des terrains :', error);
    }
  );
}


  // Soumettre une réservation
  submitReservation() {
    // Vérifiez que l'ID du terrain est défini avant de construire le payload
    if (!this.reservation.terrainId) {
      alert('Veuillez sélectionner un terrain.');
      return;
    }
    this.reservation.debutReservation = format(new Date(this.reservation.debutReservation), 'yyyy-MM-dd HH:mm:ss');

    const payload = {
      terrain:{ id: this.reservation.terrainId }, // Utilisez directement l'ID du terrain
      joueur: { username: this.reservation.reservedBy },
      debutReservation: this.reservation.debutReservation,
      finReservation: this.reservation.finReservation,
    };

    console.log('Payload envoyé au back-end:', payload);

   this.reservationService.createReservation(payload).subscribe(
      (response) => {
        console.log('Réservation créée avec succès :', response);
        //alert('Réservation effectuée avec succès.');
        this.loadReservations(); // Recharge les réservations après la création
      },
      (error) => {
        console.error('Erreur lors de la création de la réservation :', error);
    
      }
    );
  }
}
