import Chart from 'chart.js/auto';

const url = '../php/unload.php'; // Pfad zu deiner PHP-Datei

// Array, in dem du die Daten speichern willst
let wetterDaten = [];

fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error("Fehler beim Laden der Daten");
        }
        return response.json(); // Antwort in JS-Objekte umwandeln
    })
    .then(data => {
        wetterDaten = data; // Daten im Array speichern
        console.log("Geladene Wetterdaten:", wetterDaten);

        // Beispiel: Zugriff auf einzelne Werte
        wetterDaten.forEach(eintrag => {
            console.log(`${eintrag.datum}: ${eintrag.temperatur_min}°C / ${eintrag.temperatur_max}°C`);
        });
    })
    .catch(error => {
        console.error("Fehler:", error);
    });


const actions = [
    {
        name: 'Randomize',
        handler(chart) {
            chart.data.datasets.forEach(dataset => {
                dataset.data = Utils.numbers({ count: chart.data.labels.length, min: -100, max: 100 });
            });
            chart.update();
        }
    },
];

const DATA_COUNT = 7;
const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 };

const labels = Utils.months({ count: 7 });
const data = {
    labels: labels,
    datasets: [
        {
            label: 'Fully Rounded',
            data: Utils.numbers(NUMBER_CFG),
            borderColor: Utils.CHART_COLORS.red,
            backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
            borderWidth: 2,
            borderRadius: Number.MAX_VALUE,
            borderSkipped: false,
        },
        {
            label: 'Small Radius',
            data: Utils.numbers(NUMBER_CFG),
            borderColor: Utils.CHART_COLORS.blue,
            backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
            borderWidth: 2,
            borderRadius: 5,
            borderSkipped: false,
        }
    ]
};

const config = {
    type: 'bar',
    data: data,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart'
            }
        }
    },
};