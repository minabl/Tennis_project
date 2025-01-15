import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TerrainService } from '../../Services/Terrains/terrain.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-car-terrain',
  templateUrl: './car-terrain.component.html',
  styleUrl: './car-terrain.component.css'
})
export class CarTerrainComponent {
  @Input()data:any=[] //pour envoyer de donne mel child --> parent
  @Output() item = new EventEmitter()//pour envoyer de donne mel parent --> child
 
  constructor(private terrainService: TerrainService, private router: Router) { }

  ngOnInit(): void {
  }
  reserver() {
    const hashedId = CryptoJS.AES.encrypt(this.data.id.toString(), 'secret-key').toString(); // Hasher l'ID
  this.router.navigate(['/privee/reservation', hashedId]);  // Redirection vers /reservation avec l'ID
  }

  

}
