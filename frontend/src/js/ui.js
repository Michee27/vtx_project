export const renderEvents = (events, onSelectEvent) => {
    const container = document.getElementById('events-container');
    container.innerHTML = '';

    if (events.length === 0) {
        container.innerHTML = '<p>Nenhum evento disponível no momento.</p>';
        return;
    }

    events.forEach((event) => {
        const eventCard = document.createElement('div');
        eventCard.classList.add('event-card');
        eventCard.innerHTML = `
            <h3>${event.name}</h3>
            <p><strong>Esporte:</strong> ${event.sport}</p>
            <p><strong>Data:</strong> ${new Date(
                event.date,
            ).toLocaleDateString()} ${new Date(
            event.date,
        ).toLocaleTimeString()}</p>
            <p>${event.team_a} vs ${event.team_b}</p>
        `;
        eventCard.addEventListener('click', () => onSelectEvent(event.id));
        container.appendChild(eventCard);
    });
};

export const renderEventDetails = (event, selectedOdd, onSelectOdd) => {
    document.getElementById(
        'selected-event-title',
    ).textContent = `${event.name} (${event.team_a} vs ${event.team_b})`;
    const oddsContainer = document.getElementById('odds-container');
    oddsContainer.innerHTML = '';

    event.odds.forEach((odd) => {
        const oddOption = document.createElement('div');
        oddOption.classList.add('odds-option');
        if (selectedOdd && selectedOdd.outcome === odd.outcome) {
            oddOption.classList.add('selected');
        }
        oddOption.dataset.outcome = odd.outcome;
        oddOption.dataset.value = odd.value;
        oddOption.innerHTML = `
            <span>${formatOutcome(
                odd.outcome,
                event.team_a,
                event.team_b,
            )}</span>
            <span>${odd.value.toFixed(2)}</span>
        `;
        oddOption.addEventListener('click', () => onSelectOdd(odd));
        oddsContainer.appendChild(oddOption);
    });
};

export const updatePotentialReturn = (betAmount, oddValue) => {
    const potentialReturnSpan = document.getElementById('potential-return');
    if (betAmount > 0 && oddValue > 0) {
        potentialReturnSpan.textContent = `R$ ${(betAmount * oddValue).toFixed(
            2,
        )}`;
    } else {
        potentialReturnSpan.textContent = `R$ 0.00`;
    }
};

export const showSection = (sectionId) => {
    document.getElementById('events-list').classList.add('hidden');
    document.getElementById('bet-calculator').classList.add('hidden');
    document.getElementById('bet-cart').classList.add('hidden');
    document.getElementById(sectionId).classList.remove('hidden');
};

export const formatOutcome = (outcome, teamA, teamB) => {
    switch (outcome) {
        case 'team_a_win':
            return `${teamA} vence`;
        case 'team_b_win':
            return `${teamB} vence`;
        case 'draw':
            return 'Empate';
        default:
            return outcome;
    }
};

export const renderCartItems = (cartItems, onRemoveItem) => {
    const cartList = document.getElementById('cart-items');
    cartList.innerHTML = '';
    let totalBet = 0;
    let totalPotentialReturn = 0;

    if (cartItems.length === 0) {
        cartList.innerHTML = '<li>Nenhuma aposta no carrinho.</li>';
        document.getElementById('confirm-bet-btn').disabled = true;
    } else {
        document.getElementById('confirm-bet-btn').disabled = false;
    }

    cartItems.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${item.eventName}: ${formatOutcome(
            item.outcome,
            item.teamA,
            item.teamB,
        )} @ ${item.oddValue.toFixed(2)} - R$ ${item.betAmount.toFixed(
            2,
        )}</span>
            <button data-index="${index}">Remover</button>
        `;
        listItem
            .querySelector('button')
            .addEventListener('click', () => onRemoveItem(index));
        cartList.appendChild(listItem);

        totalBet += item.betAmount;
        totalPotentialReturn += item.betAmount * item.oddValue;
    });

    document.getElementById(
        'cart-total-bet',
    ).textContent = `R$ ${totalBet.toFixed(2)}`;
    document.getElementById(
        'cart-total-return',
    ).textContent = `R$ ${totalPotentialReturn.toFixed(2)}`;
};

export const toggleAddToCartButton = (show) => {
    const btn = document.getElementById('add-to-cart-btn');
    if (show) {
        btn.classList.remove('hidden');
    } else {
        btn.classList.add('hidden');
    }
};
