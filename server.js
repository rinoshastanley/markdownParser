const express = require('express');
const markdownIt = require('markdown-it');
const cors = require('cors');

const app = express();
const md = new markdownIt();

app.use(express.json());
app.use(cors()); // Use the 'cors' middleware to enable CORS

app.post('/convert', (req, res) => {
    const { markdown } = req.body;
    console.log(markdown)

    if (!markdown) {
        return res.status(400).json({ error: 'Markdown content is required' });
    }

    const html = md.render(markdown);
    res.setHeader('Access-Control-Allow-Origin', '*'); // Change '*' to your frontend URL in production
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

    // Send the HTML back to the frontend
    res.json({ html });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
