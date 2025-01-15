import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { Terrain } from '../../Models/Terrain';

@Injectable({
  providedIn: 'root'
})
export class TerrainService {

  private apiUrl = 'http://localhost:8080/api/terrain/'; // URL de l'API

  constructor(private http: HttpClient) {}

  getTerrains(): Observable<Terrain[]> {
    return this.http.get<Terrain[]>(this.apiUrl +"all");
}

}
