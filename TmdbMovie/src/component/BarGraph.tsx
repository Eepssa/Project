import React, { useEffect, useState } from "react";
import Chart from 'chart.js/auto';
import { useParams } from "react-router-dom";

function GenreGraph() {
  const [genreData, setGenreData] = useState(null);
  const [genreNames, setGenreNames] = useState({});
  const { category } = useParams();

  useEffect(() => {
    const fetchTvShowData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${category}?api_key=04b66a2db2a7bac50ac1d74568e3579d`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch TV show data');
        }
        const data = await response.json();
        const genres = extractGenres(data.results);
        setGenreData(genres);
      } catch (error) {
        console.error('Error fetching TV show data:', error);
      }
    };

    const fetchGenreNames = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/tv/list?api_key=04b66a2db2a7bac50ac1d74568e3579d`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch genre names');
        }
        const data = await response.json();
        const genreNamesMap = {};
        data.genres.forEach(genre => {
          genreNamesMap[genre.id] = genre.name;
        });
        setGenreNames(genreNamesMap);
      } catch (error) {
        console.error('Error fetching genre names:', error);
      }
    };

    fetchTvShowData();
    fetchGenreNames();
  }, [category]);

  const extractGenres = (tvShows: any[]) => {
    const genres = {};
    tvShows.forEach(tvShow => {
      tvShow.genre_ids.forEach(genreId => {
        if (genres[genreId]) {
          genres[genreId]++;
        } else {
          genres[genreId] = 1;
        }
      });
    });
    return genres;
  };

  useEffect(() => {
    if (!genreData || !genreNames) return;

    const labels = Object.keys(genreData).map(id => genreNames[id]);
    const data = Object.values(genreData);

    // Render bar graph
    const ctx = document.getElementById('genreChart').getContext('2d');
    // Destroy the existing chart before rendering a new one
    if (window.genreBarChart) {
      window.genreBarChart.destroy();
    }
    window.genreBarChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Genres',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true, // Make the chart responsive
        maintainAspectRatio: false, // Disable aspect ratio to adjust the size freely
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }, [genreData, genreNames]);

  return (
    <canvas id="genreChart" width="400" height="200"></canvas>
  );
}

export default GenreGraph;