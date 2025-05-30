require('dotenv').config();
const express = require('express');
const cors = require('cors');
const eventsRoutes = require('./routes/events');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/events', eventsRoutes);

app.get('/', (req, res) => {
    res.send('API de Apostas Esportivas funcionando!');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
