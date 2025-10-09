
const url = '../php/unload.php'; // Pfad zu deiner PHP-Datei
// Array, in dem du die Daten speichern willst

let genresEntwicklung = [
    {
        name: "Country", color: "#0bb882", dates:
            [
                { datum: "2025-10-08", anzahl: 47 },
                { datum: "2025-10-09", anzahl: 21 },
                { datum: "2025-10-10", anzahl: 54 },
                { datum: "2025-10-11", anzahl: 23 }
            ]
    },
    {
        name: "Rock", color: "#ce97ab", dates:
            [
                { datum: "2025-10-08", anzahl: 87 },
                { datum: "2025-10-09", anzahl: 33 },
                { datum: "2025-10-10", anzahl: 0 },
                { datum: "2025-10-11", anzahl: 17 }
            ]
    },
    {
        name: "Pop", color: "#7262ad", dates:
            [
                { datum: "2025-10-08", anzahl: 61 },
                { datum: "2025-10-09", anzahl: 24 },
                { datum: "2025-10-10", anzahl: 8 },
                { datum: "2025-10-11", anzahl: 32 }
            ]
    }];

let weatherLastWeek = [
    {
        datum: "2025-09-29",
        temperatur_min: 6.7,
        temperatur_max: 14.8,
        bewoelkung: 84,
        niederschlagsmenge: 0.4,
        schneefall: 0
    },
    {
        datum: "2025-09-30",
        temperatur_min: 5.4,
        temperatur_max: 10.1,
        bewoelkung: 99,
        niederschlagsmenge: 0.0,
        schneefall: 0
    },
    {
        datum: "2025-10-01",
        temperatur_min: 8.1,
        temperatur_max: 17.2,
        bewoelkung: 24,
        niederschlagsmenge: 0.0,
        schneefall: 0
    },
    {
        datum: "2025-10-02",
        temperatur_min: 7.5,
        temperatur_max: 16.9,
        bewoelkung: 0,
        niederschlagsmenge: 0.0,
        schneefall: 0
    },
    {
        datum: "2025-10-03",
        temperatur_min: 4.5,
        temperatur_max: 12.3,
        bewoelkung: 90,
        niederschlagsmenge: 2.8,
        schneefall: 0
    },
    {
        datum: "2025-10-04",
        temperatur_min: 4.8,
        temperatur_max: 11.8,
        bewoelkung: 92,
        niederschlagsmenge: 4.5,
        schneefall: 0
    },
    {
        datum: "2025-10-05",
        temperatur_min: 0.1,
        temperatur_max: 2.3,
        bewoelkung: 100,
        niederschlagsmenge: 0.1,
        schneefall: 2.5
    }
];

let topGenres = ["Country", "Rock", "Pop", "Hip Hop", "Indie"];

let genresWeather = [
    {
        genre: "Country",
        weatherData: [
            {
                datum: "2025-10-02",
                temperatur_min: 7.5,
                temperatur_max: 16.9,
                bewoelkung: 0,
                niederschlagsmenge: 0.0,
                schneefall: 0
            },
            {
                datum: "2025-09-30",
                temperatur_min: 5.4,
                temperatur_max: 10.1,
                bewoelkung: 99,
                niederschlagsmenge: 0.0,
                schneefall: 0
            },
            {
                datum: "2025-10-01",
                temperatur_min: 8.1,
                temperatur_max: 17.2,
                bewoelkung: 24,
                niederschlagsmenge: 0.0,
                schneefall: 0
            }
        ]
    },
    {
        genre: "Rock",
        weatherData: [
            {
                datum: "2025-10-03",
                temperatur_min: 4.5,
                temperatur_max: 12.3,
                bewoelkung: 90,
                niederschlagsmenge: 2.8,
                schneefall: 0
            },
            {
                datum: "2025-10-04",
                temperatur_min: 4.8,
                temperatur_max: 11.8,
                bewoelkung: 92,
                niederschlagsmenge: 4.5,
                schneefall: 0
            },
            {
                datum: "2025-10-05",
                temperatur_min: 0.1,
                temperatur_max: 2.3,
                bewoelkung: 100,
                niederschlagsmenge: 0.1,
                schneefall: 2.5
            }
        ]
    },
    {
        genre: "Pop",
        weatherData: [
            {
                datum: "2025-10-03",
                temperatur_min: 4.5,
                temperatur_max: 12.3,
                bewoelkung: 90,
                niederschlagsmenge: 2.8,
                schneefall: 0
            },
            {
                datum: "2025-10-04",
                temperatur_min: 4.8,
                temperatur_max: 11.8,
                bewoelkung: 92,
                niederschlagsmenge: 4.5,
                schneefall: 0
            },
            {
                datum: "2025-10-01",
                temperatur_min: 8.1,
                temperatur_max: 17.2,
                bewoelkung: 24,
                niederschlagsmenge: 0.0,
                schneefall: 0
            }
        ]
    }
];

async function loadWeatherData() {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Fehler beim Laden der Daten");
            }
            return response.json(); // Antwort in JS-Objekte umwandeln
        })
        .then(data => {
            return data; // Daten im Array speichern
        })
        .catch(error => {
            console.error("Fehler:", error);
        });

    try {
        const response = await fetch(url);
        const answer = await response.json();
        return answer;
    } catch (error) {
        console.error(error);
        return false;
    }
}

let wetterDaten = await loadWeatherData();
let temperaturenMin = [];
let temperaturenMax = [];
let tage = [];

wetterDaten.forEach(data => {
    temperaturenMin.push(data.temperatur_min);
    temperaturenMax.push(data.temperatur_max);
    tage.push(data.datum);

});


let datasets = [];

genresEntwicklung.forEach(genre => {
    let anteile = [];
    genre.dates.forEach(date => {
        anteile.push(date.anzahl);
    });

    datasets.push({
        label: genre.name,
        data: anteile,
        borderColor: genre.color,
        backgroundColor: genre.color
    });
});

console.log(temperaturenMin);
console.log(temperaturenMax);
console.log(tage);

let daten = [];
genres[0].dates.forEach(date => {
    daten.push(date.datum);
});

const labels = daten;
const data = {
    labels: labels,
    datasets: datasets
};

const config = {
    type: 'line',
    data: data,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Wetterdaten'
            }
        }
    },
};

let myChart = document.querySelector("#sampleChart");

const chart = new Chart(myChart, config);