import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
private apiKey = 'a9b5869cd05d313d1f5559ceb1665400';

constructor(private http: HttpClient) { }

getCurrentWeather(city: string): Observable<any> {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`;
  return this.http.get(apiUrl);
}
} 

