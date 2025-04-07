const { Selector } = require('testcafe');

const CustomPage = {
  addPageBtn: Selector('button[data-test-name="components.edit.mainEditor.EditorNav.add-page-button"]'),
  createModel: Selector('div[title="Create a Custom Page"]'),
  editModel: Selector('div[title="Edit Custom Page"]'),
  deleteModel: Selector('div[title="Delete Page"]'),
  pageName: Selector('input[type="text"][placeholder]'),
  pagePath: Selector('input[type="text"]').nth(1),
  saveBtn: Selector('button[data-test-name="components.edit.mainEditor.ManageCustomPageModal.save-btn"]'),
  cancelBtn: Selector('button[data-test-name="components.edit.mainEditor.ManageCustomPageModal.cancel-btn"]'),
  editBtn: Selector('button[data-test-name="components.edit.mainEditor.SubNavLayoutItem.manage-page-button"]'),
  deleteBtn: Selector('button[data-test-name="components.edit.mainEditor.ManageCustomPageModal.delete-btn"]'),
  confirmBtn: Selector('button[data-test-name="components.edit.mainEditor.ManageCustomPageModal.confirm-btn"]'),
  cancelBtn: Selector('button[data-test-name="components.edit.mainEditor.ManageCustomPageModal.cancel-btn"]'),
  FormError: Selector('div[class^="FormError"] > span'),

  sections: Selector('div[data-index][data-editor]'),
  addSection: Selector('button[data-test-name="editors.react.customPageEditors.AddSectionButton"]'),
  addHeadline: Selector('button[data-test-name="editors.react.customPageEditors.CustomPageSection.Headline-btn"]'),
  addText: Selector('button[data-test-name="editors.react.customPageEditors.CustomPageSection.Text-btn"]'),
  addEmbed: Selector('button[data-test-name="editors.react.customPageEditors.CustomPageSection.Embed-btn"]'),
  addAgenda: Selector('button[data-test-name="editors.react.customPageEditors.CustomPageSection.Agenda-btn"]'),
  addPeople: Selector('button[data-test-name="editors.react.customPageEditors.CustomPageSection.People-btn"]'),

  headlineSection: Selector('div[data-index="0"][data-editor="headline"]'),
  headlineEditor: Selector('div[data-test-name="editors.react.customPageEditors.sectionEditors.HeadlineEditor.textArea"] textarea'),
  headlineHeight: Selector('div[data-test-name="editors.react.customPageEditors.sectionEditors.HeadlineEditor.select"] select'),
  headlineSave: Selector('button[data-test-name="editors.react.customPageEditors.components.SectionEditor.save-btn.headline"]'),
  headlineCancel: Selector('button[data-test-name="editors.react.customPageEditors.components.SectionEditor.cancel-btn.headline"]'),
  headlineDelete: Selector('button[data-test-name="editors.react.customPageEditors.components.SectionEditor.delete-btn.headline"]'),
  moveDownBtn: 'editors.react.customPageEditors.components.SectionEditor.move-down-btn',
  moveUpBtn: 'editors.react.customPageEditors.components.SectionEditor.move-up-btn',
  sectionEditorCancel: 'editors.react.customPageEditors.components.SectionEditor.cancel-btn',

  textSection: Selector('div[data-index="0"][data-editor="paragraph"]'),
  textEditor: Selector('div[data-test-name="editors.react.customPageEditors.sectionEditors.ParagraphEditor.textArea"] textarea'),
  textLineHeight: Selector('div[data-test-name="editors.react.customPageEditors.sectionEditors.ParagraphEditor.select.lineHeight"] select'),
  textFontSize: Selector('div[data-test-name="editors.react.customPageEditors.sectionEditors.ParagraphEditor.select.fontSize"] select'),
  textSave: Selector('button[data-test-name="editors.react.customPageEditors.components.SectionEditor.save-btn.paragraph"]'),
  textCancel: Selector('button[data-test-name="editors.react.customPageEditors.components.SectionEditor.cancel-btn.paragraph"]'),
  textDelete: Selector('button[data-test-name="editors.react.customPageEditors.components.SectionEditor.delete-btn.paragraph"]'),

  embedSection: Selector('div[data-index="0"][data-editor="embed"]'),
  embedEditorHtml: Selector('div[data-test-name="editors.react.customPageEditors.sectionEditors.EmbedEditor.textArea.embed.html"]'),
  embedEditorCss: Selector('div[data-test-name="editors.react.customPageEditors.sectionEditors.EmbedEditor.textArea.embed.css"]'),
  embedEditorJs: Selector('div[data-test-name="editors.react.customPageEditors.sectionEditors.EmbedEditor.textArea.embed.js"]'),
  embedHeight: Selector('div[data-test-name="editors.react.customPageEditors.sectionEditors.EmbedEditor.input"] input'),
  embedSave: Selector('button[data-test-name="editors.react.customPageEditors.components.SectionEditor.save-btn.embed"]'),
  embedCancel: Selector('button[data-test-name="editors.react.customPageEditors.components.SectionEditor.cancel-btn.embed"]'),
  embedDelete: Selector('button[data-test-name="editors.react.customPageEditors.components.SectionEditor.delete-btn.embed"]'),
  youtubeEmbed: '<iframe width="560" height="315" src="https://www.youtube.com/embed/pFBwFvGavOA?si=5Ivfuy7REIS7tAE7" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen=""></iframe>',

  adendaSessions: Selector('div[class="ColumnsTrack__column"]'),

  published_headline: Selector('div.CustomPage .Headline'),
  published_text: Selector('div.CustomPage p'),
  published_embed: Selector('div.CustomPage .Embed'),
  published_agenda: Selector('div.CustomPage .Agenda'),
  published_agendaSessions: Selector('div.CustomPage .Agenda [class*="ColumnsTrack__sessions"]'),

  previewLoader: Selector('div.appg-page-preview-loader'),
};

