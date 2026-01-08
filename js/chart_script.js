const unload_url = "../php/unload/";
const genres_with_weather_data_url = unload_url + "genres_with_weather_data.php";
const top_genres_last_week_url = unload_url + "top_genres_last_week.php";
const top_genres_per_weather_url = unload_url + "top_genres_per_weather.php";
const unique_dates_url = unload_url + "unique_dates.php";
const weather_last_week_url = unload_url + "weather_last_week.php";
const weatherButtons = document.querySelectorAll('.weather-btn');

// Für Chart.js, das bei leeren Datensätzen "Keine Daten verfügbar" anzeigt
Chart.register({
    id: 'noDataMessage',
    afterDraw(chart) {
        const { ctx, chartArea } = chart;

        // Prüfen, ob überhaupt Daten vorhanden sind
        const hasData =
            chart.data.datasets &&
            chart.data.datasets.some(ds =>
                ds.data && ds.data.length > 0 && ds.data.some(v => v !== 0)
            );

        // Wenn keine Daten -> Text anzeigen
        if (!hasData) {
            const { left, right, top, bottom } = chartArea;
            const x = (left + right) / 2;
            const y = (top + bottom) / 2;

            ctx.save();
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = '16px';
            ctx.fillStyle = '#999';
            ctx.fillText('Keine Daten verfügbar', x, y);
            ctx.restore();
        }
    }
});


function darkenHexColor(hex, percent = 3) {
    // Prozent in einen Faktor umwandeln (z. B. 10% → 0.9)
    const factor = 1 - percent / 100;

    // Hex normalisieren: "#" entfernen, ggf. 3-stellig zu 6-stellig machen
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) {
        hex = hex.split('').map(x => x + x).join('');
    }

    // In RGB zerlegen
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    // Abdunkeln und begrenzen (0–255)
    const newR = Math.max(0, Math.min(255, Math.floor(r * factor)));
    const newG = Math.max(0, Math.min(255, Math.floor(g * factor)));
    const newB = Math.max(0, Math.min(255, Math.floor(b * factor)));

    // Zurück in Hex umwandeln
    const toHex = v => v.toString(16).padStart(2, '0');
    return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
}

async function loadData(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Fehler beim Laden der Daten");
            }
            return response.json();
        })
        .then(data => {
            return data;
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


function renderTopGenres(genres) {
    const container = document.getElementById("topGenresLastWeek");

    genres.forEach(genre => {
        const li = document.createElement("li");
        // das <li> selbst behält die Schriftart von .topNumber

        // span für das Genre
        const span = document.createElement("span");
        span.classList.add(`genre1`);
        span.textContent = " " + genre; // Leerzeichen hinter Zahl

        li.appendChild(span);
        container.appendChild(li);
    });
}

function renderWeatherLastWeek(data) {
    const container = document.getElementById("weatherLastWeek");
    container.innerHTML = "";

    const tage = ["MO", "DI", "MI", "DO", "FR", "SA", "SO"];

    data.forEach((entry, index) => {
        const wetterCode = entry.wetter_code;
        const day = tage[index];

        // Wrapper für einen Tag
        const dayDiv = document.createElement("div");
        dayDiv.classList.add("weatherDay");

        // Icon-Container mit Text *innen drin*
        const iconDiv = document.createElement("div");
        iconDiv.classList.add("weatherIcon");
        iconDiv.style.backgroundImage = `url('../images/${wetterCode}_third.svg')`;

        const label = document.createElement("span");
        label.textContent = day;
        label.classList.add("dayLabel");

        iconDiv.appendChild(label);
        dayDiv.appendChild(iconDiv);
        container.appendChild(dayDiv);
    });
}


function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
}

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

function getDynamicAspectRatio(minR, maxR = 2.25) {
    const w = window.innerWidth;

    // Diese zwei Werte bestimmen, WANN die Kurve startet/endet:
    const minW = 390;   // ab hier beginnt es spürbar zu steigen (Mobile)
    const maxW = 1200;  // ab hier ist es praktisch "Desktop fix"

    const t = clamp((w - minW) / (maxW - minW), 0, 1);
    const eased = easeOutCubic(t);

    return minR + eased * (maxR - minR);
}

function getPointRadius() {
    const w = window.innerWidth;
    if (w < 480) return 1.5;   // Mobile
    if (w < 900) return 2.25;   // Tablet
    return 4;                  // Desktop
}


function generateGenresWithWeatherDataChart() {
    let datasets = [];

    genres_with_weather_data.forEach((genre) => {
        const wetterMap = new Map(genre.weather_data.map(w => [w.datum, w]));

        const anteile = filtered_dates.map(datum => wetterMap.get(datum)?.anzahl || 0);
        const wetterInfos = filtered_dates.map(datum => wetterMap.get(datum) || null);

        datasets.push({
            label: genre.name,
            data: anteile,
            borderColor: darkenHexColor(genre.color),
            backgroundColor: genre.color + '90',
            pointStyle: 'circle',
            pointRadius: getPointRadius(),
            pointHoverRadius: getPointRadius() + 1.5,
            wetterInfos: wetterInfos
        });
    });

    const labels = filtered_dates.map(d => {
        const [year, month, day] = d.split("-");
        return `${day}.${month}.${year}`;
    });

    const data = { labels, datasets };

    const config = {
        type: 'line',
        data,
        options: {
            responsive: true,
            aspectRatio: getDynamicAspectRatio(0.7, 1.75),
            plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Wetterdaten' },
                tooltip: {
                    enabled: false, // Standard-Tooltip aus
                    external: function (context) {
                        const tooltip = context.tooltip;
                        let tooltipEl = document.getElementById('chartjs-tooltip');

                        // Tooltip-Element erzeugen, falls nicht vorhanden
                        if (!tooltipEl) {
                            tooltipEl = document.createElement('div');
                            tooltipEl.id = 'chartjs-tooltip';
                            tooltipEl.classList.add('chart-tooltip');
                            document.body.appendChild(tooltipEl);
                        }

                        // Wenn kein Tooltip sichtbar sein soll → ausblenden
                        if (!tooltip || tooltip.opacity === 0) {
                            tooltipEl.style.opacity = 0;
                            return;
                        }

                        const dataPoint = tooltip.dataPoints?.[0];
                        if (!dataPoint) return;

                        const dataset = dataPoint.dataset;
                        const info = dataset.wetterInfos?.[dataPoint.dataIndex];
                        if (!info) return;

                        const wetter = info.wetter_code;
                        const datum = context.chart.data.labels[dataPoint.dataIndex];
                        const iconPath = {
                            sonnig: '../images/sonnig.svg',
                            bewoelkt: '../images/bewoelkt.svg',
                            regen: '../images/regen.svg',
                            schnee: '../images/schnee.svg'
                        }[wetter];

                        tooltipEl.innerHTML = `<div class="date">${datum}</div>
                                            <div class="weather-data">
                                            <img src="${iconPath}" alt="${wetter}">
                                            <div class="temps">
                                            <div class="max">${info.temperatur_max}°C</div>
                                            <div class="min">${info.temperatur_min}°C</div>
                                            </div></div>`;

                        const canvasRect = context.chart.canvas.getBoundingClientRect();
                        tooltipEl.style.left = canvasRect.left + window.pageXOffset + tooltip.caretX - tooltipEl.offsetWidth / 2 + 'px';
                        tooltipEl.style.top = canvasRect.top + window.pageYOffset + tooltip.caretY - tooltipEl.offsetHeight - 10 + 'px';
                        tooltipEl.style.opacity = 1;
                        tooltipEl.style.background = dataset.backgroundColor;
                    }
                }
            }
        }
    };

    return config;
}

