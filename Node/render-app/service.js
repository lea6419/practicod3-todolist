const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// API Key שלך
const API_KEY = 'rnd_XXXXXXXXXXXXXXXXXXXXX';

app.get('/services', async (req, res) => {
    try {
        const response = await axios.get('https://api.render.com/v1/services', {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching services:", error.response?.data || error.message);
        res.status(500).json({ error: 'Error fetching services' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
