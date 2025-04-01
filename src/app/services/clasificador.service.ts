import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Calendar, Classification } from '../models/clasificador.model'; // Importa los modelos necesarios

@Injectable({
  providedIn: 'root'
})
export class ClasificadorService {

  constructor(private http: HttpClient) { }

  // Clasificar calendarios y guardar la clasificación
  classifyCalendars(busyThreshold?: number): Observable<{ message: string }> {
    let url = AuthService.apiUrl + 'clasificador/classify';
    if (busyThreshold !== undefined) {
      url += `?busyThreshold=${busyThreshold}`; // Si se pasa el threshold, lo añadimos como query param
    }
    return this.http.post<{ message: string }>(url, {}); // Llamada POST a la API para clasificar los calendarios
  }

  // Obtener la última clasificación registrada
  getLatestClassification(): Observable<Classification> {
    return this.http.get<Classification>(AuthService.apiUrl + 'clasificador/latest');
  }
}
