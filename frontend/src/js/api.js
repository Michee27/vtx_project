const API_BASE_URL = 'http://localhost:3000/api';

export const getEvents = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/events`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar eventos:', error);
        return [];
    }
};

export const getEventDetails = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/events/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Erro ao buscar detalhes do evento ${id}:`, error);
        return null;
    }
};
