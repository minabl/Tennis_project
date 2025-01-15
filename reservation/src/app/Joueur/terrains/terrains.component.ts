import { Component, OnInit } from '@angular/core';
import { TerrainService } from '../../Services/Terrains/terrain.service';

@Component({
  selector: 'app-terrains',
  templateUrl: './terrains.component.html',
  styleUrl: './terrains.component.css'
})
export class TerrainsComponent implements OnInit{

  produits:any[]=[];
  cartProduits:any[]=[];
  categorie:any[]=[];
  keyword:any;
  terrains: any[] = []; 
  
  constructor( private terrainService: TerrainService ) { }

  ngOnInit(): void {
    this.loadTerrains();
  }

 // Charger la liste des terrains
 loadTerrains() {
  this.terrainService.getTerrains().subscribe(
    (data) => {
      this.terrains = data;
      console.log(this.terrains);
    },
    (error) => {
      console.error('Erreur lors du chargement des terrains :', error);
    }
  );
}

addToCart(event: any) {
  const cartData = localStorage.getItem("cart");
  if (cartData !== null) {
    this.cartProduits = JSON.parse(cartData);
  } else {
    this.cartProduits = [];
  }
  
  let exist = this.cartProduits.find((item: any) => item.item.id == event.item.id);
  if (exist) {
    alert("Product is already in your cart");
  } else {
    this.cartProduits.push(event);
    localStorage.setItem("cart", JSON.stringify(this.cartProduits));
  }
}

}
