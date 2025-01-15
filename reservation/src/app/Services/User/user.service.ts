import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { StatsService } from '../Status/stats.service';
import Cookies from 'js-cookie';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  
 
  Url ='http://localhost:8080/'; 
  constructor( private http :HttpClient,
    private state:StatsService,

    private router: Router 
  
  ) { 
    const accessToken = Cookies.get('accessToken');
      if (accessToken) {
        let jwt: any = jwtDecode(accessToken);
        this.state.authState.token = accessToken;
        this.state.authState.isLoggedIn = true;
        this.state.authState.UserEmail = jwt.sub;
        this.state.authState.authorities = jwt.scope;
        
      
        
      }
  }




async login(loginRequest: any) {
  try {
    const params = new HttpParams()
      .set('username', loginRequest.username)
      .set('password', loginRequest.password);

    const user: any = await firstValueFrom(
      this.http.post(this.Url + 'auth/login', {}, { params })
    );
    console.log(user);

    if (user.access_token) {
      let jwt: any = jwtDecode(user.access_token);
      this.state.authState.token = user.access_token;
      this.state.authState.isLoggedIn = true;
      this.state.authState.UserEmail = jwt.sub;
      this.state.authState.authorities = jwt.scope;
      console.log(this.state.authState);

      // Stockage dans un cookie
      Cookies.set('accessToken', user.access_token, { expires: 7, secure: true, sameSite: 'Strict' });

      return Promise.resolve(true);
    } else {
      return Promise.reject('En attente de accès administrateur');
    }
  } catch (e) {
    console.error(e); // Ajoutez ceci pour mieux diagnostiquer
    return Promise.reject('En attente de accès administrateur');
  }
}

  addUser(data: any): Observable<any>  {
    return this.http.post<any>(this.Url+"api/addUser",data)
  }
  getJoueurs(): Observable<any[]> {
    return this.http.get<any[]>(this.Url +"api/all");
  }
  deleteJoueur(joueurId: number): Observable<any> {
    //console.log(reservation)
    return this.http.delete<any>(this.Url +"admin/delete/"+joueurId );
  }
  UpdateJoueurs(formdata:any): Observable<any>{
    
    return this.http.put<any>(this.Url+"admin/update",formdata)
  }
  // Fonction de logout
   // Fonction de logout
   logout() {
    // Supprimer le token du cookie
    Cookies.remove('accessToken');
    
    // Réinitialiser l'état de l'utilisateur dans l'application
    this.state.authState.token = '';
    this.state.authState.isLoggedIn = false;
    this.state.authState.UserEmail = '';
    this.state.authState.authorities = [];

    // Rediriger vers la page de connexion
    this.router.navigate(['/login']);
  }
 
  
  
}