const customSelectAgenda = {
  selectAgenda: Selector('button[data-test-name="editors.react.customPageEditors.components.SectionEditor.save-btn.agenda"]'),
  deleteAgenda: Selector('button[data-test-name="editors.react.customPageEditors.components.SectionEditor.delete-btn.agenda"]'),
  cancelAgenda: Selector('button[data-test-name="editors.react.customPageEditors.components.SectionEditor.cancel-btn.agenda"]'),
  editAgenda: Selector('button[data-test-name="editors.react.customPageEditors.components.SectionEditor.edit-btn.agenda"]'),
  createAgenda: Selector('button[data-test-name="editors.react.customPageEditors.components.create-section-button"]'),
  selectLastAgenda: Selector('div[class^="AgendaPicker__agendas"] div[class^="AgendaPicker__agenda"]:last-child div[class^="AgendaPicker__agenda"]'),
  saveBtn: Selector('button[data-test-name="editors.react.customPageEditors.sectionEditors.AgendaEditor.save-button"]'),
  cancelBtn: Selector('button[data-test-name="editors.react.customPageEditors.sectionEditors.AgendaEditor.cancel-button"]'),
};

const customAgendaWidget = {
  card: '.ColumnsCard',
  headerTrackNames: Selector('div.ColumnsView__trackNames h4.ColumnsView__trackName'),
  trackTitle: '.ColumnsCard__track__name',
  columns: Selector('div.ColumnsTrack__column'),
  title: '.ColumnsCard__title',
  speakers: 'button.CardButton.ColumnsCard__speakerButton',
  eventInfo: 'button.CardButton.ColumnsCard__eventInfoButton',
  date: '.ColumnsCard__imageDate',
  modal: Selector('div.Modal__content'),
  eventModal: Selector('div.EventModal__content'),
  eventName: Selector('.EventModal__name'),
  eventDesc: Selector('.EventModal__description'),
  eventClose: Selector('button[aria-label="Close"]'),
  speakerModal: Selector('div.SpeakerModal__content'),
  speakerName: Selector('.SpeakerModal__name'),
};

const PageLink = (page) => Selector(`div[data-test-name="components.edit.mainEditor.EditorNav.pages.${page}"] a`)

const GetSection = (type, index) => {
  if (typeof index === 'undefined') {
    return Selector(`div[data-index][data-editor="${type}"]`);
  }
  return Selector(`div[data-index="${index}"][data-editor="${type}"]`);
};

const CustomPageErrorMsg = {
  pathExist: 'already exists',
  pathCharError: 'The page path can contain only alphanumeric characters separated by dashes, e.g. "/my-custom-page"',
  embedError_ScriptNotAllowed: '<script> tag is not allowed here',
};

const SectionType = {
  headline: 'headline',
  text: 'paragraph',
  embed: 'embed',
  agenda: 'agenda',
  people: 'people'
};

const HeadlineType = {
  pageTitle_H1: '0',
  subtitle_H2: '1',
  sectionTitle_H3: '2',
  sectionSubtitle_H4: '3',
  miniSubtitle_H5: '4',
};

const TextLineHt = {
  px14: ['0', '14px'],
  px16: ['1', '16px'],
  px18: ['2', '18px'],
  px20: ['3', '20px'],
  px24: ['4', '24px'],
  px28: ['5', '28px'],
  px32: ['6', '32px'],
  px36: ['7', '36px'],
  px40: ['8', '40px'],
};

const TextFontSize = {
  px10: ['0', '10px'],
  px12: ['1', '12px'],
  px14: ['2', '14px'],
  px16: ['3', '16px'],
  px18: ['4', '18px'],
  px20: ['5', '20px'],
  px22: ['6', '22px'],
  px24: ['7', '24px'],
  px26: ['8', '26px'],
};

const moveOptions = {
  Up: 'up',
  Down: 'down',
}

const isErrorCodeMatching = (errorCode) => {
  for (const key in CustomPageErrorMsg) {
    if (CustomPageErrorMsg.hasOwnProperty(key)) {
      if (errorCode.includes(key)) {
        return true;
      }
    }
  }
  return false;
};

module.exports = {
  CustomPage,
  CustomPageErrorMsg,
  isErrorCodeMatching,
  PageLink,
  SectionType,
  HeadlineType,
  GetSection,
  TextLineHt,
  TextFontSize,
  moveOptions,
  customSelectAgenda,
  customAgendaWidget,
};