import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { embedDashboard } from '@superset-ui/embedded-sdk';

/** 
 * Superset Service
 */
@Injectable({
  providedIn: 'root'
})
export class SupersetService {

  /**
   * API URL of Superset to send request
   */
  private apiUrl = 'https://domain.com/api/v1';

  /**
   * @param {HttpClient} http Http Client to send requests.
   */
  constructor(private http: HttpClient) { }

  /**
   * 
   * @returns { access token }
   */
  fetchAccessToken(): Observable<any> {
    const body = {
      "username": "guest",
      "password": "guest",
      "provider": "db",
      "refresh": false
    };

    const headers = new HttpHeaders({ "Content-Type": "application/json" });

    let accessToken = this.http.post<any>(`${this.apiUrl}/login`, body, { headers });
    console.log(accessToken);
    return accessToken;
  }

  csrfToken(accessToken: any): Observable<any> {
    const acc = accessToken["access_token"]; //accessToken is an object in which there are two tokens access_token and refresh_token ,out of which we just need to send access_token to get guest_token
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${acc}`,
    });
    let csrfToken = this.http.get<any>(`${this.apiUrl}/csrf_token/`, { headers });
    return csrfToken;
  }

  /**
   * 
   * @returns { guest token } using @param { accessToken }
   */
  fetchGuestToken(accessToken: any): Observable<any> {
    return new Observable((observable) => {
      this.csrfToken(accessToken).subscribe((csrf) => {
        const body = {
          "resources": [
            {
              "type": "dashboard",
              "id": "xxxxxxxxxxxxxxxxxxxxxxxx",
            }
          ],
          /**
           * rls: Row Level Security, this differs for client to client ,like what to show each client
           */
          "rls": [{ //role admin 
           
          }],
          "user": {
            "username": "guest",
            "first_name": "guest",
            "last_name": "guest",
          }
        };

        const acc = accessToken["access_token"]; //accessToken is an object in which there are two tokens access_token and refresh_token ,out of which we just need to send access_token to get guest_token
        const headers = new HttpHeaders({
          "Content-Type": "application/json",
          "Authorization": `Bearer ${acc}`,
          "X-CSRFToken": csrf["result"],
        });

        //guest_token URL should end with forward_slash(/)
        let token = this.http.post<any>(`${this.apiUrl}/guest_token/`, body, { headers });
        observable.next(token);
        observable.complete();
      })
    });
  }
  /**
   * 
   * @returns { guest Token }
   */
  getGuestToken(): Observable<any> {
    return this.fetchAccessToken().pipe(
      catchError((error) => {
        console.error(error);
        return throwError(error);
      }),
      switchMap((accessToken: any) => this.fetchGuestToken(accessToken))
    );
  }
  /**
   * 
   * @returns { dashboard }
   */
  embedDashboard(): Observable<any> {
    return new Observable((observer) => {

      this.getGuestToken().subscribe(
        (token) => {
          embedDashboard({
            id: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 
            supersetDomain: 'https://domain.com',
            mountPoint: document.getElementById('dashboard') as HTMLElement,
            fetchGuestToken: () => token["token"],
            dashboardUiConfig: {
              hideTitle: true,
              hideChartControls: true,
              hideTab: true,
            },
          });
          observer.next();
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }
}