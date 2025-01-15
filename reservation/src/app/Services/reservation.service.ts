import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:8080/api/reservations';

  constructor(private http: HttpClient) {}

  getReservations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl +"/all");
  }

  createReservation(reservation: any): Observable<any> {
    //console.log(reservation)
    return this.http.post<any>(this.apiUrl +"/add", reservation);
}
deleteReservation(id: any): Observable<any> {
  //console.log(reservation)
  return this.http.delete<any>(this.apiUrl +"/delete/"+id );
}

}