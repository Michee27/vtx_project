import { getEvents, getEventDetails } from './api.js';
import {
    renderEvents,
    renderEventDetails,
    updatePotentialReturn,
    showSection,
    renderCartItems,
    toggleAddToCartButton,
} from './ui.js';

let currentEvent = null;
let selectedOdd = null;
let betAmount = 0;
let betCart = [];

const init = async () => {
    await loadEvents();
    setupEventListeners();
    showSection('events-list');
};

const loadEvents = async () => {
    const events = await getEvents();
    renderEvents(events, handleSelectEvent);
};

const handleSelectEvent = async (eventId) => {
    currentEvent = await getEventDetails(eventId);
    selectedOdd = null;
    betAmount = parseFloat(document.getElementById('bet-amount').value);
    renderEventDetails(currentEvent, selectedOdd, handleSelectOdd);
    updatePotentialReturn(betAmount, selectedOdd ? selectedOdd.value : 0);
    showSection('bet-calculator');
    toggleAddToCartButton(false);
};

const handleSelectOdd = (odd) => {
    if (selectedOdd && selectedOdd.outcome === odd.outcome) {
        selectedOdd = null;
    } else {
        selectedOdd = odd;
    }
    renderEventDetails(currentEvent, selectedOdd, handleSelectOdd);
    updatePotentialReturn(betAmount, selectedOdd ? selectedOdd.value : 0);
    toggleAddToCartButton(selectedOdd !== null);
};

const handleBetAmountChange = (event) => {
    betAmount = parseFloat(event.target.value);
    updatePotentialReturn(betAmount, selectedOdd ? selectedOdd.value : 0);
};

const handleAddToCart = () => {
    if (currentEvent && selectedOdd && betAmount > 0) {
        const existingBetIndex = betCart.findIndex(
            (item) =>
                item.eventId === currentEvent.id &&
                item.outcome === selectedOdd.outcome,
        );

        if (existingBetIndex > -1) {
            betCart[existingBetIndex].betAmount = betAmount;
            betCart[existingBetIndex].oddValue = selectedOdd.value;
        } else {
            betCart.push({
                eventId: currentEvent.id,
                eventName: currentEvent.name,
                teamA: currentEvent.team_a,
                teamB: currentEvent.team_b,
                outcome: selectedOdd.outcome,
                oddValue: selectedOdd.value,
                betAmount: betAmount,
            });
        }

        renderCartItems(betCart, handleRemoveCartItem);
        showSection('bet-cart');
    } else {
        alert(
            'Por favor, selecione um resultado e insira um valor de aposta válido.',
        );
    }
};

const handleRemoveCartItem = (index) => {
    betCart.splice(index, 1);
    renderCartItems(betCart, handleRemoveCartItem);
};

const handleClearCart = () => {
    betCart = [];
    renderCartItems(betCart, handleRemoveCartItem);
    alert('Carrinho limpo!');
    showSection('events-list');
};

const handleConfirmBet = () => {
    if (betCart.length > 0) {
        console.log('Apostas Confirmadas:', betCart);
        alert(
            `Apostas confirmadas! Total a apostar: R$ ${
                document.getElementById('cart-total-bet').textContent
            }. Retorno potencial: ${
                document.getElementById('cart-total-return').textContent
            }`,
        );
        betCart = [];
        renderCartItems(betCart, handleRemoveCartItem);
        showSection('events-list');
    } else {
        alert('Seu carrinho está vazio. Adicione apostas antes de confirmar.');
    }
};

const setupEventListeners = () => {
    document
        .getElementById('bet-amount')
        .addEventListener('input', handleBetAmountChange);
    document.getElementById('back-to-events').addEventListener('click', () => {
        showSection('events-list');
        currentEvent = null;
        selectedOdd = null;
        toggleAddToCartButton(false);
    });
    document
        .getElementById('add-to-cart-btn')
        .addEventListener('click', handleAddToCart);
    document
        .getElementById('clear-cart-btn')
        .addEventListener('click', handleClearCart);
    document
        .getElementById('confirm-bet-btn')
        .addEventListener('click', handleConfirmBet);
};

document.addEventListener('DOMContentLoaded', init);
