import express from 'express';

console.log('✅ Express imported successfully');

const app = express();

app.get('/test', (req, res) => {
    res.json({ message: 'Server is working!' });
});

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`✅ Test server running on port ${PORT}`);
    console.log(`Visit: http://localhost:${PORT}/test`);
});
