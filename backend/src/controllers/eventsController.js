const knex = require('knex');
const knexConfig = require('../database/knexfile');
const db = knex(knexConfig.development);

const parseDecimalToFloat = (value) => {
    return parseFloat(value);
};

const getAllEvents = async (req, res) => {
    try {
        const events = await db('events').select('*');
        const eventsWithOdds = await Promise.all(
            events.map(async (event) => {
                const odds = await db('odds')
                    .where({ event_id: event.id })
                    .select('outcome', 'value');
                const parsedOdds = odds.map((odd) => ({
                    ...odd,
                    value: parseDecimalToFloat(odd.value),
                }));
                return { ...event, odds: parsedOdds };
            }),
        );
        res.json(eventsWithOdds);
    } catch (error) {
        console.error('Erro ao buscar eventos:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

const getEventById = async (req, res) => {
    const { id } = req.params;
    try {
        const event = await db('events').where({ id }).first();
        if (!event) {
            return res.status(404).json({ error: 'Evento não encontrado' });
        }
        const odds = await db('odds')
            .where({ event_id: id })
            .select('outcome', 'value');
        const parsedOdds = odds.map((odd) => ({
            ...odd,
            value: parseDecimalToFloat(odd.value),
        }));
        res.json({ ...event, odds: parsedOdds });
    } catch (error) {
        console.error(`Erro ao buscar evento ${id}:`, error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

module.exports = {
    getAllEvents,
    getEventById,
};
