const { Selector } = require('testcafe');

const agenda = {
  backToMyEvent: Selector('#app-content a').withText('Back to My Event').nth(1),
  backToAgendas: Selector('#app-content span').withText('Back to Agendas'),
  firstEventContent: Selector('.blueSteel .rapp-event-content').nth(0),
  secondEventContent: Selector('.blueSteel .rapp-event-content').nth(1),
  secondDate: Selector('#app-content > div > main > div > nav > div > div > a').nth(1),
  activate: Selector('button > span').withText('Activate'),
  confirmActivate: Selector('button > span').withText('Activate').nth(1),
  status: Selector('header > div > div:nth-child(2) > div > span').nth(1),
  speakerSection: Selector('span').withExactText('People'),
  myAgenda: Selector('span').withText('My agenda'),
  newAgendaBtn: Selector('button').withText('New agenda'),
  addSessionBtn: Selector('span').withText('Add session'),
  addTrackBtn: Selector('span').withText('Add Track'),
  importAgenda: Selector('#agendaUpload-FileInput'),
  importConfirm: Selector('button span').withText('Confirm'),
  firstEvent: Selector('table tr td').nth(1),
  agendaTrash: Selector('button[class*="Button-destructive"]').nth(0),
  agendaDialogConfirm: Selector('div[data-test-name="modal"] button[class*="Button-primary"]'),
  agendaDeleteConfirm: Selector('div[data-test-name="agenda-delete-confirmation"] button[class*="Button-primary"]'),
  moreOption: Selector('button svg[data-icon-name="MORE_HORIZONTAL"]'),
};

const agendaEvent = {
  name: Selector('input[placeholder="Session Name"]'),
  sessionOneTitle: Selector(
    '#app-content > div > main > div > main > div > div > div > div > div.rapp-addons-dnd.rapp-calendar > div > div.rapp-time-content > div:nth-child(2) > div:nth-child(25) > div > div > div > div.rapp-event-content > div > div > span'
  ).nth(0),
  sessionTwoTitle: Selector(
    '#app-content > div > main > div > main > div > div > div > div > div.rapp-addons-dnd.rapp-calendar > div > div.rapp-time-content > div:nth-child(3) > div:nth-child(25) > div > div > div > div.rapp-event-content > div > div > span'
  ).nth(0),
  sessionSelect: Selector('form > div > div > label > span > select'),
  get sessionOption() {
    return this.sessionSelect.find('option');
  },
  speakerA: Selector('form > div > div:nth-child(1) > div > div:nth-child(2) > div'),
  speakerB: Selector('form > div > div:nth-child(2) > div > div:nth-child(2) > div'),
  startDate: Selector('input[name="startDate"]'),
  startTime: Selector('input[name="startTime"]'),
  durationSelectA: Selector('form > label:nth-child(8) > div:nth-child(2) > div:nth-child(1) > div > span > select'),
  get durationOptionA() {
    return this.durationSelectA.find('option');
  },
  description: Selector('textarea[name="description"]'),
  trackSelect: Selector('form > label:nth-child(10) > span > select'),
  get trackOption() {
    return this.trackSelect.find('option');
  },
  coverImage: Selector('form > div:nth-child(11) > label > div > div > div > div').nth(0),
  closeDialog: Selector('a[data-action="panel-close"]'),
  speakerBtn: Selector('form > button'),
  saveSpeaker: Selector('button > span').withText('Save'),
  removeIcon: Selector('.rw-widget-picker.rw-widget-container > span.timezoneAndRemoveIconContainer > a'),
  startDateInput: Selector('input[name="startTime"]'),
  saveSession: Selector('button > span').withText('Save'),
};

const agendaMeetingEvent = {
  url: Selector('input[name="url"]'),
  durationSelect: Selector('form > label:nth-child(7) > div:nth-child(2) > div:nth-child(1) > div > span > select'),
  get durationOption() {
    return this.durationSelect.find('option');
  },
  trackSelect: Selector('form > label:nth-child(9) > span > select'),
  get trackOption() {
    return this.trackSelect.find('option');
  },
  coverImage: Selector('form > div:nth-child(10) > label > div > div > div > div').nth(0),
};

const people = {
  createButton: Selector('button > span').withText('Create people'),
  saveButton: Selector('button > span').withExactText('Save'),
  cancelButton: Selector('a > span').withExactText('Cancel'),
  firstName: Selector('input[name="first_name"]'),
  lastName: Selector('input[name="last_name"]'),
  email: Selector('input[name="email"]'),
  title: Selector('input[name="title"]'),
  company: Selector('input[name="company"]'),
  bio: Selector('textarea[name="bio"]'),
  headShot: Selector('label[data-test-name="image"]'),
  imageUpload: Selector('[class^="DropZone-container-"]').find('input'),
  moreOption: 'button svg[data-icon-name="MORE_HORIZONTAL"]',
  editOption: Selector('li').withExactText('Edit'),
  deleteOption: Selector('li').withExactText('Delete'),
  lastPeople: Selector('tr:last-child td'),
  tableBody: Selector('div[class^="--table"] > div'),
  closeDialog: Selector('a[data-action="panel-close"]'),
};

module.exports = {
  agenda,
  agendaEvent,
  agendaMeetingEvent,
  people,
};