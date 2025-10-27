const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();
console.log("Loaded API Key:", process.env.API_KEY);
const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json())

app.get('/api/weather', async (req, res) => {
    const { city } = req.query;

    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${city}&days=7`
        );

        if (!response.ok) {
            console.error('Weather API responded with status', response.status);
            return res
                .status(response.status)
                .json({ error: "Failed to fetch from server." });
        }

        const data = await response.json();
        res.json(data);
    } catch (e) {
        console.error("Weather API: ", e);
        res.status(500).json({ error: 'Error fetching weather data.' });
    }
})

// Only run app.listen() locally
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running locally on http://localhost:${PORT}`);
    });
}

module.exports = app;