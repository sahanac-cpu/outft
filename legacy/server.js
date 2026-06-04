const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const DATA_FILE = path.join(__dirname, 'data', 'subscribers.json');

// Ensure data file exists
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({ subscribers: [] }, null, 2));
}

// Email signup endpoint
app.post('/api/subscribe', (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'valid email required' });
  }

  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

    // Check for duplicates
    if (data.subscribers.some(s => s.email === email)) {
      return res.status(409).json({ error: 'already on the list' });
    }

    data.subscribers.push({
      email,
      timestamp: new Date().toISOString(),
      source: 'landing-page'
    });

    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

    console.log(`new subscriber: ${email} (total: ${data.subscribers.length})`);
    res.json({ success: true, message: 'you\'re in' });
  } catch (err) {
    console.error('subscribe error:', err);
    res.status(500).json({ error: 'something broke' });
  }
});

// View subscribers (admin)
app.get('/api/subscribers', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'could not read subscribers' });
  }
});

app.listen(PORT, () => {
  console.log(`outft· running on http://localhost:${PORT}`);
  console.log(`emails stored in: ${DATA_FILE}`);
});
