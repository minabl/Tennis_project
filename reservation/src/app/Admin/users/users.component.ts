import { UserService } from './../../Services/User/user.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

   Joueurs: any[] = []; 
   selectedJoueur: any = null; // Joueur sélectionné pour modification
  isEditing: boolean = false; // Indicateur pour savoir si on est en mode édition
    
      constructor(
        private UserService: UserService,
       
        
      ) {}

      ngOnInit() {
        this.loadReservations();
        
        
      }
      loadReservations() {
        this.UserService.getJoueurs().subscribe(
          (data: any) => {
            this.Joueurs = data;
      
            // Exemple de filtre : filtrer les joueurs dont le nom contient "John"
            this.Joueurs = this.Joueurs.filter((joueur: any) => joueur.role.includes('JOUEUR'));
      
            // Vous pouvez ajouter d'autres critères ici si nécessaire
            // Par exemple, filtrer par statut
            // this.Joueurs = this.Joueurs.filter((joueur: any) => joueur.statut === 'actif');
      
            console.log(this.Joueurs);
          },
          (error: any) => {
            console.error('Erreur lors du chargement des joueurs :', error);
          }
        );
      }

      // Ouvrir le modal d'édition
  // Ouvrir le formulaire d'édition
  editJoueur(joueur: any) {
    this.selectedJoueur = { ...joueur }; // Cloner les données du joueur sélectionné
    this.isEditing = true; // Afficher le formulaire
  }

  // Soumettre la modification de l'état "enabled" // Soumettre la modification de l'état "enabled"
  submitEdit() {
    this.UserService.UpdateJoueurs(this.selectedJoueur).subscribe(
      (response: any) => {
        // Mettez à jour la liste des joueurs après la modification
        const index = this.Joueurs.findIndex(j => j.id === this.selectedJoueur.id);
        if (index !== -1) {
          this.Joueurs[index] = { ...this.selectedJoueur };
        }
        this.isEditing = false; // Cacher le formulaire après modification
      },
      (error: any) => {
        console.error('Erreur lors de la mise à jour du joueur :', error);
      }
    );
  }

  // Annuler l'édition
  cancelEdit() {
    this.isEditing = false; // Cacher le formulaire sans enregistrer
  }
  // Supprimer un joueur
  supprimer(joueurId: number) {
    this.UserService.deleteJoueur(joueurId).subscribe(
      (response: any) => {
        this.Joueurs = this.Joueurs.filter(j => j.id !== joueurId); // Met à jour la liste des joueurs
        this.loadReservations();
      },
      (error: any) => {
        console.error('Erreur lors de la suppression du joueur :', error);
      }
    );
  }
      
}
