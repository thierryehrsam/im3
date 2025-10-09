
const url = '../php/unload.php'; // Pfad zu deiner PHP-Datei
const DATA_COUNT = 7;
const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 };
// Array, in dem du die Daten speichern willst

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

console.log(temperaturenMin);
console.log(temperaturenMax);
console.log(tage);


const labels = tage;
const data = {
    labels: labels,
    datasets: [
        {
            label: 'Temperatur Min',
            data: temperaturenMin,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)'
        },
        {
            label: 'Temperatur Max',
            data: temperaturenMax,
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'rgba(54, 162, 235, 0.5)'
        }
    ]
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