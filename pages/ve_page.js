const { Selector } = require('testcafe');

const virtualEventAgenda = {
  agendaContainer: Selector('.appg-agenda-container'),
  agendaTitle: Selector('.app-live-stream-agenda-section-title'),
};

const virtualEventAgendaSession = {
  container: Selector('.app-live-stream-session-wrapper'),
  track: Selector('.app-session-track-tag'),
  time: Selector('.app-session-time'),
  title: Selector('.app-session-info-header > div:nth-child(1) > h3'),
  speakerName: Selector('p.app-live-speaker-name'),
  description: Selector('div.app-session-info > p'),
  liveNow: Selector('.app-live-now').nth(0),
};

module.exports = {
  virtualEventAgenda,
  virtualEventAgendaSession,
};