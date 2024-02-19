import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [FormsModule, CommonModule,HttpClientModule],
  providers:[WeatherService],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent {
  city: string = '';
  weatherData: any = null;
  weatherImages: any = {
    'Clear': 'https://www.seekpng.com/png/detail/51-512729_vector-sun-sunny-weather-symbol-transparent.png',
    'Clouds': 'https://whatemoji.org/wp-content/uploads/2020/07/Cloud-Emoji-768x768.png',
    'Rain': 'https://cdn3.iconfinder.com/data/icons/spring-2-1/30/Rain-1024.png',
    'Thunderstorm': 'https://cdn3.iconfinder.com/data/icons/disaster-and-weather-conditions/48/34-1024.png',
    'Snow': 'https://cdn2.iconfinder.com/data/icons/weather-119/512/weather-6-1024.png',
    'Mist': 'https://cdn0.iconfinder.com/data/icons/weather-346/64/fog-weather-mist-1024.png'
  };
  constructor(private weatherService: WeatherService) { }

  getWeather(): void {
    this.weatherService.getCurrentWeather(this.city)
      .subscribe((data: any) => {
        this.weatherData = data;
      });
  }
}
