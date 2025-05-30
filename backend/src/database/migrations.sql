create database sports_betting_app;

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    sport VARCHAR NOT NULL,
    date TIMESTAMP NOT NULL,
    team_a VARCHAR NOT NULL,
    team_b VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE odds (
    id SERIAL PRIMARY KEY,
    event_id INTEGER NOT NULL,
    outcome VARCHAR NOT NULL,
    value DECIMAL(8, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_event FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

DELETE FROM odds;
DELETE FROM events;

INSERT INTO events (name, sport, date, team_a, team_b)
VALUES (
  'Final Campeonato Brasileiro',
  'Futebol',
  '2025-06-15T18:00:00Z',
  'Flamengo',
  'Palmeiras'
)
RETURNING id;

INSERT INTO odds (event_id, outcome, value)
VALUES
  (1, 'team_a_win', 2.10),
  (1, 'draw', 3.20),
  (1, 'team_b_win', 3.50);

INSERT INTO events (name, sport, date, team_a, team_b)
VALUES (
  'NBA Finals Jogo 7',
  'Basquete',
  '2025-06-20T22:00:00Z',
  'Boston Celtics',
  'Golden State Warriors'
)
RETURNING id;

INSERT INTO odds (event_id, outcome, value)
VALUES
  (2, 'team_a_win', 1.80),
  (2, 'team_b_win', 2.50);

