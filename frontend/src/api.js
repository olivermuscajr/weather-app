// src/api.js

const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000";

export const getWeatherData = async (cityName) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/weather?city=${cityName}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch weather data: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
};
