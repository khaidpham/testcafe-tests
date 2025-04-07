const { Selector } = require('testcafe');

const sidebar_mainItem = '.app-subnav > ul > li > a > div';

const VideoProjectsBar = {
  deleteBtn: Selector('span').withText('Delete'),
  takeOfflineBtn: Selector('span').withText('Take Offline'),
  duplicateBtn: Selector('span').withText('Duplicate'),
  newExperienceBtn: Selector('span').withText('New Experience'),
};

const ExperiencesSettingsBar = {
  experiencesTab: Selector('.nav.nav-pills > li').withExactText('Experiences'),
  settingsTab: Selector('.nav.nav-pills > li').withExactText('Settings'),
};

const SettingsSubNav = {
  players: Selector(sidebar_mainItem).withExactText('Players'),
  youTube: Selector(sidebar_mainItem).withExactText('YouTube'),
  customDomains: Selector(sidebar_mainItem).withExactText('Custom Domains and SSL'),
  accessControl: Selector(sidebar_mainItem).withExactText('Access Control Profiles'),
  customHtml: Selector(sidebar_mainItem).withExactText('Custom HTML'),
  viewerSegments: Selector(sidebar_mainItem).withExactText('Viewer Segments'),
};

const CatalogueHome = {
  headerContainer: Selector('#main-header-logo-container'),
  headerLogo: Selector('div.main-header-logo').nth(0),
  headerEditPencilIcon: Selector('a.appg-main-header-title.content-editable.append-pencil').nth(0),
  headerTitle: Selector('div[data-id="mainHeaderTitle"]').nth(1),
  editOverlay_btn: Selector('div.appg-editable-overlay-buttons'),
  headerTitle_txt: Selector('div.notranslate.public-DraftEditor-content'),
  headerSave: Selector('button').withText('Save'),
  iframe: '.page-preview-frame',
  getHeaderTitle: Selector('.appg-editor-wrap[data-id="mainHeaderTitle"]').nth(0),
  body: Selector('body'),
  footerList_1: Selector('div[data-id^="footerList"]').nth(0),
  footerList_2: Selector('div[data-id^="footerList"]').nth(1),
  footerEditModelWindow: Selector('div[data-test-name="modal"]'),
  footerText_txt: Selector('input[type="text"]').nth(0),
  footerSave_btn: Selector('button[data-test-name$="create-btn"]').nth(1)
};

const ImmersionHome = {
  iframe: '.page-preview-frame',
  addLogo: Selector('.appg-logo-editor').nth(0),
  addMenuItem: Selector('.appg-menu-editor').nth(0),
  addVideos: Selector('.appg-video-link-editor').nth(0),
  imageUrl: Selector('div.appg-logo-editor-modal__wrapper input[type="radio"]').nth(1),
  imageUrlText: Selector('div.appg-logo-editor-modal__wrapper input[type="text"]').nth(0),
  imageAltText: Selector('div.appg-logo-editor-modal__wrapper input[type="text"]').nth(1),
  companyName: Selector('div.appg-logo-editor-modal__wrapper input[type="text"]').nth(2),
  save: Selector('button[class*="Button-primary"]').withText('Save'),
  cancel: Selector('button[class*="Button-tertiary"]').withText('Cancel'),
  logo: Selector('img[alt="appOV"]'),
  addMenuModelWindow: Selector('div[role="dialog"][aria-label="Add menu item"]'),
  menuPageTab: Selector('div[role="tab"]').nth(1),
  pageDropdown: Selector('div[role="dialog"][aria-label="Add menu item"] select'),
  menuLink: Selector('div[data-editor="menuLink"]'),
}

const LiveEventHome = {
  iframe: '.page-preview-frame',
  editBgImage_button: Selector('.image-overlay > button').nth(1),
  bgImage: Selector('div.image-editor > div > img'),
  editBGDragDropUpload: Selector('#resources-upload'),
  editBGChooseUpload: Selector('#click-upload'),
  editBGCancelBtn: Selector('button[data-test-name="components.edit.mainEditor.EditorModal.cancel-btn"]'),
  editBGSaveBtn: Selector('button[data-test-name="components.edit.mainEditor.EditorModal.save-btn"]'),
}
module.exports = {
  VideoProjectsBar,
  ExperiencesSettingsBar,
  SettingsSubNav,
  CatalogueHome,
  ImmersionHome,
  LiveEventHome,
};