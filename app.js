const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/thumbnail', async (req, res) => {
    const videoUrl = req.query.url;

    try {
        const info = await ytdl.getInfo(videoUrl);
        const thumbnails = info.videoDetails.thumbnails;
        thumbnails.reverse();
        // only take first two items in the array
        thumbnails.length = 2;
        const thumbnailUrl = thumbnails[0].url;
        res.json({ thumbnailUrl });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Unable to fetch thumbnail' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
