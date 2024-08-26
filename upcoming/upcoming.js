// AFFICHER CONTENU QUAND HTML CHARGEE COMPLETEMENT 
document.addEventListener("DOMContentLoaded", function () {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZmI3ZDYxYzUyODNmZmMyYTgzYTU4NGMzNWY1NTk5OCIsIm5iZiI6MTcyMTMxMjc3Mi4wNjg5MDksInN1YiI6IjY2OTc3ODUxMDE3NzNmMTEzNTY4MTc4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gdJ8F0N4ei7sqy4sqEFP0d3twCbtfMvrd5jHpxMcEgE'
        }
    };

    fetch('https://api.themoviedb.org/3/movie/upcoming?language=fr-US&page=1', options)
        .then(response => response.json())
        .then(data => {

            // Affiche les données de l'API dans la console
            console.log("Données de l'API :", data);

            // Vérifie si 'results' est défini
            if (data.results && Array.isArray(data.results)) {


                // Obtenir les références aux éléments HTML pour le conteneur des films et le sélecteur de filtre
                const moviesContainer = document.getElementById('movies-container');
                const filterSelect = document.getElementById('filter');


                // Stocker les films récupérés de l'API
                let movies = data.results;

                // Fonction pour afficher les films dans le conteneur
                const renderMovies = (movies) => {

                    // Vider le conteneur avant de le remplir avec les films triés
                    moviesContainer.innerHTML = '';


                    // Parcourir chaque film  et créer les éléments HTML correspondants
                    movies.forEach(movie => {

                        // Créer un conteneur pour chaque film
                        const movieDiv = document.createElement('div');
                        movieDiv.classList.add('movie-info');

                        // Créer et ajouter les éléments pour chaque film
                        const title = document.createElement('h2');
                        title.textContent = movie.title;

                        // IMAGE
                        const poster = document.createElement('img');
                        poster.src = `https://image.tmdb.org/t/p/w185${movie.poster_path}`;
                        poster.alt = `Poster of ${movie.title}`;

                        // DESCRIPTION 
                        const overview = document.createElement('p');
                        overview.textContent = movie.overview;
                        // LANGUE ORIGINALE
                        const originalLanguage = document.createElement('p');
                        originalLanguage.innerHTML = `<strong>Langue d'origine : </strong> ${movie.original_language}`;

                        // DATE DE SORTIE
                        const releaseDate = document.createElement('p');
                        releaseDate.innerHTML = `<strong>Date de sortie : </strong>${movie.release_date}`;


                        // Ajouter les éléments au conteneur du film
                        movieDiv.appendChild(title);
                        movieDiv.appendChild(poster);
                        movieDiv.appendChild(overview);
                        movieDiv.appendChild(originalLanguage);
                        movieDiv.appendChild(releaseDate);

                        // Ajouter le conteneur du film au conteneur principal
                        moviesContainer.appendChild(movieDiv);
                    });
                };

                // Fonction pour trier les films en fonction du critère sélectionné
                const sortMovies = (criteria) => {
                    switch (criteria) {
                        case 'name-asc':
                            movies.sort((a, b) => a.title.localeCompare(b.title));
                            break;
                        case 'name-desc':
                            movies.sort((a, b) => b.title.localeCompare(a.title));
                            break;
                        case 'date-asc':
                            movies.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
                            break;
                        case 'date-desc':
                            movies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
                            break;
                        default:
                            break;
                    }
                    // Appeler la fonction pour afficher les films triés
                    renderMovies(movies);
                };


                // Ajouter un écouteur d'événements pour détecter les changements dans le sélecteur de filtre
                filterSelect.addEventListener('change', (event) => {


                    // Trier les films en fonction de la valeur sélectionnée
                    sortMovies(event.target.value);
                });


                // Afficher les films récupérés de l'API pour la première fois
                renderMovies(movies);

            } else {

                // Afficher une erreur si les résultats de l'API ne contiennent pas de tableau de films
                console.error("Les données de l'API ne contiennent pas de 'results' ou 'results' n'est pas un tableau.");
            }
        })
        .catch(error => {

            // Afficher une erreur en cas d'échec de la requête fetch
            console.error("Erreur lors de la récupération des données de l'API :", error);
        });
});