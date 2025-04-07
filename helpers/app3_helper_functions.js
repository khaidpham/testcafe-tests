const Testcafe = require('testcafe');
const { app3Layout } = require('../pages/app3_layout_page')
const Common = require('@example/-testcafe-common');
const image_local = '../assets/img/avatar.jpeg';
const config = require('../config.json');

const nowDate = new Date().toLocaleString();
let template = '';
let pageTitle = '';

const setTemplate = (templateName) => {
  template = templateName;
}

/**
 * Create Page
 * @param  {string} pageType
 * @param  {string} template
 * @param  {TestController} t
 */
const createPage = async (pageType, template, t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  await t.click(app3Layout.createPage.with({ boundTestRun: t }));
  if (pageType === 'main') {
    await t.click(app3Layout.mainMenu.with({ boundTestRun: t }));
  } else {
    await t.click(app3Layout.secondaryMenu.with({ boundTestRun: t }));
  }
  await t.click(app3Layout.pageName.with({ boundTestRun: t }));
  pageTitle = `${template} - Automation test - ${nowDate}`;
  await t.typeText(app3Layout.pageName.with({ boundTestRun: t }), `${template} - Automation test - ${nowDate}`);
  await t.click(app3Layout.playlistGrid.with({ boundTestRun: t }));
  await t.click(app3Layout.createBtn.with({ boundTestRun: t }));
  await t.wait(2000);
  setTemplate(template);
  console.info(`[app3 ${template}] Page Created`);
};

/**
 * Add Playlist to app3 Layout Page
 * 
 * @param  {string} env
 * @param  {TestController} t
 */
const addPlaylist = async (env, t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  let playlist = 'testing new version change name';
  if (env !== 'prod') { playlist = 'app3 Manual Playlist' };
  await t.click(app3Layout.addPlaylist.with({ boundTestRun: t }));
  await t.typeText(app3Layout.searchPlaylist.with({ boundTestRun: t }), playlist);
  await t.wait(2000);
  await t.hover(app3Layout.playlistMenuList.with({ boundTestRun: t }));
  await t.click(app3Layout.addPlaylistItem.with({ boundTestRun: t }), { offsetX: 0, offsetY: 0 });
  await t.wait(2000);
  await t.click(app3Layout.closePlaylistMenu.with({ boundTestRun: t }), { offsetX: 0, offsetY: 0 });
  console.info(`[app3 ${template}] Added Playlist`);
}

/**
 * Configure Availability
 * 
 * @param  {string} env
 * @param  {TestController} t
 */
const configureAvailability = async (t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  await t.click(app3Layout.configure_bt.with({ boundTestRun: t }));
  await t.click(app3Layout.schedule_ts.with({ boundTestRun: t }));
  await t.click(app3Layout.endTime_cb.with({ boundTestRun: t }));
  await t.wait(2000);
  await t.click(app3Layout.endDate_tb.with({ boundTestRun: t }));
  let futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 5);
  futureDate = futureDate.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  //Set EndDate and time
  await t.typeText(app3Layout.endDate_tb.with({ boundTestRun: t }), futureDate).pressKey('enter');
  await t.click(app3Layout.endDate_tb.with({ boundTestRun: t }));
  await t.pressKey('down').pressKey('down').pressKey('enter');
  await t.wait(2000);
  await t.pressKey('down').pressKey('down').pressKey('enter');
  await t.wait(2000);

  await t.click(app3Layout.devices_ts.with({ boundTestRun: t }));
  await t.click(app3Layout.location_ts.with({ boundTestRun: t }));
  await t.click(app3Layout.roles_ts.with({ boundTestRun: t }));
  await t.click(app3Layout.closePageSetting.with({ boundTestRun: t }));
  console.info(`[app3 ${template}] Configure Availability`);
}

/**
 * Configure Titles & Translations
 * 
 * @param  {TestController} t
 */
const addTitlesTranslations = async (t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  await t.click(app3Layout.configure_bt.with({ boundTestRun: t }));
  await t.click(app3Layout.title.with({ boundTestRun: t }));
  await t.expect(app3Layout.titles_tb.with({ boundTestRun: t }).visible).ok();
  console.info(`[app3 ${template}] Entering titles for each language`);
  let index = 1;
  while (await app3Layout.languages.with({ boundTestRun: t }).nth(index).exists) {
    const language = await app3Layout.languages.with({ boundTestRun: t }).nth(index).innerText;
    await t.typeText(app3Layout.titles_tb.with({ boundTestRun: t }).nth(index), language + ' ' + pageTitle).pressKey('enter');
    index++;
  }
  await t.click(app3Layout.closePageSetting.with({ boundTestRun: t }));
  console.info(`[app3 ${template}] Add Titles and Translations`);
}

/**
 * Configure card Image
 * 
 * @param  {TestController} t
 */
const configureImage = async (t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  await t.click(app3Layout.configure_bt.with({ boundTestRun: t }));
  await t.click(app3Layout.card.with({ boundTestRun: t }));
  await t.setFilesToUpload(app3Layout.imageUploadLandscape.with({ boundTestRun: t }), image_local);
  await Common.waitForElement(true, 10000, app3Layout.landscapeImageUploaded, t);
  await t.setFilesToUpload(app3Layout.imageUploadUltraWide.with({ boundTestRun: t }), image_local);
  await Common.waitForElement(true, 10000, app3Layout.ultrawideImageUploaded, t);
  await t.setFilesToUpload(app3Layout.imageUploadPortrait.with({ boundTestRun: t }), image_local);
  await Common.waitForElement(true, 10000, app3Layout.portraitImageUpload, t);
  await t.click(app3Layout.closePageSetting.with({ boundTestRun: t }));
  console.info(`[app3 ${template}] Configure Image`);
}

/**
 * Validate Layout Preview page
 * 
 * @param  {TestController} t
 */
const validateLayoutPreview = async (t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  if (!(await app3Layout.videoCards.with({ boundTestRun: t }).exists)) {
    if (await app3Layout.pageAlert.with({ boundTestRun: t }).exists) {
      const alertMsg = await app3Layout.pageAlert.with({ boundTestRun: t }).innerText;
      console.info(`Observed an Alert: ${alertMsg}`)
    }
    console.info(`Refresh page`)
    await Common.refresh(t);
  }
  await t.expect(app3Layout.videoCards.with({ boundTestRun: t }).exists).ok();
  console.info(`[app3 ${template}] Validate Layout Preview`);
}

/**
 * Publish page
 * 
 * @param  {TestController} t
 */
const publishPage = async (t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  await t.click(app3Layout.publishPage.with({ boundTestRun: t }));
  await t.click(app3Layout.publish.with({ boundTestRun: t }));
  console.info(`[app3 ${template}] Publish Page`);
  await t.wait(2000);
}

/**
 * Archive Page
 * 
 * @param  {string} env
 * @param  {TestController} t
 */
const archivePage = async (env, t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  await t.click(app3Layout.configure_bt.with({ boundTestRun: t }));
  await t.click(app3Layout.archivePage.with({ boundTestRun: t }));
  await Common.waitForElement(false, 15000, app3Layout.archivePage, t);
  await Common.validateURL(config.app3Layout_Url[env], t);
  console.info(`[app3 ${template}] Archive Page`);
}

module.exports = {
  createPage,
  addPlaylist,
  addTitlesTranslations,
  configureAvailability,
  configureImage,
  validateLayoutPreview,
  publishPage,
  archivePage,
  setTemplate
};