function generateTopGenresPerWeatherChart(top_genres = top_genres_per_weather.find(entry => entry.wetter_code === "sonnig").top_genres) {
    let labels = [];
    top_genres.forEach(genre => labels.push(genre.name));

    let anzahl = [];
    top_genres.forEach(genre => anzahl.push(genre.anzahl));

    const data = {
        labels: labels,
        datasets: [
            {
                label: "Anzahl Streams",
                data: anzahl,
                borderColor: "#340043",
                backgroundColor: "#340043",
            }
        ]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            aspectRatio: getDynamicAspectRatio(0.9),
            indexAxis: "y",
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Top Genres'
                }
            }
        },
    };

    return config;
}

function updateTopGenresPerWeatherChart(weatherCode) {
    // Beispiel: die passenden Daten aus deinem Array holen
    const wetterObjekt = top_genres_per_weather.find(entry => entry.wetter_code === weatherCode);

    if (!wetterObjekt || !wetterObjekt.top_genres.length) {
        // Setze einfach leere Arrays:
        topGenresChart.data.labels = [];
        topGenresChart.data.datasets[0].data = [];
        topGenresChart.options.plugins.title.text = `Keine Daten`;
        topGenresChart.update();
        return;
    } else {
        const top_genres = wetterObjekt.top_genres;

        // Labels und Daten neu setzen
        topGenresChart.data.labels = top_genres.map(g => g.name);
        topGenresChart.data.datasets[0].data = top_genres.map(g => g.anzahl);
        topGenresChart.options.plugins.title.text = `Anzahl Genre-Streams`;
    }


    // Chart aktualisieren
    topGenresChart.update();
}

const genres_with_weather_data = await loadData(genres_with_weather_data_url);
const top_genres_last_week = await loadData(top_genres_last_week_url);
const top_genres_per_weather = await loadData(top_genres_per_weather_url);
const unique_dates = await loadData(unique_dates_url);
const weather_last_week = await loadData(weather_last_week_url);
const filtered_dates = unique_dates.slice(0, -1);
renderWeatherLastWeek(weather_last_week);
renderTopGenres(top_genres_last_week);

let topGenresChart = new Chart(document.querySelector("#topGenresPerWeatherChart"), generateTopGenresPerWeatherChart());
let genreDevelopmentChart = new Chart(document.querySelector("#genreDevelopmentChart"), generateGenresWithWeatherDataChart());

weatherButtons.forEach(btn => {
    const weatherType = btn.dataset.weather;
    btn.addEventListener('click', () => {
        updateTopGenresPerWeatherChart(weatherType);
        weatherButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

    });
});

function updateChartRatios() {
    topGenresChart.options.aspectRatio = getDynamicAspectRatio(0.9);
    genreDevelopmentChart.options.aspectRatio = getDynamicAspectRatio(0.7);

    topGenresChart.update();
    genreDevelopmentChart.update();
}

window.addEventListener('resize', updateChartRatios);