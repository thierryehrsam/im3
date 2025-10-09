
const url = '../php/unload.php'; // Pfad zu deiner PHP-Datei
// Array, in dem du die Daten speichern willst

let genresEntwicklung = [
    {
        name: "Country", color: "#0bb882", weather_data:
            [
                { datum: "2025-10-08", anzahl: 47, wetter_code: "bewoelkt", temperatur_min: 10.2, temperatur_max: 14.5 },
                { datum: "2025-10-09", anzahl: 21, wetter_code: "regen", temperatur_min: 8.9, temperatur_max: 13.2 },
                { datum: "2025-10-10", anzahl: 54, wetter_code: "sonnig", temperatur_min: 7.6, temperatur_max: 8.8 },
                { datum: "2025-10-11", anzahl: 23, wetter_code: "sonnig", temperatur_min: 10.5, temperatur_max: 14.3 }
            ]
    },
    {
        name: "Rock", color: "#ce97ab", weather_data:
            [
                { datum: "2025-10-08", anzahl: 87, wetter_code: "bewoelkt", temperatur_min: 10.2, temperatur_max: 14.5 },
                { datum: "2025-10-09", anzahl: 33, wetter_code: "regen", temperatur_min: 8.9, temperatur_max: 13.2 },
                { datum: "2025-10-10", anzahl: 0, wetter_code: "sonnig", temperatur_min: 7.6, temperatur_max: 8.8 },
                { datum: "2025-10-11", anzahl: 17, wetter_code: "sonnig", temperatur_min: 10.5, temperatur_max: 14.3 }
            ]
    },
    {
        name: "Pop", color: "#7262ad", weather_data:
            [
                { datum: "2025-10-08", anzahl: 61, wetter_code: "bewoelkt", temperatur_min: 10.2, temperatur_max: 14.5 },
                { datum: "2025-10-09", anzahl: 24, wetter_code: "regen", temperatur_min: 8.9, temperatur_max: 13.2 },
                { datum: "2025-10-10", anzahl: 8, wetter_code: "sonnig", temperatur_min: 7.6, temperatur_max: 8.8 },
                { datum: "2025-10-11", anzahl: 32, wetter_code: "sonnig", temperatur_min: 10.5, temperatur_max: 14.3 }
            ]
    }];

let weatherLastWeek = [
    {
        datum: "2025-09-29",
        wetter_code: "sonnig"
    },
    {
        datum: "2025-09-30",
        wetter_code: "bewoelkt"
    },
    {
        datum: "2025-10-01",
        wetter_code: "sonnig"
    },
    {
        datum: "2025-10-02",
        wetter_code: "bewoelkt"
    },
    {
        datum: "2025-10-03",
        wetter_code: "regen"
    },
    {
        datum: "2025-10-04",
        wetter_code: "regen"
    },
    {
        datum: "2025-10-05",
        wetter_code: "schnee"
    }
];

let topGenres = ["Country", "Rock", "Pop", "Hip Hop", "Indie"];

let genresWeather = [
    {
        wetter_code: "sonnig",
        top_genres: [
            {
                name: "Country",
                anzahl: 47
            },
            {
                name: "Pop",
                anzahl: 35
            },
            {
                name: "Rock",
                anzahl: 12
            },
            {
                name: "Hip Hop",
                anzahl: 10
            },
            {
                name: "Indie",
                anzahl: 3
            }
        ]
    },
    {
        wetter_code: "bewoelkt",
        top_genres: [
            {
                name: "Rock",
                anzahl: 61
            },
            {
                name: "Rap",
                anzahl: 50
            },
            {
                name: "Jazz",
                anzahl: 42
            },
            {
                name: "Pop",
                anzahl: 40
            },
            {
                name: "Schlager",
                anzahl: 13
            }
        ]
    },
    {
        wetter_code: "regen",
        top_genres: [
            {
                name: "Jazz",
                anzahl: 62
            },
            {
                name: "Reggae",
                anzahl: 55
            },
            {
                name: "Latino",
                anzahl: 43
            },
            {
                name: "Pop",
                anzahl: 31
            },
            {
                name: "Rock",
                anzahl: 28
            }
        ]
    },
    {
        wetter_code: "schnee",
        top_genres: [
            {
                name: "Hip Hop",
                anzahl: 48
            },
            {
                name: "Rap",
                anzahl: 45
            },
            {
                name: "Pop",
                anzahl: 30
            },
            {
                name: "Rock",
                anzahl: 23
            },
            {
                name: "Alternative",
                anzahl: 15
            }
        ]
    }
];

let datumsWert = ["2025-09-29", "2025-09-30", "2025-10-01"];

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