import React, { useEffect, useState, useRef } from "react";
import Chart from 'chart.js/auto'; // npm install chart.js
import { useParams } from "react-router-dom";

function GenreMovieGraph() {
  const [genreData, setGenreData] = useState(null);
  const [genreNames, setGenreNames] = useState({});
  const { category } = useParams();
  const chartRef = useRef(null); // Ref to store the chart instance

  useEffect(() => {
    fetchMovieData()
      .then(data => setGenreData(extractGenres(data.results)))
      .catch(error => console.error('Error fetching movie data:', error));

    fetchGenreNames()
      .then(data => {
        const genreNamesMap = {};
        data.genres.forEach((genre: { id: string | number; name: any; }) => {
          genreNamesMap[genre.id] = genre.name;
        });
        setGenreNames(genreNamesMap);
      })
      .catch(error => console.error('Error fetching genre names:', error));
  }, [category]);

  const fetchMovieData = () => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${category}?api_key=04b66a2db2a7bac50ac1d74568e3579d`
    )
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch movie data');
        }
        return response.json();
      });
  };

  const fetchGenreNames = () => {
    return fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=04b66a2db2a7bac50ac1d74568e3579d`
    )
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch genre names');
        }
        return response.json();
      });
  };

  const extractGenres = (movies: any[]) => {
    const genres = {};
    movies.forEach(movie => {
      movie.genre_ids.forEach(genreId => {
        genres[genreId] = (genres[genreId] || 0) + 1;
      });
    });
    return genres;
  };

  useEffect(() => {
    if (!genreData || !genreNames) return;

    const labels = Object.keys(genreData).map(id => genreNames[id]);
    const data = Object.values(genreData);

    // Check if a chart instance exists
    if (chartRef.current) {
      // Destroy the existing chart
      chartRef.current.destroy();
    }

    // Render pie chart
    const ctx = document.getElementById('genreChart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Genres',
            data: data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)'
            ],
            borderWidth: 1
          }
        ]
      }
    });

    // Save the chart instance to the ref
    chartRef.current = chart;
  }, [genreData, genreNames, category]);

  return (
    <canvas id="genreChart" height="200" width="200" ></canvas>
    
  );
}

export default GenreMovieGraph;
