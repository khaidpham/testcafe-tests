const Testcafe = require('testcafe');
const uniqid = require('uniqid');
const fs = require('fs');
const path = require('path');
const {
  Agenda,
  Components,
  EditCollection,
  Interactivity,
  ManageCollection,
  PublishingHeader,
  PublishSiteModal,
  SEO,
  Subnav,
  TemplateSettings,
  Toaster,
  Tracking,
  VideoSetting,
  Player,
  ExperienceOverview,
  TemplateFilterBar,
  Templates,
  Publishedapp1,
  Publishedapp2,
  agenda,
  agendaEvent,
  agendaMeetingEvent,
  people,
  CatalogueHome,
  ImmersionHome,
  LiveEventHome,
  CustomPage,
  CustomPageErrorMsg,
  isErrorCodeMatching,
  PageLink,
  SectionType,
  GetSection,
  TextLineHt,
  TextFontSize,
  moveOptions,
  SharingOptions,
  customSelectAgenda,
  customAgendaWidget,
} = require('../pages');

const config = require('../config.json');
const common_helpers = require('./common_helper_functions');
const _common = require('@example/-testcafe-common');
const { extractAgendaData } = require('./agenda_helper_functions');

const Selector = Testcafe.Selector;
const MAX_RELOADS = 2;
const LOGO_URL = 'https://support.example.com/site-assets/images/site/product-logos/example-black-on-white.svg';
const LOGO_URL_PNG = 'https://solutions.example.com/appls/assets/images/app-logo-2021-blue.png';
const X_FEED_CODE = 'Embedded X Feed Code';
const CHAT_CODE = 'Embedded Chat HTML Code';
const AD_HEADER_CODE = 'Embedded Ad Header Code';
const AD_UNIT_CODE = 'Embedded Ad Unit Code';
let hasCollection = false;

const nowDate = new Date().toLocaleString();

const TEMPLATE = {
  CATALOGUE: 'Catalogue',
  CHRONICLE: 'Chronicle',
  CLASSIC: 'Classic',
  DISCOVERY: 'Discovery',
  IMMERSION: 'Immersion',
  LANDINGPAGE: 'Landing Page',
  LIVEEVENTapp1: 'Live Event app1',
  MARQUEE: 'Marquee',
  MOSAIC: 'Mosaic',
  PUBLISHER: 'Publisher',
  SHOWCASE: 'Showcase',
  VIRTUALEVENT: 'Virtual Event',
};

const minimist = require('minimist');
const args = minimist(process.argv.slice(2), {
  default: {
    env: 'qa'
  }
});
const env = args.env;

fs.mkdirSync('./output_files', { recursive: true });

/**
 * Get Browser URL
 * @param  {TestController} t - TestController
 */
const getURL = async (t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  return await Testcafe.ClientFunction(() => document.location.href).with({ boundTestRun: t })();
};

/**
 * Reload the page
 * @param  {TestController} t - TestController
 */
const reload = async (t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  Testcafe.ClientFunction(() => document.location.reload()).with({ boundTestRun: t })();
};

/** 
 * Get Current time in HH:MM:SS
 */
function getTime() {
  const now = new Date();
  function formatTimeUnit(unit) {
    return unit < 10 ? `0${unit}` : unit;
  }
  const hours = formatTimeUnit(now.getHours());
  const minutes = formatTimeUnit(now.getMinutes());
  const seconds = formatTimeUnit(now.getSeconds());

  return `${hours}:${minutes}:${seconds}`;
};

/**
 * Login with a random automation account
 * @param  {string} env - environment
 * @param  {TestController} t - TestController
 */
const login = async (env, t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  const profile = config.users[Math.floor(Math.random() * config.users.length)];
  console.info(`[${getTime()}] Signing in ${env} with:`, profile[0]);
  await t.typeText('#email', profile[0] + '@example.com', { replace: true, paste: true });
  if (await Selector('#continueButton').with({ boundTestRun: t }).exists) {
    await t.click('#continueButton');
  }
  if (env === 'qa') {
    await t.typeText('#password', 'joejoe', { replace: true, paste: true });
  } else {
    await t.typeText('#password', profile[1], { replace: true, paste: true });
  }
  await t.click('#signinButton');
  console.info(`Current URL: ${await getURL(t)}`);
};

/**
 * Login with a specific username and password
 * @param  {string} env - environmnet
 * @param  {string} email - email
 * @param  {string} password - password
 * @param  {TestController} t - TestController
 */
const login_user = async (env, email, password, t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  console.info(`[${getTime()}] Signing in ${env} with:`, email);
  await t.typeText('#email', email, { replace: true, paste: true });
  if (await Selector('#continueButton').exists) {
    await t.click('#continueButton');
  }
  await t.typeText('#password', password, { replace: true, paste: true });
  await t.click('#signinButton');
  console.info(`Current URL: ${await getURL(t)}`);
};

/**
 * Open a template type filter tab
 * @param  {string} templateType
 * @param  {TestController} t - TestController
 */
const filterTemplate = async (templateType, t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  switch (templateType) {
    case 'All':
      await t.expect(TemplateFilterBar.all.with({ boundTestRun: t }).visible).ok('', { timeout: 30000 });
      await t.click(TemplateFilterBar.all.with({ boundTestRun: t }));
      break;
    case 'app1':
      await t.expect(TemplateFilterBar.app1.with({ boundTestRun: t }).visible).ok('', { timeout: 60000 });
      await t.click(TemplateFilterBar.app1.with({ boundTestRun: t }));
      break;
    case 'In-Page':
      await t.expect(TemplateFilterBar.inpage.with({ boundTestRun: t }).visible).ok('', { timeout: 30000 });
      await t.click(TemplateFilterBar.inpage.with({ boundTestRun: t }));
      break;
    case TEMPLATE.LANDINGPAGE:
      await t.expect(TemplateFilterBar.landingpage.with({ boundTestRun: t }).visible).ok('', { timeout: 30000 });
      await t.click(TemplateFilterBar.landingpage.with({ boundTestRun: t }));
      break;
    case 'Event':
      await t.expect(TemplateFilterBar.event.with({ boundTestRun: t }).visible).ok('', { timeout: 30000 });
      await t.click(TemplateFilterBar.event.with({ boundTestRun: t }));
      break;
    case 'Custom':
      await t.expect(TemplateFilterBar.custom.with({ boundTestRun: t }).visible).ok('', { timeout: 30000 });
      await t.click(TemplateFilterBar.custom.with({ boundTestRun: t }));
      break;
  }
};

/**
 * Find and Choose the specified template = require(Create Experience page
 * @param  {string} templateName
 * @param  {string} templateType='app1'
 * @param  {TestController} t
 */
const selectTemplate = async (templateName, templateType = 'app1', t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  await common_helpers.dismiss_app_privacy(t);
  await filterTemplate(templateType, t);
  console.info(`[${getTime()}] [${templateName}] Looking for template: ${templateName}`);
  await t.expect(Templates.templateTitle.with({ boundTestRun: t }).visible).ok();
  let numberOfTemplates = await Templates.templateTitle.with({ boundTestRun: t }).count;
  console.info(`[${getTime()}] [${templateName}] Found: ${numberOfTemplates} ${templateType} Templates`);

  // choose template based on template name
  switch (templateName) {
    case TEMPLATE.CLASSIC:
      console.info(`[${getTime()}] [${templateName}] Choose ${templateName} template`);
      await t.click(Templates.templateChooseClassic.with({ boundTestRun: t }));
      break;
    case TEMPLATE.MARQUEE:
      console.info(`[${getTime()}] [${templateName}] Choose ${templateName} template`);
      await t.click(Templates.templateChooseMarquee.with({ boundTestRun: t }));
      break;
    case TEMPLATE.MOSAIC:
      console.info(`[${getTime()}] [${templateName}] Choose ${templateName} template`);
      await t.click(Templates.templateChooseMosaic.with({ boundTestRun: t }));
      break;
    default: // for other templates
      let count = 0;
      while (numberOfTemplates === 0) {
        if (count === MAX_RELOADS) {
          throw new Error(`[${getTime()}] [${templateName}] Did not find any matching Templates`);
        }
        console.info(`[${getTime()}] [${templateName}] Did not find any Templates, reloading page (${count})!`);
        await reload(t);
        await filterTemplate(templateType, t);
        numberOfTemplates = await Templates.templateTitle.with({ boundTestRun: t }).count;
        console.info(`[${getTime()}] [${templateName}] Found: ${numberOfTemplates} ${templateType} Templates`);
        count += 1;
      }
      for (let i = 0; i < numberOfTemplates; i++) {
        if (await Templates.templateTitle.with({ boundTestRun: t }).nth(i).innerText === templateName) {
          console.info(`[${getTime()}] [${templateName}] Choose ${templateName} template`);
          await t.click(Templates.templateChooseBtn.with({ boundTestRun: t }).nth(i));
          break;
        }
      }
      break;
  }
};

/**
 * Create new app1 experiences and pre-populate experience when available
 * @param  {string} templateName
 * @param  {string} templateType='app1'
 * @param  {string} ga='GA4'
 * @param  {TestController} t
 */
const createExperience = async (templateName, templateType = 'app1', ga = 'GA4', t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  console.info(`[${getTime()}] [${templateName}] Creating ${templateName} experience`);
  hasCollection = false;
  const experienceTitle = Selector(value => {
    return document.querySelector(`input[value="${value}"]`);
  });
  const title = await Selector(experienceTitle(`${templateName} Experience`));
  await t.typeText(title.with({ boundTestRun: t }), ` - Automation test - ${nowDate} - ${ga}`, { paste: true });
  if (templateType === 'app1' || templateName === TEMPLATE.VIRTUALEVENT) {
    await t.click(ExperienceOverview.populateExperience.with({ boundTestRun: t }));
  }
  await t.click(ExperienceOverview.createExperienceBtn.with({ boundTestRun: t }));
};

/**
 * Validate Home Page Preview
 * @param  {string} templateName
 * @param  {TestController} t
 */
const validateHomePagePreview = async (templateName, t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  switch (templateName) {
    case TEMPLATE.IMMERSION:
      if (!hasCollection) {
        console.info(`[${getTime()}] [${templateName}] Validate Home page editor elements`);
        // check for Home page navigation to make sure experience is loaded in editor
        await t.expect(Subnav.pages_Home.with({ boundTestRun: t }).exists).ok({ timeout: 15000 });
        await t.switchToIframe(ImmersionHome.iframe);
        await t.expect(ImmersionHome.addLogo.with({ boundTestRun: t, timeout: 15000 }).innerText).eql('Add logo');
        await t.expect(ImmersionHome.addMenuItem.with({ boundTestRun: t }).innerText).eql('Add menu item');
        await t.expect(ImmersionHome.addVideos.with({ boundTestRun: t }).innerText).eql('Add Videos');
        await t.switchToMainWindow();
        break;
      } else {
        console.info(`[${getTime()}] [${templateName}] Validate Logo upload in Home Page`);
        await t.click(Subnav.pages_Home.with({ boundTestRun: t }));
        await t.switchToIframe(Selector(ImmersionHome.iframe).with({ boundTestRun: t }));
        await t.wait(3000);
        await t.expect(ImmersionHome.addLogo.with({ boundTestRun: t, timeout: 15000 }).innerText).eql('Add logo');
        await t.click(ImmersionHome.addLogo.with({ boundTestRun: t }));
        await t.switchToMainWindow();
        await t.click(ImmersionHome.imageUrl.with({ boundTestRun: t }));
        await t.typeText(ImmersionHome.imageUrlText.with({ boundTestRun: t }), LOGO_URL_PNG);
        await t.typeText(ImmersionHome.imageAltText.with({ boundTestRun: t }), 'appOV');
        await t.typeText(ImmersionHome.companyName.with({ boundTestRun: t }), 'example');
        await t.click(ImmersionHome.save.with({ boundTestRun: t }));
        await t.switchToIframe(Selector(ImmersionHome.iframe).with({ boundTestRun: t }));
        await t.expect(ImmersionHome.logo.with({ boundTestRun: t }).exists).ok({ timeout: 10000 });
        await t.switchToMainWindow();
        break;
      }
    case TEMPLATE.CATALOGUE:
      console.info(`[${getTime()}] [${templateName}] Validate Home page`);
      // Validate Editing Header
      await waitForPageRefresh(t, common_helpers.waitOption.previewLoader, 10000, true);
      await t.wait(5000);
      await t.expect(CatalogueHome.headerContainer.with({ boundTestRun: t, visibilityCheck: true }).exists, { wait: 15000 }).ok({ timeout: 15000 });
      await t.expect(CatalogueHome.headerLogo.with({ boundTestRun: t }).innerText).contains('Home');
      await t.expect(CatalogueHome.headerEditPencilIcon.with({ boundTestRun: t, visibilityCheck: true }).exists).ok({ timeout: 5000 });
      await t.wait(5000);
      await t.hover(CatalogueHome.headerTitle.with({ boundTestRun: t }));
      await t.wait(2000);
      await t.click(CatalogueHome.editOverlay_btn.with({ boundTestRun: t }));
      await t.switchToMainWindow();
      await t.typeText(CatalogueHome.headerTitle_txt.with({ boundTestRun: t }), templateName);
      await t.click(CatalogueHome.headerSave.with({ boundTestRun: t }));
      await t.switchToIframe(CatalogueHome.iframe);
      await t.expect(CatalogueHome.getHeaderTitle.with({ boundTestRun: t, visibilityCheck: true }).exists).ok({ timeout: 10000 });
      await t.expect(CatalogueHome.getHeaderTitle.with({ boundTestRun: t }).innerText).contains(templateName);
      // Validate Editing Footer
      await t.scroll(CatalogueHome.body, 'bottomRight');
      await t.expect(CatalogueHome.footerList_1.with({ boundTestRun: t }).exists).ok({ timeout: 10000 });
      await t.expect(CatalogueHome.footerList_1.with({ boundTestRun: t }).innerText).contains('Careers');
      await t.click(CatalogueHome.footerList_2.with({ boundTestRun: t }));
      await t.switchToMainWindow();
      await t.expect(CatalogueHome.footerEditModelWindow.with({ boundTestRun: t }).exists).ok({ timeout: 5000 });
      await t.typeText(CatalogueHome.footerText_txt.with({ boundTestRun: t }), templateName);
      await t.click(CatalogueHome.footerSave_btn.with({ boundTestRun: t }));
      await t.switchToIframe(CatalogueHome.iframe);
      await t.scroll(CatalogueHome.body, 'bottomRight');
      await t.expect(CatalogueHome.footerList_2.with({ boundTestRun: t }).exists).ok({ timeout: 10000 });
      await t.expect(CatalogueHome.footerList_2.with({ boundTestRun: t }).innerText).contains(templateName);
      await t.switchToMainWindow();
      break;
    case TEMPLATE.LIVEEVENTapp1:
      console.info(`[${getTime()}] [${templateName}] Validate Home page BG Image`);
      await t.switchToIframe(LiveEventHome.iframe);
      await t.wait(5000);
      await t.expect(LiveEventHome.bgImage.with({ boundTestRun: t, visibilityCheck: true }).exists).ok({ timeout: 10000 });
      await t.click(LiveEventHome.editBgImage_button.with({ boundTestRun: t }));
      await t.switchToMainWindow();
      await t.expect(LiveEventHome.editBGDragDropUpload.with({ boundTestRun: t }).exists).ok({ timeout: 10000 });
      await t.expect(LiveEventHome.editBGChooseUpload.with({ boundTestRun: t }).exists).ok({ timeout: 10000 });
      await t.expect(LiveEventHome.editBGSaveBtn.with({ boundTestRun: t }).exists).ok({ timeout: 10000 });
      await t.expect(LiveEventHome.editBGCancelBtn.with({ boundTestRun: t }).exists).ok({ timeout: 10000 });
      await t.click(LiveEventHome.editBGCancelBtn.with({ boundTestRun: t }));
      await t.switchToIframe(LiveEventHome.iframe);
      await t.expect(LiveEventHome.bgImage.with({ boundTestRun: t }).exists).ok({ timeout: 10000 });
      await t.switchToMainWindow();
      break;
    // For all other templates
    default:
      break;
  }
};

/**
 * Enable Search setting
 * @param  {string} templateName
 * @param  {TestController} t
 */
const enableSearch = async (templateName, t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  console.info(`[${getTime()}] [${templateName}] Enabling search on ${templateName}`);
  if (await Toaster.x.with({ boundTestRun: t }).exists) { await t.click(Toaster.x.with({ boundTestRun: t })); }
  if (await Subnav.pages.with({ boundTestRun: t }).getAttribute('aria-expanded') === 'true') { await t.click(Subnav.pages.with({ boundTestRun: t })); }
  await t
    .expect(Subnav.siteFeatures.with({ boundTestRun: t }).visible).ok('', { timeout: 3000 })
    .click(Subnav.siteFeatures.with({ boundTestRun: t }))
    .expect(Subnav.siteFeatures_SiteSearch.with({ boundTestRun: t }).visible).ok('', { timeout: 3000 })
    .click(Subnav.siteFeatures_SiteSearch.with({ boundTestRun: t }))
    .expect(Subnav.enable_search.with({ boundTestRun: t }).visible).ok('', { timeout: 3000 })
    .click(Subnav.enable_search.with({ boundTestRun: t }))
    .click(Subnav.save_search.with({ boundTestRun: t }))
    .click(Subnav.siteFeatures.with({ boundTestRun: t }));
};

/**
 * Add new collections with different types
 * @param  {string} templateName
 * @param  {string} collectionType
 * @param  {string} collectionOption
 * @param  {string} collectionValue
 * @param  {TestController} t
 */
const createCollection = async (templateName, collectionType, collectionOption, collectionValue, t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  await t.click(Subnav.videos.with({ boundTestRun: t }));
  await t.expect(Subnav.videos.with({ boundTestRun: t }).exists).ok();
  await t.click(ManageCollection.addCollection.with({ boundTestRun: t }));
  await t.expect(ManageCollection.addCollection.with({ boundTestRun: t }).exists).ok();
  await t.typeText(ManageCollection.collectionName.with({ boundTestRun: t }), `${collectionType}`);
  await t.expect(ManageCollection.collectionName.with({ boundTestRun: t }).value).eql(`${collectionType}`, 'Input name');
  await t.click(ManageCollection.addCollection.with({ boundTestRun: t }));
  hasCollection = true;

  switch (`${collectionType}`) {
    case 'Playlist':
      console.info(`[${getTime()}] [${templateName}] Creating video collection of type Playlist`);
      await t.click(ManageCollection.editPlayListCollection.with({ boundTestRun: t }));
      await t.click(EditCollection.radioPlaylistBtn.with({ boundTestRun: t }));
      await t.typeText(EditCollection.playlistText.with({ boundTestRun: t }), `${collectionValue}`);
      await t.wait(2000);
      await t.click(EditCollection.playlistSelect.with({ boundTestRun: t })).expect(EditCollection.playlistSelect.with({ boundTestRun: t }).innerText).contains(`${collectionValue}`, 'Playlist name not present');
      await t.expect(parseInt(await EditCollection.videoCount.with({ boundTestRun: t }).innerText, 10)).gt(0, 'Video should be greater than 0');
      break;

    case 'Custom Tags':
      console.info(`[${getTime()}] [${templateName}] Creating video collection of type Custom Tags`);
      await t.click(ManageCollection.editCustomTagsCollection.with({ boundTestRun: t }));
      await t.click(EditCollection.radioCustomBtn.with({ boundTestRun: t }));
      await t.click(EditCollection.dropDown.with({ boundTestRun: t }));
      await t.click(EditCollection.dropDown.with({ boundTestRun: t }).find('option').withExactText(`${collectionOption}`));
      break;

    case 'Custom Search':
      console.info(`[${getTime()}] [${templateName}] Creating video collection of type Custom Search`);
      await t.click(ManageCollection.editCustomSearchCollection.with({ boundTestRun: t }));
      await t.click(EditCollection.radioCustomBtn.with({ boundTestRun: t }));
      await t.click(EditCollection.dropDown.with({ boundTestRun: t }));
      await t.click(EditCollection.dropDown.with({ boundTestRun: t }).find('option').withExactText(`${collectionOption}`));
      break;

    case 'Custom Field':
      console.info(`[${getTime()}] [${templateName}] Creating video collection of type Custom Field`);
      await t.click(ManageCollection.editCustomFieldCollection.with({ boundTestRun: t }));
      await t.click(EditCollection.radioCustomBtn.with({ boundTestRun: t }));
      await t.click(EditCollection.dropDown.with({ boundTestRun: t }));
      await t.click(EditCollection.dropDown.with({ boundTestRun: t }).find('option').withExactText(`${collectionOption}`));
      break;
  }
  // Edit collection option and validate collection has videos
  switch (`${collectionOption}`) {
    case 'Tags':
      await t.typeText(EditCollection.selectedText.with({ boundTestRun: t }), `${collectionValue}`)
        .pressKey('enter');
      await t.wait(2000);
      await t.expect(parseInt(await EditCollection.videoCount.with({ boundTestRun: t }).innerText, 10), { wait: 4000 }).gt(0, 'Video should be greater than 0');
      break;
    case 'Search':
      await t.typeText(EditCollection.selectedText.with({ boundTestRun: t }), `${collectionValue}`)
        .pressKey('enter');
      await t.wait(2000);
      await t.expect(parseInt(await EditCollection.videoCount.with({ boundTestRun: t }).innerText, 10), { wait: 4000 }).gt(0, 'Video should be greater than 0');
      break;
    case 'Custom Field':
      await t.typeText(EditCollection.customFieldName.with({ boundTestRun: t }), 'Tags')
        .pressKey('enter');
      await t.typeText(EditCollection.customFieldValue.with({ boundTestRun: t }), `${collectionValue}`)
        .pressKey('enter');
      await t.wait(2000);
      await t.expect(parseInt(await EditCollection.videoCount.with({ boundTestRun: t }).innerText, 10), { wait: 4000 }).gt(0, 'Video should be greater than 0');
      break;
  }
  await t.click(EditCollection.saveBtn.with({ boundTestRun: t }));
};

/**
 * Add a single video to the collection
 * @param  {string} templateName
 * @param  {TestController} t
 */
const addVideo = async (templateName, t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  console.info(`[${getTime()}] Adding single video to ${templateName} experience`);
  await t
    .click(Subnav.videos.with({ boundTestRun: t }))
    .click(Subnav.firstVideo.with({ boundTestRun: t }))
    .click(Subnav.saveVideo.with({ boundTestRun: t }));
};

/**
 * Add a configuruable number of videos to the experience
 * @param  {string} templateName
 * @param  {number} number=1
 * @param  {TestController} t
 */
const app2AddVideos = async (templateName, number = 1, t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  console.info(`[${getTime()}] [${templateName}] Adding ${number} videos`);
  await t.expect(Subnav.videosapp2.with({ boundTestRun: t }).visible).ok('Wait until Interactivity.linkText is visible');
  await t.click(Subnav.videosapp2.with({ boundTestRun: t }));

  // Select or Add Video based on template name
  switch (templateName) {
    case 'Single Video': case 'Single Video QA': case 'Single Video Latest':
      await t.expect(Subnav.videos_SelectVideo.with({ boundTestRun: t }).visible).ok();
      await t.click(Subnav.videos_SelectVideo.with({ boundTestRun: t }));
      break;
    case 'Live Event In-Page': case 'Live Event In-Page QA': case 'Live Event In-Page Latest':
      await t.expect(Subnav.videos_SelectVideos.with({ boundTestRun: t }).visible).ok();
      await t.click(Subnav.videos_SelectVideos.with({ boundTestRun: t }));
      break;
    default:
      await t.expect(Subnav.videos_AddVideos.with({ boundTestRun: t }).visible).ok();
      await t.click(Subnav.videos_AddVideos.with({ boundTestRun: t }));
      break;
  }
  await t.expect(Subnav.videos_app2Videos.with({ boundTestRun: t }).visible).ok();

  if (number === 1) {
    // add one video as default
    await t.click(Subnav.videos_app2Videos.with({ boundTestRun: t }));
  } else {
    // add specified number of videos
    for (const x of Array(number).keys()) {
      await t.click(Subnav.videos_app2Videos.with({ boundTestRun: t }).nth(x));
    }
  }
  // Select or Add button based on template name
  switch (templateName) {
    case 'Single Video': case 'Single Video QA': case 'Single Video Latest':
      await t.click(Subnav.videos_SelectButton.with({ boundTestRun: t }));
      break;
    case 'Live Event In-Page': case 'Live Event In-Page QA': case 'Live Event In-Page Latest':
      await t.click(Subnav.videos_SelectButton.with({ boundTestRun: t }));
      break;
    default:
      await t.click(Subnav.videos_AddButton.with({ boundTestRun: t }));
      break;
  }
};

/**
 * Add components to In-page experience
 * @param  {string} templateName
 * @param  {TestController} t
 */
const app2AddComponents = async (templateName, t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  console.info(`[${getTime()}] [${templateName}] Adding Component - Top - Image`);
  await t.expect(Components.top.with({ boundTestRun: t }).visible).ok();
  await t.click(Components.top.with({ boundTestRun: t }));
  await t.wait(1000);
  await t.expect(Components.image.with({ boundTestRun: t, visibilityCheck: true }).exists).ok({ timeout: 10000 });
  await t.click(Components.image.with({ boundTestRun: t, timeout: 10000 }));
  await t.expect(Components.imageURL.with({ boundTestRun: t, visibilityCheck: true }).exists).ok({ timeout: 10000 });
  await t.typeText(Components.imageURL.with({ boundTestRun: t, timeout: 10000 }), LOGO_URL, { paste: true });
  await t.click(Components.imageAdd.with({ boundTestRun: t }));
  await t.click(Components.imageSize.with({ boundTestRun: t }));
  await t.typeText(Components.imageW.with({ boundTestRun: t }), '300', { replace: true, paste: true });
  await t.typeText(Components.imageH.with({ boundTestRun: t }), '50', { replace: true, paste: true });
  await t.click(Components.imageAlignCenter.with({ boundTestRun: t }));
  await t.typeText(Components.imageLinkURL.with({ boundTestRun: t }), 'https://example.com', { replace: true, paste: true });
  await t.click(Components.imageLinkNewWindow.with({ boundTestRun: t }));
  if (templateName.includes('Live Event')) {
    await t.click(Components.liveEvent.with({ boundTestRun: t }));
    await t.click(Components.postEvent.with({ boundTestRun: t }));
  } else {
    await t.click(Components.duringPlay.with({ boundTestRun: t }));
    await t.click(Components.afterPlay.with({ boundTestRun: t }));
  }
  await t.click(Components.save.with({ boundTestRun: t }));

  console.info(`[${getTime()}] [${templateName}] Adding Component - Bottom - Text`);
  await t.click(Components.bottom.with({ boundTestRun: t }));
  await t.click(Components.text.with({ boundTestRun: t }));
  await t.pressKey('C o m p o n e n t : T e x t');
  if (templateName.includes('Live Event')) {
    await t.click(Components.liveEvent.with({ boundTestRun: t }));
    await t.click(Components.postEvent.with({ boundTestRun: t }));
  } else {
    await t.click(Components.duringPlay.with({ boundTestRun: t }));
    await t.click(Components.afterPlay.with({ boundTestRun: t }));
  }
  await t.click(Components.save.with({ boundTestRun: t }));

  console.info(`[${getTime()}] [${templateName}] Adding Component - Right - Feed`);
  await t.click(Components.right.with({ boundTestRun: t }));
  await t.click(Components.feed.with({ boundTestRun: t }));
  await t.typeText(Components.feedCode, `${X_FEED_CODE}`, { paste: true });
  if (templateName.includes('Live Event')) {
    await t.click(Components.liveEvent.with({ boundTestRun: t }));
    await t.click(Components.postEvent.with({ boundTestRun: t }));
  } else {
    await t.click(Components.duringPlay.with({ boundTestRun: t }));
    await t.click(Components.afterPlay.with({ boundTestRun: t }));
  }
  await t.click(Components.save.with({ boundTestRun: t }));

  console.info(`[${getTime()}] [${templateName}] Adding Component - Top - Custom`);
  await t.click(Components.top.with({ boundTestRun: t }));
  await t.click(Components.custom.with({ boundTestRun: t }));
  await t.typeText(Components.customCode.with({ boundTestRun: t }), `<h2 align="center">Custom HTML: ${templateName}</h2>`, { paste: true });
  if (templateName.includes('Live Event')) {
    await t.click(Components.liveEvent.with({ boundTestRun: t }));
    await t.click(Components.postEvent.with({ boundTestRun: t }));
  } else {
    await t.click(Components.duringPlay.with({ boundTestRun: t }));
    await t.click(Components.afterPlay.with({ boundTestRun: t }));
  }
  await t.click(Components.save.with({ boundTestRun: t }));

  console.info(`[${getTime()}] [${templateName}] Adding Component - Top - Chat`);
  await t.click(Components.top.with({ boundTestRun: t }));
  await t.click(Components.chat.with({ boundTestRun: t }));
  await t.typeText(Components.chatCode.with({ boundTestRun: t }), `${CHAT_CODE}`, { paste: true });
  if (templateName.includes('Live Event')) {
    await t.click(Components.liveEvent.with({ boundTestRun: t }));
    await t.click(Components.postEvent.with({ boundTestRun: t }));
  } else {
    await t.click(Components.duringPlay.with({ boundTestRun: t }));
    await t.click(Components.afterPlay.with({ boundTestRun: t }));
  }
  await t.click(Components.save.with({ boundTestRun: t }));

  console.info(`[${getTime()}] [${templateName}] Adding Component - Top - Ad`);
  await t.click(Components.top.with({ boundTestRun: t }));
  await t.click(Components.ad.with({ boundTestRun: t }));
  await t.typeText(Components.adHeader.with({ boundTestRun: t }), `${AD_HEADER_CODE}`, { paste: true });
  await t.typeText(Components.adUnit.with({ boundTestRun: t }), `${AD_UNIT_CODE}`, { paste: true });
  if (templateName.includes('Live Event')) {
    await t.click(Components.liveEvent.with({ boundTestRun: t }));
    await t.click(Components.postEvent.with({ boundTestRun: t }));
  } else {
    await t.click(Components.duringPlay.with({ boundTestRun: t }));
    await t.click(Components.afterPlay.with({ boundTestRun: t }));
  }
  await t.click(Components.save.with({ boundTestRun: t }));
};

/**
 * Add Interactivities to In-page experience
 * @param  {string} templateName
 * @param  {TestController} t
 */
const app2AddInteractivities = async (templateName, t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  console.info(`[${getTime()}] [${templateName}] Adding Video Interactivity - Link`);
  await t.expect(Interactivity.iLink.with({ boundTestRun: t }).visible).ok();
  await t.click(Interactivity.iLink.with({ boundTestRun: t }));
  await t.expect(Interactivity.link.with({ boundTestRun: t }).visible).ok();
  await t.click(Interactivity.link.with({ boundTestRun: t }));
  await t.expect(Interactivity.linkText.with({ boundTestRun: t }).visible).ok();
  await t.click(Interactivity.linkText.with({ boundTestRun: t }), { offsetX: 0, offsetY: 0 });
  await t.typeText(Interactivity.linkText.with({ boundTestRun: t }), 'example', { paste: true });
  await t.click(Interactivity.linkURL.with({ boundTestRun: t }));
  await t.typeText(Interactivity.linkURL.with({ boundTestRun: t }), 'https://example.com', { paste: true });
  await t.click(Interactivity.configure.with({ boundTestRun: t }));
  await t.typeText(Interactivity.start.with({ boundTestRun: t }), '1', { replace: true });
  await t.typeText(Interactivity.duration.with({ boundTestRun: t }), '3', { replace: true });
  await t.click(Interactivity.applyAll.with({ boundTestRun: t }));
  await t.click(Interactivity.save.with({ boundTestRun: t }));
  await t.click(Interactivity.close.with({ boundTestRun: t }));

  console.info(`[${getTime()}] [${templateName}] Adding Video Interactivity - Card`);
  await t.click(Interactivity.iCard.with({ boundTestRun: t }));
  await t.click(Interactivity.cardImageUrl.with({ boundTestRun: t }));
  await t.typeText(Interactivity.cardImageUrl.with({ boundTestRun: t }), LOGO_URL, { paste: true });
  await t.click(Interactivity.cardImageAdd.with({ boundTestRun: t }));
  await t.click(Interactivity.cardTitle.with({ boundTestRun: t }));
  await t.typeText(Interactivity.cardTitle.with({ boundTestRun: t }), 'Card Interactivity', { paste: true });
  await t.click(Interactivity.cardLinkText.with({ boundTestRun: t }));
  await t.typeText(Interactivity.cardLinkText.with({ boundTestRun: t }), 'example', { paste: true });
  await t.click(Interactivity.cardLinkURL.with({ boundTestRun: t }));
  await t.typeText(Interactivity.cardLinkURL.with({ boundTestRun: t }), 'https://example.com', { paste: true });
  await t.click(Interactivity.configure.with({ boundTestRun: t }));
  await t.typeText(Interactivity.start.with({ boundTestRun: t }), '5', { replace: true, paste: true });
  await t.typeText(Interactivity.duration.with({ boundTestRun: t }), '3', { replace: true, paste: true });
  await t.click(Interactivity.applyAll.with({ boundTestRun: t }));
  await t.click(Interactivity.save.with({ boundTestRun: t }));
  await t.click(Interactivity.close.with({ boundTestRun: t }));

  console.info(`[${getTime()}] [${templateName}] Adding Video Interactivity - HTML`);
  await t.click(Interactivity.iHTML.with({ boundTestRun: t }));
  await t.typeText(Interactivity.comHTMLCode.with({ boundTestRun: t }), '<h2>Companion Custom HTML</h2>', { paste: true });
  await t.click(Interactivity.configure.with({ boundTestRun: t }));
  await t.typeText(Interactivity.start.with({ boundTestRun: t }), '9', { replace: true });
  await t.typeText(Interactivity.duration.with({ boundTestRun: t }), '3', { replace: true });
  await t.click(Interactivity.applyAll.with({ boundTestRun: t }));
  await t.click(Interactivity.save.with({ boundTestRun: t }));
  await t.click(Interactivity.close.with({ boundTestRun: t }));

  console.info(`[${getTime()}] [${templateName}] Adding Video Interactivity - Image`);
  await t.click(Interactivity.iImage.with({ boundTestRun: t }));
  await t.click(Interactivity.comImageUrl.with({ boundTestRun: t }));
  await t.typeText(Interactivity.comImageUrl.with({ boundTestRun: t }), LOGO_URL, { paste: true });
  await t.click(Interactivity.comImageAdd.with({ boundTestRun: t }));
  await t.click(Interactivity.comImageLinkUrl.with({ boundTestRun: t }));
  await t.typeText(Interactivity.comImageLinkUrl.with({ boundTestRun: t }), 'https://example.com', { paste: true });
  await t.click(Interactivity.comImageLinkNewWindow.with({ boundTestRun: t }));
  await t.click(Interactivity.configure.with({ boundTestRun: t }));
  await t.typeText(Interactivity.start.with({ boundTestRun: t }), '13', { replace: true, paste: true });
  await t.typeText(Interactivity.duration.with({ boundTestRun: t }), '3', { replace: true, paste: true });
  await t.click(Interactivity.applyAll.with({ boundTestRun: t }));
  await t.click(Interactivity.save.with({ boundTestRun: t }));
  await t.click(Interactivity.close.with({ boundTestRun: t }));

  console.info(`[${getTime()}] [${templateName}] Adding Video Interactivity - Text`);
  await t.click(Interactivity.iText.with({ boundTestRun: t }));
  await t.pressKey('I n t e r a c t i v i t y : T e x t');
  await t.click(Interactivity.configure.with({ boundTestRun: t }));
  await t.typeText(Interactivity.start.with({ boundTestRun: t }), '17', { replace: true, paste: true });
  await t.typeText(Interactivity.duration.with({ boundTestRun: t }), '3', { replace: true, paste: true });
  await t.click(Interactivity.applyAll.with({ boundTestRun: t }));
  await t.click(Interactivity.save.with({ boundTestRun: t }));
  await t.click(Interactivity.close.with({ boundTestRun: t }));
};

/**
 * Add Google Analytics Tracking ID to In-Page experience
 * @param  {string} templateName
 * @param  {string} ga
 * @param  {TestController} t
 */
const app2AddTracking = async (templateName, ga, t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  const trackingId = config.analytics_google[ga];
  if (trackingId === '') { return; }
  console.info(`[${getTime()}] [${templateName}] Adding ${ga} Google Analytics Tracking ID`);
  if (await Toaster.x.with({ boundTestRun: t }).exists) { await t.click(Toaster.x.with({ boundTestRun: t })); }
  await t.expect(Subnav.app2Settings.with({ boundTestRun: t }).visible).ok('', { timeout: 3000 });
  await t.click(Subnav.app2Settings.with({ boundTestRun: t }));
  await t.expect(Subnav.app2Settings_Tracking.with({ boundTestRun: t }).visible).ok('', { timeout: 3000 });
  await t.scrollIntoView(Subnav.app2Settings_Tracking.with({ boundTestRun: t }));
  await t.click(Subnav.app2Settings_Tracking.with({ boundTestRun: t }));
  await t.click(Tracking.app2GA.with({ boundTestRun: t }));
  await t.typeText(Tracking.app2GA.with({ boundTestRun: t }), trackingId, { paste: true });
  console.info(`[${getTime()}] [${templateName}] Added Google Analytics Tracking ID: ${trackingId}`);
  await t.click(Tracking.save.with({ boundTestRun: t }));
  await t.click(Subnav.app2Settings.with({ boundTestRun: t }));
};

/**
 * Add Google Analytics Tracking ID to app1 experience
 * @param  {string} templateName
 * @param  {string} ga
 * @param  {TestController} t
 */
const app1AddTracking = async (templateName, ga, t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  const trackingId = config.analytics_google[ga];
  if (trackingId === '') { return; }
  console.info(`[${getTime()}] [${templateName}] Adding ${ga} Google Analytics Tracking ID`);
  if (await Toaster.x.with({ boundTestRun: t }).exists) { await t.click(Toaster.x.with({ boundTestRun: t })); }
  if (await Subnav.pages.with({ boundTestRun: t }).getAttribute('aria-expanded') === 'true') {
    await t.click(Subnav.pages.with({ boundTestRun: t }));
  }
  await t.expect(Subnav.siteConfiguration.with({ boundTestRun: t }).visible, { wait: 2000 }).ok();
  if (await Subnav.siteConfiguration.with({ boundTestRun: t }).getAttribute('aria-expanded') === 'false') {
    await t.click(Subnav.siteConfiguration.with({ boundTestRun: t }));
  }
  await t.expect(Subnav.siteConfiguration_ThirdParty_Tracking.with({ boundTestRun: t, visibilityCheck: true }).exists, { wait: 2000 }).ok();
  await t.scrollIntoView(Subnav.siteConfiguration_ThirdParty_Tracking.with({ boundTestRun: t }));
  await t.click(Subnav.siteConfiguration_ThirdParty_Tracking.with({ boundTestRun: t }));
  await t.click(Tracking.app1GA.with({ boundTestRun: t }));
  await t.typeText(Tracking.app1GA.with({ boundTestRun: t }), trackingId);
  console.info(`[${getTime()}] [${templateName}] Added Google Analytics Tracking ID: ${trackingId}`);
  await t.click(Tracking.save.with({ boundTestRun: t }));
  await t.click(Subnav.siteConfiguration.with({ boundTestRun: t }));
};

/**
 * Validate and Configure SEO Page
 * @param  {string} templateName
 * @param  {TestController} t
 */
const validateAndConfigureSEO = async (templateName, t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  if (await Subnav.pages.with({ boundTestRun: t }).getAttribute('aria-expanded') === 'true') { await t.click(Subnav.pages.with({ boundTestRun: t })); }
  console.info(`[${getTime()}] [${templateName}] Validate and Configure SEO`);
  // Goto SEO page
  if (await Subnav.siteConfiguration.with({ boundTestRun: t }).getAttribute('aria-expanded') === 'false') {
    await t.click(Subnav.siteConfiguration.with({ boundTestRun: t }));
  }
  await t.expect(Subnav.siteConfiguration_Seo.with({ boundTestRun: t, visibilityCheck: true, timeout: 5000 }).exists, { wait: 5000 }).ok();
  await t.click(Subnav.siteConfiguration_Seo.with({ boundTestRun: t }));
  // Validate and set metaImage
  await t.expect(SEO.metaImage.with({ boundTestRun: t, visibilityCheck: true, timeout: 5000 }).exists, { wait: 5000 }).ok();
  await t.typeText(SEO.imageURL.with({ boundTestRun: t }), LOGO_URL, { paste: true });
  await t.click(SEO.addImage.with({ boundTestRun: t }));
  await t.scrollIntoView(SEO.metaImage.with({ boundTestRun: t }));
  // Validate and set keywords
  await t.expect(SEO.keywords.with({ boundTestRun: t }).visible, { wait: 2000 }).ok();
  await t.typeText(SEO.keywords.with({ boundTestRun: t }), templateName).pressKey('enter');
  // Validate and set metaTags
  await t.expect(SEO.metaTags.with({ boundTestRun: t }).visible, { wait: 2000 }).ok();
  await t.typeText(SEO.metaTags.with({ boundTestRun: t }), `<meta name="templateName" content="${templateName}">`, { paste: true }).pressKey('enter');
  // Validate and set useDescriptionCB
  await t.expect(SEO.useDescriptionCB.with({ boundTestRun: t }).visible, { wait: 2000 }).ok();
  await t.click(SEO.useDescriptionCB.with({ boundTestRun: t }));
  // Validate and set CustomVideoFieldsCB
  await t.expect(SEO.useCustomVideoFieldsCB.with({ boundTestRun: t }).visible, { wait: 2000 }).ok();
  await t.click(SEO.useCustomVideoFieldsCB.with({ boundTestRun: t }));
  // Validate and set useCanonicalUrlCB
  await t.expect(SEO.useCanonicalUrlCB.with({ boundTestRun: t }).visible, { wait: 2000 }).ok();
  await t.click(SEO.useCanonicalUrlCB.with({ boundTestRun: t }));
  // GT-8316 Validate and set disableVideoTitleCB based on template
  if (templateName === TEMPLATE.IMMERSION) {
    await t.expect(SEO.disableVideoTitleCB.with({ boundTestRun: t }).exists).notOk();
  } else {
    await t.expect(SEO.disableVideoTitleCB.with({ boundTestRun: t }).exists).ok();
    await t.click(SEO.disableVideoTitleCB.with({ boundTestRun: t }));
  }
  // Validate and set useVideoTagsCB, skip for 'Landing Page' Template
  if (templateName !== TEMPLATE.LANDINGPAGE) {
    await t.expect(SEO.useVideoTagsCB.with({ boundTestRun: t }).exists).ok();
    await t.click(SEO.useVideoTagsCB.with({ boundTestRun: t }));
  }
  // Save SEO configuration
  await t.click(SEO.save.with({ boundTestRun: t }));
  await t.click(Subnav.siteConfiguration.with({ boundTestRun: t }));
};

/**
 * Enable video download in app2
 * @param  {} templateName
 * @param  {} templateType
 * @param  {} t
 */
const enableDownload = async (templateName, templateType, t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  console.info(`[${getTime()}] [${templateName}] Enable Video Download on ${templateName} experience`);
  switch (templateType) {
    case 'In-Page':
      await t.click(Subnav.app2Settings.with({ boundTestRun: t }));
      await t.expect(Subnav.app2Settings_Video.with({ boundTestRun: t }).visible).ok();
      await t.click(Subnav.app2Settings_Video.with({ boundTestRun: t }));
      await t.expect(VideoSetting.app2VideosDownload.with({ boundTestRun: t }).visible).ok();
      await t.click(VideoSetting.app2VideosDownload.with({ boundTestRun: t }));
      await t.expect(VideoSetting.app2SaveBtn.withAttribute('aria-disabled').with({ boundTestRun: t }).exists)
        .notOk('Wait for save button to get enabled', { timeout: 2000 });
      await t.click(VideoSetting.app2SaveBtn.with({ boundTestRun: t }));
      await t.click(Subnav.app2Settings.with({ boundTestRun: t }));
      break;
    case 'app1':
      if (await Subnav.pages.with({ boundTestRun: t }).getAttribute('aria-expanded') === 'true') { await t.click(Subnav.pages.with({ boundTestRun: t })); }
      await t.click(Subnav.videoPlayback.with({ boundTestRun: t }))
        .click(Subnav.videoPlayback_Video.with({ boundTestRun: t }))
        .click(VideoSetting.app1VideosDownload.with({ boundTestRun: t }), { offsetX: 0, offsetY: 0 })
        .click(VideoSetting.app1SaveBtn.with({ boundTestRun: t }), { offsetX: 0, offsetY: 0 })
        .click(Subnav.videoPlayback.with({ boundTestRun: t }));
      break;
  }
};

/**
 * Enable Social - Sharing Options
 * @param  {} templateName
 * @param  {} templateType
 * @param  {} t
 */
const enableSocialSharing = async (templateName, templateType, t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  console.info(`[${getTime()}] [${templateName}] Enable Social - Sharing Options`);
  switch (templateType) {
    case 'In-Page':
      await t.click(Subnav.app2Settings.with({ boundTestRun: t }));
      await t.expect(Subnav.app2Settings_Social.with({ boundTestRun: t }).visible).ok();
      await t.click(Subnav.app2Settings_Social.with({ boundTestRun: t }));
      await t.expect(SharingOptions.app2DisplayExpanded.with({ boundTestRun: t }).visible).ok();
      await t.click(SharingOptions.app2DisplayExpanded.with({ boundTestRun: t }));
      await t.expect(SharingOptions.app2FacebookInput.with({ boundTestRun: t }).visible).ok();
      await t.click(SharingOptions.app2FacebookInput.with({ boundTestRun: t }));
      await t.expect(SharingOptions.app2LinkedInInput.with({ boundTestRun: t }).visible).ok();
      await t.click(SharingOptions.app2LinkedInInput.with({ boundTestRun: t }));
      await t.expect(SharingOptions.app2PinterestInput.with({ boundTestRun: t }).visible).ok();
      await t.click(SharingOptions.app2PinterestInput.with({ boundTestRun: t }));
      await t.expect(SharingOptions.app2XInput.with({ boundTestRun: t }).visible).ok();
      await t.click(SharingOptions.app2XInput.with({ boundTestRun: t }));
      await t.expect(SharingOptions.app2EmailInput.with({ boundTestRun: t }).visible).ok();
      await t.click(SharingOptions.app2EmailInput.with({ boundTestRun: t }));
      await t.click(VideoSetting.app2SaveBtn.with({ boundTestRun: t }));
      await t.click(Subnav.app2Settings.with({ boundTestRun: t }));
      break;
    case 'Live In-Page':
      await t.click(Subnav.app2Settings.with({ boundTestRun: t }));
      await t.expect(Subnav.app2Settings_Social.with({ boundTestRun: t }).visible).ok();
      await t.click(Subnav.app2Settings_Social.with({ boundTestRun: t }));
      await t.expect(SharingOptions.app2LiveDisplayExpanded.with({ boundTestRun: t }).visible).ok();
      await t.click(SharingOptions.app2LiveDisplayExpanded.with({ boundTestRun: t }));
      await t.expect(SharingOptions.app2LiveFacebookInput.with({ boundTestRun: t }).visible).ok();
      await t.click(SharingOptions.app2LiveFacebookInput.with({ boundTestRun: t }));
      await t.expect(SharingOptions.app2LiveLinkedInInput.with({ boundTestRun: t }).visible).ok();
      await t.click(SharingOptions.app2LiveLinkedInInput.with({ boundTestRun: t }));
      await t.expect(SharingOptions.app2LivePinterestInput.with({ boundTestRun: t }).visible).ok();
      await t.click(SharingOptions.app2LivePinterestInput.with({ boundTestRun: t }));
      await t.expect(SharingOptions.app2LiveXInput.with({ boundTestRun: t }).visible).ok();
      await t.click(SharingOptions.app2LiveXInput.with({ boundTestRun: t }));
      await t.expect(SharingOptions.app2LiveEmailInput.with({ boundTestRun: t }).visible).ok();
      await t.click(SharingOptions.app2LiveEmailInput.with({ boundTestRun: t }));
      await t.click(VideoSetting.app2SaveBtn.with({ boundTestRun: t }));
      await t.click(Subnav.app2Settings.with({ boundTestRun: t }));
      break;
    case 'app1':
      if (await Subnav.pages.with({ boundTestRun: t }).getAttribute('aria-expanded') === 'true') { await t.click(Subnav.pages.with({ boundTestRun: t })); }
      await t.expect(Subnav.siteFeatures.with({ boundTestRun: t }).visible).ok()
      await t.click(Subnav.siteFeatures.with({ boundTestRun: t }))
      await t.expect(Subnav.siteFeatures_Social.with({ boundTestRun: t }).visible).ok()
      await t.click(Subnav.siteFeatures_Social.with({ boundTestRun: t }))
      await t.expect(SharingOptions.app1FacebookInput.with({ boundTestRun: t }).visible).ok();
      if (await SharingOptions.app1FacebookInput.checked === false) { await t.click(SharingOptions.app1FacebookInput.with({ boundTestRun: t })); }
      await t.expect(SharingOptions.app1LinkedInInput.with({ boundTestRun: t }).visible).ok();
      if (await SharingOptions.app1LinkedInInput.checked === false) { await t.click(SharingOptions.app1LinkedInInput.with({ boundTestRun: t })); }
      await t.expect(SharingOptions.app1PinterestInput.with({ boundTestRun: t }).visible).ok();
      if (await SharingOptions.app1PinterestInput.checked === false) { await t.click(SharingOptions.app1PinterestInput.with({ boundTestRun: t })); }
      await t.expect(SharingOptions.app1XInput.with({ boundTestRun: t }).visible).ok();
      if (await SharingOptions.app1XInput.checked === false) { await t.click(SharingOptions.app1XInput.with({ boundTestRun: t })); }
      await t.expect(SharingOptions.app1EmailInput.with({ boundTestRun: t }).visible).ok();
      if (await SharingOptions.app1EmailInput.checked === false) {
        await t.click(SharingOptions.app1EmailInput.with({ boundTestRun: t }));
      }
      else { // for templates with pre-populate - click on Email input twice to enable Save
        await t.click(SharingOptions.app1EmailInput.with({ boundTestRun: t }));
        await t.click(SharingOptions.app1EmailInput.with({ boundTestRun: t }));
      }
      if (templateName.match(TEMPLATE.LIVEEVENTapp1)) {
        await t.click(SharingOptions.app1EventSharingSave.with({ boundTestRun: t }));
      } else {
        await t.click(SharingOptions.app1VideoSharingSave.with({ boundTestRun: t }));
      }
      await t.click(Subnav.siteFeatures.with({ boundTestRun: t }))
      break;
  }
};

/**
 * Enable Event Countdown
 * @param  {string} templateName
 * @param  {string} templateType
 * @param  {TestController} t
 */
const enableCountdown = async (templateName, templateType, t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  console.info(`[${getTime()}] [${templateName}] Enable Event Countdown on ${templateName} experience`);
  switch (templateType) {
    case 'app1':
      await t
        .click(Subnav.appearance.with({ boundTestRun: t }))
        .click(Subnav.appearance_TemplateSettings.with({ boundTestRun: t }))
        .click(TemplateSettings.enableCountdown.with({ boundTestRun: t })) // to disable countdown
        .click(TemplateSettings.enableCountdown.with({ boundTestRun: t })) // to enable countdown with current date
        .click(TemplateSettings.dateDropdown.with({ boundTestRun: t }))
        .click(TemplateSettings.dateNext.with({ boundTestRun: t }))
        .click(TemplateSettings.dateNext.with({ boundTestRun: t }))
        .click(TemplateSettings.date1.with({ boundTestRun: t }))
        .click(TemplateSettings.save.with({ boundTestRun: t }))
        .click(Subnav.appearance.with({ boundTestRun: t })); // collapse Appearance section before exiting function
      break;
    case 'In-Page':
      break;
  }
};

/**
 * Setup InPage Live Event
 * @param  {string} templateName
 * @param  {TestController} t
 */
const app2LiveEvent = async (templateName, t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  console.info(`[${getTime()}] [${templateName}] Adding videos`);
  // Populate Pre-Event Video
  await t
    .click(Subnav.videosapp2.with({ boundTestRun: t }))
    .click(Subnav.videos_PreEvent.with({ boundTestRun: t }))
    .click(Subnav.videos_app2Videos.with({ boundTestRun: t }))
    .click(Subnav.videos_SelectButton.with({ boundTestRun: t }));
  // Populate Live Event Video
  await t.wait(1000);
  const videoId = await Subnav.videos_PreEventVideoId.with({ boundTestRun: t }).innerText;
  console.info(`[${getTime()}] [${templateName}] Captured Video ID: ${videoId}`);
  await t
    .click(Subnav.videos_LiveEvent.with({ boundTestRun: t }))
    .typeText(Selector('input').withAttribute('placeholder', 'Enter video ID'), videoId)
    .click(Subnav.videos_SelectButton.with({ boundTestRun: t }));
  // Populate Post-Event Video
  await t
    .click(Subnav.videos_PostEvent.with({ boundTestRun: t }))
    .click(Subnav.videos_app2Videos.with({ boundTestRun: t }))
    .click(Subnav.videos_SelectButton.with({ boundTestRun: t }));
};

/**
 * Select Preview Experience
 * @param  {string} templateName
 * @param  {TestController} t
 */
const previewExperience = async (templateName, t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  console.info(`[${getTime()}] [${templateName}] Previewing ${templateName} experience`);
  await t.click(PublishingHeader.previewBtn.with({ boundTestRun: t }));
};

/**
 * Publish Experience
 * @param  {string} templateName
 * @param  {TestController} t
 */
const publishExperience = async (templateName, t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  console.info(`[${getTime()}] [${templateName}] Publishing ${templateName} experience`);
  await t.click(PublishingHeader.publishBtn.with({ boundTestRun: t }));
  await t.expect(PublishSiteModal.publishNow.with({ boundTestRun: t }).exists).ok();
  await t.click(PublishSiteModal.publishNow.with({ boundTestRun: t }));
  await t.expect(PublishSiteModal.publishedUrl.with({ boundTestRun: t }).exists).ok();
  const publishedUrl = await Selector('.gal-form-row-small > a').with({ boundTestRun: t }).innerText;
  console.info(`[${getTime()}] [${templateName}] Published URL is: ${publishedUrl}`);
  fs.appendFile('./output_files/publishedSites.txt', `${nowDate} - ${templateName}: ${publishedUrl} \n`, err => {
    if (err) { console.error(err); }
  });
  const responseStatus = await t.request(publishedUrl, { timeout: 12000 }).status;
  await t.expect(responseStatus).eql(200);
  return publishedUrl;
};

/**
 * Publish app2 experience and write Shareable URL to file
 * @param  {string} templateName
 * @param  {TestController} t
 */
const publishapp2 = async (templateName, t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  console.info(`[${getTime()}] [${templateName}] Publishing ${templateName} experience`);
  await t.click(PublishingHeader.publishEmbedBtn.with({ boundTestRun: t }));
  await t.expect(PublishSiteModal.publishapp2.with({ boundTestRun: t }).exists).ok();
  await t.click(PublishSiteModal.publishapp2.with({ boundTestRun: t }));
  await t.expect(PublishSiteModal.publishedUrlapp2.with({ boundTestRun: t }).visible).ok({ timeout: 90000 });
  const publishedUrl = await PublishSiteModal.publishedUrlapp2.with({ boundTestRun: t }).innerText;
  const embedCode = await PublishSiteModal.publishedEmbedCode.with({ boundTestRun: t }).value;
  console.info(`[${getTime()}] [${templateName}] Shareable URL is: ${publishedUrl}`);
  fs.appendFile('./output_files/publishedapp2s.txt', `${nowDate} - ${templateName}: ${publishedUrl}\n${embedCode}\n`, err => {
    if (err) { console.error(err); }
  });
  const responseStatus = await t.request(publishedUrl, { timeout: 15000 }).status;
  await t.expect(responseStatus).eql(200);
  return publishedUrl;
};

/**
 * Click Play video on the Home page based on the template name
 * @param  {string} templateName
 * @param  {TestController} t
 */
const clickPlayIconapp1 = async (templateName, t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  console.info(`[${getTime()}] [${templateName}] Click play icon on video player`);
  switch (templateName) {
    // app1 templates
    case TEMPLATE.TEMPLATE1:
      await t.click(Selector('.play-icon').nth(0));
      break;
    case TEMPLATE.TEMPLATE2:
      await t.click(Selector('.app-image-loader').nth(2));
      break;
    case TEMPLATE.TEMPLATE3:
      await t.click(Selector('.fa.fa-play').nth(0));
      break;
    case TEMPLATE.TEMPLATE4:
      await t.click(Selector('.play-button').nth(0));
      break;
    case TEMPLATE.TEMPLATE5:
      await t.click(Selector('.Button__text').withText('Play').nth(1));
      break;
    case TEMPLATE.NEWSROOM:
      await t.click(Selector('#slick-slide50 .appg-placeholder-overlay').nth(1));
      break;
    // For all other templates not specified above
    default:
      await t.click(Publishedapp1.GridItem.with({ boundTestRun: t }).nth(0));
      break;
  }
};

/**
 * Play video on the Home page based on the template name
 * @param  {string} templateName
 * @param  {TestController} t
 */
const clickPlayIconapp2 = async (templateName, t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  console.info(`[${getTime()}] [${templateName}] Click play icon on video player`);
  switch (templateName) {
    // app2 templates
    case 'Carousel': case 'Carousel QA': case 'Carousel Latest':
      await t.click(Selector('.ee-components-play-button-icon', { timeout: 15000 }));
      break;
    case 'Live Event In-Page': case 'Live Event In-Page QA': case 'Live Event In-Page Latest':
      await t.click(Selector('.ee-components-play-button', { timeout: 15000 }));
      break;
    // For all other templates not specified above
    default:
      await t.click(Selector('.ee-components-play-button-icon', { timeout: 15000 }));
      break;
  }
};

/**
 * Navigate to published URL and validate video playback on app1 experience
 * @param  {string} publishedUrl
 * @param  {string} templateName
 * @param  {TestController} t
 */
const validate_app1VideoPlayback = async (publishedUrl, templateName, t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  console.info(`[${getTime()}] [${templateName}] Validating video playback on ${publishedUrl}`);
  await t.navigateTo(publishedUrl);

  // Click play icon on current page
  await clickPlayIconapp1(templateName, t);
  await t.wait(1000);
  // Check whether the player is loaded and started playing. 
  await startVideoPlayback(templateName, t);

  // Get video duration and set start to 10%
  const vid_duration = await _common.getDuration(0, t);
  console.info(`[${getTime()}] [${templateName}] Video total duration is ${vid_duration} seconds`);
  const vid_time = vid_duration * 0.1;
  console.info(`[${getTime()}] [${templateName}] Set player to 10% of video time: ${vid_time}`);
  await _common.setCurrentTime(0, t, vid_time);
  await t.wait(2000);
  // After seek Start playing and get Player start time
  await startVideoPlayback(templateName, t);
  const start_time = await _common.getCurrentTime(0, t);
  console.info(`[${getTime()}] [${templateName}] Player start time: ${start_time}`);

  // Verify that the video has seeked appropriately 
  await t.expect(start_time).gte(vid_time);

  // Let video play for 1s then pause
  console.info(`[${getTime()}] [${templateName}] Let video plays for 2s, then pause player`);
  await t.wait(2000);
  await _common.isPlaying(0, t);
  _common.pauseVideo(0, t);

  // Get Player current time
  const end_time = await _common.getCurrentTime(0, t);
  console.info(`[${getTime()}] [${templateName}] Player time now: ${end_time}`);

  // Verify that video played  end_time is greater than start_time
  await t.expect(end_time).gt(start_time);
  console.info(`[${getTime()}] [${templateName}] Validated video playback successfully on ${publishedUrl}`);
};

/**
 * Navigate to published URL and validate video playback on app2 experience
 * @param  {string} publishedUrl
 * @param  {string} templateName
 * @param  {TestController} t
 */
const validate_app2VideoPlayback = async (publishedUrl, templateName, t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  console.info(`[${getTime()}] [${templateName}] Validating video playback on ${publishedUrl}`);
  await t.navigateTo(publishedUrl);
  const templatesWithLigthbox = ['Grid QA', 'Filmstrip QA', 'Live Event In-Page QA', 'Grid', 'Filmstrip', 'Live Event In-Page'];
  if (templatesWithLigthbox.includes(templateName)) {
    console.info(`[${getTime()}] [${templateName}] Switching to IFrame(0) context`);
    await t.wait(5000);
    await t.switchToIframe(Selector('iframe').with({ boundTestRun: t }).nth(0));
    await clickPlayIconapp2(templateName, t);
    console.info(`[${getTime()}] [${templateName}] Switching to Main Window`);
    await t.switchToMainWindow();
    console.info(`[${getTime()}] [${templateName}] Switching to IFrame(1) context`);
    await t.switchToIframe(Selector('iframe').with({ boundTestRun: t }).nth(1));
  }
  else {
    console.info(`[${getTime()}] [${templateName}] Switching to IFrame(0) context`);
    await t.wait(5000);
    await t.switchToIframe(Selector('iframe').with({ boundTestRun: t }).nth(0));
    await clickPlayIconapp2(templateName, t);
  }
  // Check whether the player is loaded and started playing. 
  await startVideoPlayback(templateName, t);

  // Get video duration and set start to 10%
  const vid_duration = await _common.getDuration(0, t);
  console.info(`[${getTime()}] [${templateName}] Video total duration is ${vid_duration} seconds`);
  const vid_time = vid_duration * 0.1;
  console.info(`[${getTime()}] [${templateName}] Set player to 10% of video time: ${vid_time}`);
  await _common.setCurrentTime(0, t, vid_time);

  // After seek Start playing and get Player start time
  await startVideoPlayback(templateName, t);
  const start_time = await _common.getCurrentTime(0, t);
  console.info(`[${getTime()}] [${templateName}] Player start time: ${start_time}`);

  // Verify that the video has seeked appropriately 
  await t.expect(start_time).gte(vid_time);

  // Let video play for 1s then pause
  console.info(`[${getTime()}] [${templateName}] Let video plays for 1s, then pause player`);
  await t.wait(1000);
  await _common.pauseVideo(0, t);

  // Get Player current time
  const end_time = await _common.getCurrentTime(0, t);
  console.info(`[${getTime()}] [${templateName}] Player time now: ${end_time}`);

  // Verify that video played  end_time is greater than start_time
  await t.expect(end_time).gt(start_time);
  console.info(`[${getTime()}] [${templateName}] Validated video playback on ${publishedUrl}`);
};

/**
 * Validate Event Countdown on app1
 * @param  {string} publishedUrl
 * @param  {string} templateName
 * @param  {TestController} t
 */
const validate_app1EventCountdown = async (publishedUrl, templateName, t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  console.info(`[${getTime()}] [${templateName}] Validating Event Countdown on ${publishedUrl}`);
  await t.navigateTo(publishedUrl);
  await t.wait(1000);
  const months = await Publishedapp1.countdownMonths.with({ boundTestRun: t }).innerText;
  const days = await Publishedapp1.countdownDays.with({ boundTestRun: t }).innerText;
  const hours = await Publishedapp1.countdownHours.with({ boundTestRun: t }).innerText;
  const minutes = await Publishedapp1.countdownMinutes.with({ boundTestRun: t }).innerText;
  let seconds = await Publishedapp1.countdownSeconds.with({ boundTestRun: t }).innerText;

  // In case seconds starts with 0, skip 1s, start = require(59 Seconds
  if (Number(seconds) === 0) {
    await t.wait(1000);
    seconds = await Publishedapp1.countdownSeconds.with({ boundTestRun: t }).innerText;
  }

  console.info(`[${getTime()}] [${templateName}] Countdown: ${months} Months ${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`);
  await t.wait(1000);
  const newSeconds = await Publishedapp1.countdownSeconds.with({ boundTestRun: t }).innerText
  console.info(`[${getTime()}] [${templateName}] Updated Countdown: ${minutes} Minutes ${newSeconds} Seconds`);
  // Validate that Seconds are actually counting down
  await t.expect(Number(seconds)).gt((Number(newSeconds)));
  console.info(`[${getTime()}] [${templateName}] Validated Event Countdown successfully on ${publishedUrl}`);
};

/**
 * Validate Video download link on app2
 * @param  {string} publishedUrl
 * @param  {string} templateName
 * @param  {TestController} t
 */
const validate_app2VideoDownload = async (publishedUrl, templateName, t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  console.info(`[${getTime()}] [${templateName}] Validating Video Download on ${publishedUrl}`);
  const templatesWithLigthbox = ['Grid QA', 'Filmstrip QA', 'Live Event In-Page QA', 'Grid', 'Filmstrip', 'Live Event In-Page'];

  if (templatesWithLigthbox.includes(templateName)) {
    // Switch to Lightbox iframe to get download link
    console.info(`[${getTime()}] [${templateName}] Switching to IFrame(1) context`);
    await t.switchToMainWindow();
    await t.switchToIframe(Selector('iframe').nth(1));
  }
  await t.expect(Publishedapp2.app2VideoDownload.with({ boundTestRun: t, visibilityCheck: true }).exists).ok('', { timeout: 5000 });
  var downloadLink = await Publishedapp2.app2VideoDownload.with({ boundTestRun: t }).getAttribute('href');
  var downloadLink = 'https:' + downloadLink;
  console.info(`[${getTime()}] [${templateName}] Video Download URL: ${downloadLink}`);
  const responseStatus = await t.request(downloadLink, { timeout: 10000 }).status;
  await t.expect(responseStatus).eql(200);
  console.info(`[${getTime()}] [${templateName}] Validated Video Download link: ${downloadLink} with response status: ${responseStatus}`);
};

/**
 * Validate Social Share link on Published app2
 * @param  {string} publishedUrl
 * @param  {string} templateName
 * @param  {TestController} t
 */
const validate_app2SocialShares = async (publishedUrl, templateName, env, t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  console.info(`[${templateName}] Validating Social Share Options on ${publishedUrl}`);
  const templatesWithLigthbox = ['Grid QA', 'Filmstrip QA', 'Live Event In-Page QA', 'Grid', 'Filmstrip', 'Live Event In-Page'];

  if (templatesWithLigthbox.includes(templateName)) {
    // Switch to Lightbox iframe to get download link
    console.info(`[${templateName}] Switching to IFrame(1) context`);
    await t.switchToMainWindow();
    await t.switchToIframe(Selector('iframe').nth(1));
  }

  if (templateName.match('Single Video')) {
    console.info(`[${templateName}] Switching to IFrame(0) context`);
    await t.switchToMainWindow();
    await t.switchToIframe(Selector('iframe').nth(0));
  }

  // Take a screenshot
  await t.takeScreenshot({ path: `app2/${env}_validateSocial_${templateName}` });

  // Validate Facebook Share link
  await t.expect(Publishedapp2.app2FacebookShare.with({ boundTestRun: t, visibilityCheck: true }).exists).ok('', { timeout: 5000 });

  const linkFacebook = await Publishedapp2.app2FacebookShare.with({ boundTestRun: t }).getAttribute('href');
  // TODO: Uncomment Facebook share link validation when GT-9254 is addressed
  // const statusFacebook = await t.request(linkFacebook).status;
  // await t.expect(statusFacebook).lte(400);
  // await t.expect(linkFacebook).contains('https://www.facebook.com/dialog/share?app_id');
  // console.info(`[${templateName}] Validated Facebook link: ${linkFacebook}`);

  // Validate LinkedIn Share link
  await t.expect(Publishedapp2.app2LinkedInShare.with({ boundTestRun: t, visibilityCheck: true }).exists).ok('', { timeout: 2000 });
  const linkLinkedIn = await Publishedapp2.app2LinkedInShare.with({ boundTestRun: t }).getAttribute('href');
  await t.expect(linkLinkedIn).contains('https://www.linkedin.com/shareArticle?mini=true&url');
  const statusLinkedIn = await t.request(linkLinkedIn).status;
  await t.expect(statusLinkedIn).lte(400);
  console.info(`[${templateName}] Validated LinkedIn link: ${linkLinkedIn} with response status: ${statusLinkedIn}`);

  // Validate Pinterest Share link
  await t.expect(Publishedapp2.app2PinterestShare.with({ boundTestRun: t, visibilityCheck: true }).exists).ok('', { timeout: 2000 });
  const linkPinterest = await Publishedapp2.app2PinterestShare.with({ boundTestRun: t }).getAttribute('href');
  await t.expect(linkPinterest).contains('https://pinterest.com/pin/create/button/?url');
  const statusPinterest = await t.request(linkPinterest).status;
  await t.expect(statusPinterest).lte(400);
  console.info(`[${templateName}] Validated Pinterest link: ${linkPinterest} with response status: ${statusPinterest}`);

  // Validate X Share link
  await t.expect(Publishedapp2.app2XShare.with({ boundTestRun: t, visibilityCheck: true }).exists).ok('', { timeout: 2000 });
  const shareXLink = await Publishedapp2.app2XShare.with({ boundTestRun: t }).getAttribute('href');
  await t.expect(shareXLink).contains('https://twitter.com/intent/tweet?text');
  const statusX = await t.request(shareXLink).status;
  await t.expect(statusX).lte(400);
  console.info(`[${templateName}] Validated Share X link: ${shareXLink} with response status: ${statusX}`);

  // Validate Email Share link
  await t.expect(Publishedapp2.app2EmailShare.with({ boundTestRun: t, visibilityCheck: true }).exists).ok('', { timeout: 2000 });
  const linkEmail = await Publishedapp2.app2EmailShare.with({ boundTestRun: t }).getAttribute('href');
  await t.expect(linkEmail).contains('mailto:?subject');
  console.info(`[${templateName}] Validated Email link: ${linkEmail}`);
};

/**
 * Validate Social Share link on published app1s
 * @param  {string} publishedUrl
 * @param  {string} templateName
 * @param  {TestController} t
 */
const validate_app1SocialShares = async (publishedUrl, templateName, env, t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  console.info(`[${getTime()}] [${templateName}] Validating Social Share Options on ${publishedUrl}`);
  await t.navigateTo(publishedUrl);
  // Get to video page with Social Share links based on template name
  switch (templateName) {
    case TEMPLATE.CHRONICLE:
      await t.click(Publishedapp1.chronicleShareIcon.with({ boundTestRun: t }).nth(0));
      var linkFacebook = await Publishedapp1.chronicleShareFacebook.with({ boundTestRun: t }).getAttribute('href');
      var linkX = await Publishedapp1.chronicleShareX.with({ boundTestRun: t }).getAttribute('href');
      var linkLinkedIn = await Publishedapp1.chronicleShareLinkedIn.with({ boundTestRun: t }).getAttribute('href');
      var linkPinterest = await Publishedapp1.chronicleSharePinterest.with({ boundTestRun: t }).getAttribute('href');
      var linkEmail = await Publishedapp1.chronicleShareEmail.with({ boundTestRun: t }).getAttribute('href');
      break;
    case TEMPLATE.DISCOVERY:
      var linkFacebook = await Publishedapp1.discoveryShareFacebook.with({ boundTestRun: t }).getAttribute('href');
      var linkX = await Publishedapp1.discoveryShareX.with({ boundTestRun: t }).getAttribute('href');
      var linkLinkedIn = await Publishedapp1.discoveryShareLinkedIn.with({ boundTestRun: t }).getAttribute('href');
      var linkPinterest = await Publishedapp1.discoverySharePinterest.with({ boundTestRun: t }).getAttribute('href');
      var linkEmail = await Publishedapp1.discoveryShareEmail.with({ boundTestRun: t }).getAttribute('href');
      break;
    case TEMPLATE.LIVEEVENTapp1:
      var linkFacebook = await Publishedapp1.shareFacebook.with({ boundTestRun: t }).getAttribute('href');
      var linkX = await Publishedapp1.shareX.with({ boundTestRun: t }).getAttribute('href');
      var linkLinkedIn = await Publishedapp1.shareLinkedIn.with({ boundTestRun: t }).getAttribute('href');
      var linkPinterest = await Publishedapp1.sharePinterest.with({ boundTestRun: t }).getAttribute('href');
      var linkEmail = await Publishedapp1.shareEmail.with({ boundTestRun: t }).getAttribute('href');
      break;
    case TEMPLATE.PUBLISHER:
      await t.click(Publishedapp1.videoGridItem.with({ boundTestRun: t }).nth(0));
      var linkFacebook = await Publishedapp1.shareFacebook.with({ boundTestRun: t }).getAttribute('href');
      var linkX = await Publishedapp1.shareX.with({ boundTestRun: t }).getAttribute('href');
      var linkLinkedIn = await Publishedapp1.shareLinkedIn.with({ boundTestRun: t }).getAttribute('href');
      var linkPinterest = await Publishedapp1.sharePinterest.with({ boundTestRun: t }).getAttribute('href');
      var linkEmail = await Publishedapp1.shareEmail.with({ boundTestRun: t }).getAttribute('href');
      break;
    case TEMPLATE.SHOWCASE:
      await clickPlayIconapp1(templateName, t);
      var linkFacebook = await Publishedapp1.shareFacebook.with({ boundTestRun: t }).getAttribute('href');
      var linkX = await Publishedapp1.shareX.with({ boundTestRun: t }).getAttribute('href');
      var linkLinkedIn = await Publishedapp1.shareLinkedIn.with({ boundTestRun: t }).getAttribute('href');
      var linkPinterest = await Publishedapp1.sharePinterest.with({ boundTestRun: t }).getAttribute('href');
      var linkEmail = await Publishedapp1.shareEmail.with({ boundTestRun: t }).getAttribute('href');
    default: // For all other app1 templates
      var linkFacebook = await Publishedapp1.shareFacebook.with({ boundTestRun: t }).getAttribute('href');
      var linkX = await Publishedapp1.shareX.with({ boundTestRun: t }).getAttribute('href');
      var linkLinkedIn = await Publishedapp1.shareLinkedIn.with({ boundTestRun: t }).getAttribute('href');
      var linkPinterest = await Publishedapp1.sharePinterest.with({ boundTestRun: t }).getAttribute('href');
      var linkEmail = await Publishedapp1.shareEmail.with({ boundTestRun: t }).getAttribute('href');
      break;
  };

  // Take a screenshot
  await t.takeScreenshot({ path: `app1/${env}_validateSocial_${templateName}` });

  // TODO: Uncomment Facebook share link validation when GT-9254 is addressed
  // Validate Facebook Share link
  // const statusFacebook = await t.request(linkFacebook).status;
  // await t.expect(statusFacebook).lte(400);
  // await t.expect(linkFacebook).contains('https://www.facebook.com/dialog/share?app_id');
  // console.info(`[${getTime()}] [${templateName}] Validated Facebook link: ${linkFacebook} with response status: ${statusFacebook}`);

  // Validate LinkedIn Share link
  await t.expect(linkLinkedIn).contains('https://www.linkedin.com/shareArticle?mini=true&url');
  const statusLinkedIn = await t.request(linkLinkedIn).status;
  await t.expect(statusLinkedIn).lte(400);
  console.info(`[${getTime()}] [${templateName}] Validated LinkedIn link: ${linkLinkedIn} with response status: ${statusLinkedIn}`);

  // Validate Pinterest Share link
  await t.expect(linkPinterest).contains('https://pinterest.com/pin/create/button/?url');
  const statusPinterest = await t.request(linkPinterest).status;
  await t.expect(statusPinterest).lte(400);
  console.info(`[${getTime()}] [${templateName}] Validated Pinterest link: ${linkPinterest} with response status: ${statusPinterest}`);

  // Validate X Share link
  await t.expect(linkX).contains('https://twitter.com/intent/tweet?text');
  const statusX = await t.request(linkX).status;
  await t.expect(statusX).lte(400);
  console.info(`[${getTime()}] [${templateName}] Validated Share X link: ${linkX} with response status: ${statusX}`);

  // Validate Email Share link
  await t.expect(linkEmail).contains('mailto:?subject');
  console.info(`[${getTime()}] [${templateName}] Validated Email link: ${linkEmail}`);
};

/**
 * Validate Video download link on app1
 * @param  {string} publishedUrl
 * @param  {string} templateName
 * @param  {TestController} t
 */
const validate_app1VideoDownload = async (publishedUrl, templateName, t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  console.info(`[${getTime()}] [${templateName}] Validating Video Download on ${publishedUrl}`);
  await t.navigateTo(publishedUrl);
  // Get download link based on template name
  switch (templateName) {
    case TEMPLATE.CHRONICLE:
      await t.click(Publishedapp1.chronicleShareIcon.with({ boundTestRun: t }).nth(0));
      var downloadLink = await Publishedapp1.chronicleVideoDownload.with({ boundTestRun: t }).getAttribute('href');
      break;
    case TEMPLATE.DISCOVERY:
      var downloadLink = await Publishedapp1.discoveryVideoDownload.with({ boundTestRun: t }).getAttribute('href');
      break;
    case TEMPLATE.LIVEEVENTapp1:
      await t.click(Publishedapp1.videoGridItem.with({ boundTestRun: t }).nth(0));
      var downloadLink = await Publishedapp1.app1VideoDownload.with({ boundTestRun: t }).getAttribute('href');
      break;
    case TEMPLATE.PUBLISHER:
      await t.click(Publishedapp1.videoGridItem.with({ boundTestRun: t }).nth(0));
      var downloadLink = await Publishedapp1.app1VideoDownload.with({ boundTestRun: t }).getAttribute('href');
      break;
    case TEMPLATE.SHOWCASE:
      await t.click(Publishedapp1.showcaseHeroPlay.with({ boundTestRun: t }));
      var downloadLink = await Publishedapp1.showcaseVideoDownload.with({ boundTestRun: t }).getAttribute('href');
      break;
    default: // For all other app1 templates
      var downloadLink = await Publishedapp1.app1VideoDownload.with({ boundTestRun: t }).getAttribute('href');
      break;
  };
  const responseStatus = await t.request(downloadLink, { timeout: 10000 }).status;
  await t.expect(responseStatus).eql(200);
  console.info(`[${getTime()}] [${templateName}] Validated Download Video link: ${downloadLink} with response status: ${responseStatus}`);
};

/**
 * Validate Site Search on app1
 * @param  {string} publishedUrl
 * @param  {string} templateName
 * @param  {TestController} t
 */
const validate_app1Search = async (publishedUrl, templateName, t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  console.info(`[${getTime()}] [${templateName}] Validating Search on ${publishedUrl}`);
  await t.navigateTo(publishedUrl);
  // Enter search term based on template name
  const searchTerm = 'iapp';
  switch (templateName) {
    case TEMPLATE.CATALOGUE:
      await t.typeText(Selector('.main-header-search-input').with({ boundTestRun: t }), searchTerm);
      await t.pressKey('enter');
      await t.wait(2000);
      var searchUrl = await getURL(t);
      var searchResult = await Selector('.appg-results-bar-search').innerText;
      console.info(`[${getTime()}] [${templateName}] Search URL: ${searchUrl} contains search?q=${searchTerm}`);
      await t.expect(searchUrl).contains(`search?q=${searchTerm}`);
      console.info(`[${getTime()}] [${templateName}] Search Result: ${searchResult} contains ${searchTerm}`);
      await t.expect(searchResult).contains(searchTerm);
      await t.expect(searchResult).notContains('0 Results');
      break;
    case TEMPLATE.CHRONICLE:
      await t.typeText(Selector('.chron-search__input').with({ boundTestRun: t }), searchTerm);
      await t.pressKey('enter');
      await t.wait(2000);
      var searchUrl = await getURL(t);
      var searchResult = await Selector('.results-message').innerText;
      console.info(`[${getTime()}] [${templateName}] Search Result: ${searchUrl} contains search?q=${searchTerm}`);
      await t.expect(searchUrl).contains(`search?q=${searchTerm}`);
      console.info(`[${getTime()}] [${templateName}] Search URL: ${searchResult} contains ${searchTerm}`);
      await t.expect(searchResult).contains(searchTerm);
      await t.expect(searchResult).notContains('0 results');
      break;
    case TEMPLATE.CLASSIC:
      await t.typeText(Selector('.main-header-search-input').with({ boundTestRun: t }), searchTerm);
      await t.pressKey('enter');
      await t.wait(2000);
      var searchUrl = await getURL(t);
      var searchResult = await Selector('.results-bar').innerText;
      console.info(`[${getTime()}] [${templateName}] Search URL: ${searchUrl} contains search?q=${searchTerm}`);
      await t.expect(searchUrl).contains(`search?q=${searchTerm}`);
      console.info(`[${getTime()}] [${templateName}] Search Result: ${searchResult} contains ${searchTerm}`);
      await t.expect(searchResult).contains(searchTerm);
      await t.expect(searchResult).notContains('0 videos');
      break;
    case TEMPLATE.DISCOVERY:
      await t.typeText(Selector('#site-search-input').with({ boundTestRun: t }), searchTerm);
      await t.pressKey('enter');
      await t.wait(2000);
      var searchUrl = await getURL(t);
      var searchResult = await Selector('.mod-search-headline').innerText;
      console.info(`[${getTime()}] [${templateName}] Search URL: ${searchUrl} contains search?q=${searchTerm}`);
      await t.expect(searchUrl).contains(`search?q=${searchTerm}`);
      console.info(`[${getTime()}] [${templateName}] Search Result: ${searchResult} contains ${searchTerm}`);
      await t.expect(searchResult).contains(searchTerm);
      await t.expect(searchResult).notContains('0 results');
      break;
    case TEMPLATE.IMMERSION:
      await t.click(Selector('.Icon.SearchButton__icon').with({ boundTestRun: t }));
      await t.typeText(Selector('.SearchInput__input').with({ boundTestRun: t }), searchTerm);
      await t.pressKey('enter');
      await t.wait(2000);
      var searchUrl = await getURL(t);
      var searchResult = await Selector('.SearchPage__searchTerm').innerText;
      console.info(`[${getTime()}] [${templateName}] ${searchUrl} contains search?query=${searchTerm}&page=1`);
      await t.expect(searchUrl).contains(`search?query=${searchTerm}&page=1`);
      console.info(`[${getTime()}] [${templateName}] ${searchResult} contains ${searchTerm}`);
      await t.expect(searchResult).contains(searchTerm);
      await t.expect(searchResult).notContains('0 results');
      break;
    case TEMPLATE.MARQUEE:
      await t.typeText(Selector('#app-video-search-form-value-desktop').with({ boundTestRun: t }), searchTerm);
      await t.pressKey('enter');
      await t.wait(2000);
      var searchUrl = await getURL(t);
      var searchResult = await Selector('.app-video-browser-grid-top').innerText;
      console.info(`[${getTime()}] [${templateName}] Search URL: ${searchUrl} contains ?q=${searchTerm}`);
      await t.expect(searchUrl).contains(`?q=${searchTerm}`);
      console.info(`[${getTime()}] [${templateName}] Search Result: ${searchResult} contains ${searchTerm}`);
      await t.expect(searchResult).contains(searchTerm);
      await t.expect(searchResult).notContains('0 videos');
      break;
    case TEMPLATE.MOSAIC:
      await t.typeText(Selector('.navbar-search .form-control').with({ boundTestRun: t }), searchTerm);
      await t.pressKey('enter');
      await t.wait(2000);
      var searchUrl = await getURL(t);
      var searchResult = await Selector('#app-search-results').innerText;
      console.info(`[${getTime()}] [${templateName}] Search URL: ${searchUrl} contains search?q=${searchTerm}`);
      await t.expect(searchUrl).contains(`search?q=${searchTerm}`);
      console.info(`[${getTime()}] [${templateName}] Search Result: ${searchResult} contains ${searchTerm.toUpperCase()}`);
      await t.expect(searchResult).contains(searchTerm.toUpperCase());
      await t.expect(searchResult).notContains('0 VIDEOS');
      break;
    case TEMPLATE.PUBLISHER:
      await t.click(Selector('.search-label').with({ boundTestRun: t }))
      await t.typeText(Selector('#app-main-header-search-input').with({ boundTestRun: t }), searchTerm);
      await t.pressKey('enter');
      await t.wait(2000);
      var searchUrl = await getURL(t);
      var searchResult = await Selector('.category-name').innerText;
      var searchResultCount = await Selector('.category-videos-count').innerText;
      console.info(`[${getTime()}] [${templateName}] Search URL: ${searchUrl} contains search?q=${searchTerm}`);
      await t.expect(searchUrl).contains(`search?q=${searchTerm}`);
      console.info(`[${getTime()}] [${templateName}] Search Result: ${searchResult} ${searchResultCount} contains ${searchTerm}`);
      await t.expect(searchResult).contains(searchTerm);
      await t.expect(searchResultCount).notContains('0 videos');
      break;
    case TEMPLATE.SHOWCASE: 
      var currentUrl = await getURL(t);
      var searchUrl = currentUrl + `/search?q=${searchTerm}`;
      await t.navigateTo(searchUrl);
      var searchResult = await Selector('.content-header.for-search').innerText;
      console.info(`[${getTime()}] [${templateName}] Search Result: ${searchResult} contains ${searchTerm}`);
      await t.expect(searchResult).contains(searchTerm);
      await t.expect(searchResult).notContains('0 videos');
      break;
    default:
      break;
  };
  console.info(`[${getTime()}] [${templateName}] Validated Search on ${publishedUrl}`);
};

/**
 * Validate Accessibility on a page
 * @param  {string} publishedUrl
 * @param  {string} templateName
 * @param  {number} violationThreshold
 * @param  {TestController} t
 * @param  {object} customPage
 */
const validate_accessibility = async (publishedUrl, templateName, violationThreshold = 0, t, customPage = false) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  console.info(`[${getTime()}] [${templateName}] Validating Accessibility on ${publishedUrl}`);
  await t.navigateTo(publishedUrl);

  console.info(`[${getTime()}] [${templateName}] ** Accessibility Check in Desktop mode - HD Resoultion **`);
  await t.resizeWindow(1280, 720);
  if (customPage) {
    await validate_publishedCustomPage(publishedUrl, customPage, t)
  }
  await _common.a11yCheck(t, violationThreshold);

  console.info(`[${getTime()}] [${templateName}] ** Accessibility Check in Tablet mode **`);
  await t.resizeWindow(768, 720);
  if (customPage) {
    await validate_publishedCustomPage(publishedUrl, customPage, t)
  }
  await _common.a11yCheck(t, violationThreshold);

  console.info(`[${getTime()}] [${templateName}] ** Accessibility Check in Mobile mode **`);
  await t.resizeWindow(375, 720);
  if (customPage) {
    await validate_publishedCustomPage(publishedUrl, customPage, t)
  }
  await _common.a11yCheck(t, violationThreshold);

  console.info(`[${getTime()}] [${templateName}] Validated Accessibility`);
};

/**
 * Select Agenda
 * @param  {string} templateName
 * @param  {TestController} t
 */
const selectAgenda = async (templateName, t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  await t.scrollIntoView(Subnav.siteFeatures.with({ boundTestRun: t }));
  console.info(`[${getTime()}] [${templateName}] Selecting Agenda`);
  await t.click(Subnav.siteFeatures.with({ boundTestRun: t })).click(Subnav.siteFeatures_Agenda.with({ boundTestRun: t }));
};

/**
 * Set importAgenda
 * @param  {string} templateName
 * @param  {TestController} t
 */
const importAgenda = async (templateName, t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  console.info(`[${getTime()}] [${templateName}] importing Agenda CSV file`);
  const csvPath = path.resolve(__dirname, '../assets/csv/AgendaTest.csv');
  await t.setFilesToUpload('#agendaUpload-FileInput', csvPath);
  await t.wait(6000);
};

/**
 * Create Speakers
 * @param  {string} templateName
 * @param  {TestController} t
 */
const createSpeakers = async (templateName, t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  console.info(`[${getTime()}] [${templateName}] Creating Speaker`);
  await waitForPageRefresh(t, common_helpers.waitOption.previewLoader, 2000, false);
  await t.click(agenda.speakerSection.with({ boundTestRun: t }));
  await t.click(people.createButton.with({ boundTestRun: t }));

  const id = uniqid();
  const speakerData = {
    id,
    name: 'webapp',
    title: 'Speaker',
    company: 'example',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  };

  await t.typeText(people.firstName.with({ boundTestRun: t }), speakerData.name);
  await t.typeText(people.lastName.with({ boundTestRun: t }), speakerData.id);
  await t.typeText(people.title.with({ boundTestRun: t }), speakerData.title);
  await t.typeText(people.company.with({ boundTestRun: t }), speakerData.company);
  await t.typeText(people.bio.with({ boundTestRun: t }), speakerData.bio);
  await t.setFilesToUpload(people.imageUpload.with({ boundTestRun: t }), ['../../../assets/img/avatar.jpeg']);
  await t.wait(3000);
  await t.click(people.saveButton.with({ boundTestRun: t }));
  await t.wait(2000);
  return speakerData;
};

/**
 * Validate Speaker
 * @param  {string} templateName
 * @param  {string} createdSpeaker
 * @param  {TestController} t
 */
const validateSpeaker = async (templateName, createdSpeaker, t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  console.info(`[${getTime()}] [${templateName}] Validating the created speaker ${createdSpeaker.id}`);
  await waitForPageRefresh(t, common_helpers.waitOption.previewLoader, 1000, false);
  await t.scroll(people.tableBody, 'bottom');
  const user = Selector('td').with({ boundTestRun: t }).withExactText(`webapp ${createdSpeaker.id}`);
  await t.expect(user.with({ boundTestRun: t }).exists).ok();
  await t.click(Selector('tr:last-child td').with({ boundTestRun: t }).find(people.moreOption));
  await t.click(people.editOption.with({ boundTestRun: t }));
  await t.expect(people.firstName.with({ boundTestRun: t }).value).eql(createdSpeaker.name);
  await t.expect(people.lastName.with({ boundTestRun: t }).value).eql(createdSpeaker.id);
  await t.expect(people.title.with({ boundTestRun: t }).value).eql(createdSpeaker.title);
  await t.expect(people.company.with({ boundTestRun: t }).value).eql(createdSpeaker.company);
  await t.expect(people.bio.with({ boundTestRun: t }).value).eql(createdSpeaker.bio);
  await t.click(people.cancelButton.with({ boundTestRun: t }));
  await t.wait(2000);

  // Delete Person
  await t.click(Selector('tr:last-child td').with({ boundTestRun: t }).find(people.moreOption));
  await t.click(people.deleteOption.with({ boundTestRun: t }));
  await t.click(Selector('[class^="Modal-actions-"]').find('span').withText('Delete'));

  // Navigate back to Virtual Event experience in webapp module
  await t.click(agenda.backToMyEvent.with({ boundTestRun: t }));
  await t.wait(3000);
};

/**
 * validate constedAgenda
 * @param  {string} templateName
 * @param  {TestController} t
 */
const validateImportedAgenda = async (templateName, t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  console.info(`[${getTime()}] [${templateName}] Validating consted Agenda`);
  await t.click(Agenda.lastAgenda.with({ boundTestRun: t }).find(Agenda.moreOption));
  await t.click(Agenda.editOption.with({ boundTestRun: t }));
  await t.wait(3000);
  await t.expect(Agenda.firstEvent.with({ boundTestRun: t }).visible).ok();
  await t.expect(Agenda.secondEvent.with({ boundTestRun: t }).visible).ok();

  // Check if sessions are displayed in the agenda
  await t.expect(Agenda.firstSession.with({ boundTestRun: t }).innerText).eql('Keynote Session');
  await t.expect(Agenda.secondSession.with({ boundTestRun: t }).innerText).eql('Meeting Session');
  await t.expect(Agenda.thirdSession.with({ boundTestRun: t }).innerText).eql('Other Session');

  // Navigate back to Virtual Event experience in webapp module
  await t.click(agenda.backToMyEvent.with({ boundTestRun: t }));
  await t.wait(3000);
};

/**
 * publish Agenda
 * @param  {string} templateName
 * @param  {TestController} t
 */
const publishAgenda = async (templateName, t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  console.info(`[${getTime()}] [${templateName}] Publishing Agenda`);

  await t.click(agenda.activate.with({ boundTestRun: t }));
  await t.wait(1000);
  await t.click(agenda.confirmActivate.with({ boundTestRun: t }));
  await t.wait(1000);

  // Check if status activated
  await t.expect(agenda.status.with({ boundTestRun: t }).innerText).eql('ACTIVATED');

  // Back to My Event
  await t.click(agenda.backToMyEvent.with({ boundTestRun: t }));
  await t.wait(3000);
};

/**
 * validate FirstAgendaSession
 * @param  {string} templateName
 * @param  {TestController} t
 */
const validateFirstAgendaSession = async (templateName, t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  console.info(`[${getTime()}] [${templateName}] Validating first Agenda session`);

  // Open first session
  await t.click(agenda.firstEventContent.with({ boundTestRun: t }));

  const session = {
    name: 'Keynote Session',
    type: 'Keynote',
    speakers: [
      {
        name: 'webapp Speaker 01',
      },
      {
        name: 'webapp Speaker 02',
      },
    ],
    startDate: '05/04/2022',
    startTime: '9:00 AM',
    duration: '24h',
    description: 'Keynote Test',
    track: 'Track 1',
  };

  await t.expect(agendaEvent.name.with({ boundTestRun: t }).value).eql(session.name);
  await t
    .click(agendaEvent.sessionSelect.with({ boundTestRun: t }))
    .click(agendaEvent.sessionOption.with({ boundTestRun: t }).withText(session.type))
    .expect(await agendaEvent.sessionSelect.with({ boundTestRun: t }).value)
    .eql('1');
  await t.expect(agendaEvent.speakerA.with({ boundTestRun: t }).innerText).eql(session.speakers[0].name);
  await t.expect(agendaEvent.speakerB.with({ boundTestRun: t }).innerText).eql(session.speakers[1].name);
  await t.expect(agendaEvent.startDate.with({ boundTestRun: t }).value).eql(session.startDate);
  await t.expect(agendaEvent.startTime.with({ boundTestRun: t }).value).eql(session.startTime);
  await t
    .click(agendaEvent.durationSelectA.with({ boundTestRun: t }))
    .click(agendaEvent.durationOptionA.with({ boundTestRun: t }).withText(session.duration))
    .expect(await agendaEvent.durationSelectA.with({ boundTestRun: t }).value)
    .eql('24');
  await t.expect(agendaEvent.description.with({ boundTestRun: t }).textContent).eql(session.description);
  await t
    .click(agendaEvent.trackSelect.with({ boundTestRun: t }))
    .click(agendaEvent.trackOption.with({ boundTestRun: t }).withText(session.track))
    .expect(await agendaEvent.trackSelect.with({ boundTestRun: t }).value)
    .eql('1');

  // close session dialog
  await t.click(agendaEvent.closeDialog);
};

/**
 * validate SecondAgendaSession
 * @param  {string} templateName
 * @param  {TestController} t
 */
const validateSecondAgendaSession = async (templateName, t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  console.info(`[${getTime()}] [${templateName}] Validating second Agenda session`);

  // Open second session
  await t.click(agenda.secondEventContent.with({ boundTestRun: t }));

  const session = {
    name: 'Meeting Session',
    type: 'Meeting',
    url: 'www.example.com',
    speakers: [
      {
        name: 'webapp Speaker 01',
      },
      {
        name: 'webapp Speaker 02',
      },
    ],
    startDate: '05/04/2022',
    startTime: '9:00 AM',
    duration: '7h',
    description: 'Meeting session Test',
    track: 'Track 2',
  };

  await t.expect(agendaEvent.name.with({ boundTestRun: t }).value).eql(session.name);
  await t
    .click(agendaEvent.sessionSelect.with({ boundTestRun: t }))
    .click(agendaEvent.sessionOption.with({ boundTestRun: t }).withText(session.type))
    .expect(await agendaEvent.sessionSelect.with({ boundTestRun: t }).value)
    .eql('2');
  await t.expect(agendaMeetingEvent.url.with({ boundTestRun: t }).value).eql(session.url);
  await t.expect(agendaEvent.speakerA.with({ boundTestRun: t }).innerText).eql(session.speakers[0].name);
  await t.expect(agendaEvent.speakerB.with({ boundTestRun: t }).innerText).eql(session.speakers[1].name);
  await t.expect(agendaEvent.startDate.with({ boundTestRun: t }).value).eql(session.startDate);
  await t.expect(agendaEvent.startTime.with({ boundTestRun: t }).value).eql(session.startTime);
  await t
    .click(agendaMeetingEvent.durationSelect.with({ boundTestRun: t }))
    .click(agendaMeetingEvent.durationOption.with({ boundTestRun: t }).withText(session.duration))
    .expect(agendaMeetingEvent.durationSelect.with({ boundTestRun: t }).value)
    .eql('7');
  await t.expect(agendaEvent.description.with({ boundTestRun: t }).textContent).eql(session.description);
  await t
    .click(agendaMeetingEvent.trackSelect.with({ boundTestRun: t }))
    .click(agendaMeetingEvent.trackOption.with({ boundTestRun: t }).withText(session.track))
    .expect(agendaMeetingEvent.trackSelect.with({ boundTestRun: t }).value)
    .eql('2');

  // close session dialog
  await t.click(agendaEvent.closeDialog.with({ boundTestRun: t }));
};

/**
 * validate ThirdAgendaSession
 * @param  {string} templateName
 * @param  {TestController} t
 */
const validateThirdAgendaSession = async (templateName, t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  console.info(`[${getTime()}] [${templateName}] Validating third Agenda session`);

  // Click agenda second date
  await t.click(agenda.secondDate.with({ boundTestRun: t }));
  // Open third session
  await t.click(agenda.firstEventContent.with({ boundTestRun: t }));

  const session = {
    name: 'Session session',
    type: 'Session',
    speakers: [
      {
        name: 'webapp Speaker 01',
      },
      {
        name: 'webapp Speaker 02',
      },
    ],
    startDate: '05/06/2022',
    startTime: '9:00 AM',
    duration: '24h',
    description: 'This is a Test',
    track: 'Track 1',
  };

  await t.expect(agendaEvent.name.with({ boundTestRun: t }).value).eql(session.name);
  await t
    .click(agendaEvent.sessionSelect.with({ boundTestRun: t }))
    .click(agendaEvent.sessionOption.with({ boundTestRun: t }).withText(session.type))
    .expect(await agendaEvent.sessionSelect.with({ boundTestRun: t }).value)
    .eql('0');
  await t.expect(agendaEvent.speakerA.with({ boundTestRun: t }).innerText).eql(session.speakers[0].name);
  await t.expect(agendaEvent.speakerB.with({ boundTestRun: t }).innerText).eql(session.speakers[1].name);
  await t.expect(agendaEvent.startDate.with({ boundTestRun: t }).value).eql(session.startDate);
  await t.expect(agendaEvent.startTime.with({ boundTestRun: t }).value).eql(session.startTime);
  await t
    .click(agendaEvent.durationSelectA.with({ boundTestRun: t }))
    .click(agendaEvent.durationOptionA.with({ boundTestRun: t }).withText(session.duration))
    .expect(await agendaEvent.durationSelectA.with({ boundTestRun: t }).value)
    .eql('24');
  await t.expect(agendaEvent.description.with({ boundTestRun: t }).textContent).eql(session.description);
  await t
    .click(agendaEvent.trackSelect.with({ boundTestRun: t }))
    .click(agendaEvent.trackOption.with({ boundTestRun: t }).withText(session.track))
    .expect(await agendaEvent.trackSelect.with({ boundTestRun: t }).value)
    .eql('1');

  // close session dialog
  await t.click(agendaEvent.closeDialog.with({ boundTestRun: t }));
};

/**
 * Check whether the player is loaded and started playing
 * @param  {string} templateName
 * @param  {TestController} t
 */
const startVideoPlayback = async (templateName, t) => {
  await t.expect(Player.video.with({ boundTestRun: t }).exists).ok({ timeout: 10000 });
  if (!await _common.isPlaying(0, t)) {
    await _common.playVideo(0, t);
  }
  let timer = 0;
  while (!await _common.isPlaying(0, t) && timer < 10) {
    await t.wait(1000);
    timer++;
  }
  console.info(`[${getTime()}] [${templateName}] Video isPlaying check, took ${timer}sec`);
  await t.expect(await _common.isPlaying(0, t)).ok(`Video isPlaying check, took ${timer}sec`);
};

/**
 * Add a Custom Page
 * @param  {TestController} t
 * @param  {string} pageName
 * @param  {string} pagePath
 * @param  {string} errorMsg
 */
const addCustomPage = async (t, pageName, pagePath, errorMsg) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  console.info(`[${getTime()}] [${TEMPLATE.IMMERSION}] Add a Custom Page ${pageName}`);
  if (await Toaster.x.with({ boundTestRun: t, timeout: 2000 }).visible) { await t.click(Toaster.x.with({ boundTestRun: t })); }
  if (await Subnav.pages.with({ boundTestRun: t, timeout: 3000 }).getAttribute('aria-expanded') === 'false') { await t.click(Subnav.pages.with({ boundTestRun: t, timeout: 3000 })); }
  await t.click(CustomPage.addPageBtn.with({ boundTestRun: t, visibilityCheck: true, timeout: 3000 }));
  await t.expect(CustomPage.createModel.with({ boundTestRun: t, visibilityCheck: true, timeout: 2000 }).visible).ok('Validate the Create Custom Page window appears', { timeout: 5000 });
  await t.expect(CustomPage.pagePath.with({ boundTestRun: t, timeout: 2000 }).getAttribute('value')).eql('/');
  await t.typeText(CustomPage.pageName.with({ boundTestRun: t, timeout: 3000 }), pageName);
  let pgPath = await CustomPage.pagePath.with({ boundTestRun: t }).getAttribute('value');
  await t.expect(pgPath.length - 1).eql(pageName.length);
  if (typeof pagePath !== 'undefined') {
    await t.typeText(CustomPage.pagePath.with({ boundTestRun: t, timeout: 3000 }), pagePath, { replace: true });
    pgPath = await CustomPage.pagePath.with({ boundTestRun: t, timeout: 3000 }).getAttribute('value');
    await t.expect(pgPath.length).eql(pagePath.length);
  }
  //Validate PagePath Error
  if (typeof errorMsg !== 'undefined') {
    await customPageErrorValidation(t, errorMsg, pagePath);
    return;
  }
  await t.click(CustomPage.saveBtn.with({ boundTestRun: t, timeout: 2000 }));
  await t.expect(Selector(`div[data-test-name="components.edit.mainEditor.EditorNav.pages.${pageName}"]`).with({ boundTestRun: t, visibilityCheck: true, timeout: 5000 }).exists)
    .ok('Validate Page is added');
};

/**
 * Edit Custom Page
 * @param  {TestController} t
 * @param  {number} pageIndex
 * @param  {string} pageName
 * @param  {string} pagePath
 * @param  {string} errorMsg
 */
const editCustomPage = async (t, pageIndex, pageName, pagePath, errorMsg) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  console.info(`[${getTime()}] [${TEMPLATE.IMMERSION}] Edit a Custom Page index: ${pageIndex}`);
  if (await Toaster.x.with({ boundTestRun: t, timeout: 2000 }).visible) { await t.click(Toaster.x.with({ boundTestRun: t })); }
  if (await Subnav.pages.with({ boundTestRun: t, timeout: 3000 }).getAttribute('aria-expanded') === 'false') { await t.click(Subnav.pages.with({ boundTestRun: t, timeout: 3000 })); }
  await t.click(CustomPage.editBtn.nth(pageIndex).with({ boundTestRun: t, visibilityCheck: true, timeout: 5000 }));
  await t.expect(CustomPage.editModel.with({ boundTestRun: t, visibilityCheck: true, timeout: 3000 }).visible).ok('Validate the Edit Custom Page window appears', { timeout: 5000 });
  await t.typeText(CustomPage.pageName.with({ boundTestRun: t }), pageName, { replace: true });
  let pgPath = await CustomPage.pagePath.with({ boundTestRun: t }).getAttribute('value');
  await t.expect(pgPath.length - 1).eql(pageName.length);
  if (typeof pagePath !== 'undefined') {
    await t.typeText(CustomPage.pagePath.with({ boundTestRun: t }), pagePath, { replace: true });
    pgPath = await CustomPage.pagePath.with({ boundTestRun: t }).getAttribute('value');
    await t.expect(pgPath.length).eql(pagePath.length);
  }
  //Validate PagePath Error
  if (typeof errorMsg !== 'undefined') {
    await customPageErrorValidation(t, errorMsg, pagePath);
    return;
  }
  await t.click(CustomPage.saveBtn.with({ boundTestRun: t, timeout: 3000 }));
  await t.expect(Selector(`div[data-test-name="components.edit.mainEditor.EditorNav.pages.${pageName}"]`).with({ boundTestRun: t, visibilityCheck: true, timeout: 5000 }).exists)
    .ok('Validate Page is added', { timeout: 10000 });
};

/**
 * Delete Custom Page
 * @param  {TestController} t
 * @param {number} pageIndex
 */
const deleteCustomPage = async (t, pageIndex) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  console.info(`[${getTime()}] [${TEMPLATE.IMMERSION}] Delete Custom Page index: ${pageIndex}`);
  if (await Toaster.x.with({ boundTestRun: t }).exists) { await t.click(Toaster.x.with({ boundTestRun: t })); }
  if (await Subnav.pages.with({ boundTestRun: t }).getAttribute('aria-expanded') === 'false') { await t.click(Subnav.pages.with({ boundTestRun: t })); }
  await t.expect(CustomPage.editBtn.with({ boundTestRun: t, visibilityCheck: true, timeout: 5000 }).nth(pageIndex).exists).ok('Validate the Page exist');
  await t.click(CustomPage.editBtn.with({ boundTestRun: t, timeout: 3000 }).nth(pageIndex));
  await t.expect(CustomPage.editModel.with({ boundTestRun: t, visibilityCheck: true, timeout: 5000 }).visible).ok('Validate the Edit Custom Page window appears');
  const pgName = await CustomPage.pageName.with({ boundTestRun: t }).getAttribute('value');
  await t.click(CustomPage.deleteBtn.with({ boundTestRun: t, timeout: 2000 }));
  await t.expect(CustomPage.deleteModel.with({ boundTestRun: t, visibilityCheck: true, timeout: 5000 }).visible).ok('Validate the Delete Page Confirmation window appears');
  await t.click(CustomPage.confirmBtn.with({ boundTestRun: t, timeout: 2000 }));
  await t.expect(Selector(`div[data-test-name="components.edit.mainEditor.EditorNav.pages.${pgName}"]`).with({ boundTestRun: t }).exists)
    .notOk('Validate Page is Deleted', { timeout: 10000 });
};

/**
 * Use this function to valdate CustomPage path with invalid or already existing pagepath
 * @param  {TestController} t
 * @param  {string} errorMsg
 * @param  {string} pagePath
 */
const customPageErrorValidation = async (t, errorMsg, pagePath) => {
  console.info(`[${getTime()}] [${TEMPLATE.IMMERSION}] Validate CustomPage Error: ${errorMsg}`);
  await t.expect(CustomPage.FormError.with({ boundTestRun: t, visibilityCheck: true, timeout: 5000 }).visible).ok();
  await t.expect(CustomPage.saveBtn.with({ boundTestRun: t, timeout: 5000 }).getAttribute('aria-disabled')).eql('true');
  const actualError = CustomPage.FormError.with({ boundTestRun: t }).innerText;
  let expectedError = errorMsg;
  if (isErrorCodeMatching(errorMsg)) {
    if (CustomPageErrorMsg[errorMsg] === CustomPageErrorMsg.pathExist) {
      if (typeof pagePath === 'undefined') {
        expectedError = `already exists`;
      } else {
        expectedError = `Page ${pagePath} already exists`;
      }
      await t.expect(actualError).contains(expectedError);
      await t.click(CustomPage.cancelBtn.with({ boundTestRun: t, timeout: 2000 }));
      return;
    }
    await t.expect(actualError).eql(CustomPageErrorMsg[errorMsg]);
    await t.click(CustomPage.cancelBtn.with({ boundTestRun: t, timeout: 2000 }));
    return;
  } else {
    await t.expect(actualError).eql(expectedError);
    await t.click(CustomPage.cancelBtn.with({ boundTestRun: t, timeout: 2000 }));
  }
};

/**
 * Add a section to CustomPage
 * @param  {TestController} t
 * @param  {string} type
 * @param  {string} page
 * @param  {number} n=1
 */
const addSection = async (t, type, page, n = 1) => {
  await t.click(PageLink(page).with({ boundTestRun: t }));
  await waitForPageRefresh(t, common_helpers.waitOption.previewLoader);
  if (!(await CustomPage.addSection.with({ boundTestRun: t, timeout: 4000 }).exists)) {
    console.info(`[${getTime()}] [${TEMPLATE.IMMERSION}] Loading ${page}`);
    await t.switchToMainWindow();
    await t.click(Subnav.pages_Home.with({ boundTestRun: t }));
    await t.click(PageLink(page).with({ boundTestRun: t }));
    await waitForPageRefresh(t, common_helpers.waitOption.explicitWait, 2000);
  }
  await t.expect(CustomPage.addSection.with({ boundTestRun: t, timeout: 10000 }).exists).ok();
  let actualSectionCount = await CustomPage.sections.with({ boundTestRun: t }).count;
  if (typeof actualSectionCount === 'undefined') actualSectionCount = 0;
  for (let i = 1; i <= n; i++) {
    console.info(`[${getTime()}] [${TEMPLATE.IMMERSION}] Add Section: ${type} to CustomPage: ${page}`);
    await t.click(CustomPage.addSection.with({ boundTestRun: t }));
    const sCount = await GetSection(type).with({ boundTestRun: t }).count;
    if (typeof sCount === 'undefined') sCount = 0;
    await t.switchToMainWindow();
    if (type === SectionType.headline) {
      await t.click(CustomPage.addHeadline.with({ boundTestRun: t }));
    } else if (type === SectionType.text) {
      await t.click(CustomPage.addText.with({ boundTestRun: t }));
    } else if (type === SectionType.embed) {
      await t.click(CustomPage.addEmbed.with({ boundTestRun: t }));
    } else if (type === SectionType.agenda) {
      await t.click(CustomPage.addAgenda.with({ boundTestRun: t }));
    } else if (type === SectionType.people) {
      await t.click(CustomPage.addPeople.with({ boundTestRun: t }))
    }
    await waitForPageRefresh(t, common_helpers.waitOption.previewLoader);
    // Validate the session is added
    await t.expect(await GetSection(type).with({ boundTestRun: t }).count).eql(sCount + 1, { timeout: 10000 });
    // Validate the sessions count is incremented
    await t.expect(await CustomPage.sections.with({ boundTestRun: t }).count).eql(actualSectionCount + 1, { timeout: 10000 });
    actualSectionCount = await CustomPage.sections.with({ boundTestRun: t }).count;
    // Validate the Session index position is correct
    await t.expect(await GetSection(type, actualSectionCount - 1).with({ boundTestRun: t }).exists).ok(`wait for ${type} to appear`, { timeout: 10000 });
  }
  await t.switchToMainWindow();
};

/**
 * Edit Section
 * @param  {TestController} t
 * @param  {string} page
 * @param  {string} type
 * @param  {number} index
 */
const editSection = async (t, page, type, index) => {
  console.info(`[${getTime()}] [${TEMPLATE.IMMERSION}] Edit Section: ${type} of CustomPage: ${page} at index: ${index}`);
  await waitForPageRefresh(t);
  if (!(await GetSection(type, index).with({ boundTestRun: t }).exists)) {
    await t.switchToMainWindow();
    await t.click(Subnav.pages_Home.with({ boundTestRun: t }));
    await t.click(PageLink(page).with({ boundTestRun: t }));
    await waitForPageRefresh(t, common_helpers.waitOption.explicitWait, 2000);
  }
  if (type === SectionType.headline) {
    // Edit Headline and Cancel
    await t.click(GetSection(SectionType.headline, index).with({ boundTestRun: t, timeout: 2000 }));
    await t.expect(GetSection(SectionType.headline, index).with({ boundTestRun: t }).find('.Headline').innerText).eql('Headline');
    await t.typeText(CustomPage.headlineEditor.with({ boundTestRun: t }), page + ' Headline', { replace: true, paste: true });
    await t.click(CustomPage.headlineCancel.with({ boundTestRun: t, timeout: 2000 }));
    // Edit Headline and save
    await t.click(GetSection(SectionType.headline, index).with({ boundTestRun: t, timeout: 2000 }));
    await t.expect(GetSection(SectionType.headline, index).with({ boundTestRun: t }).find('.Headline').innerText).eql('Headline');
    await t.typeText(CustomPage.headlineEditor, page + 'Headline', { replace: true, paste: true });
    await t.click(CustomPage.headlineSave.with({ boundTestRun: t }));
    await waitForPageRefresh(t, common_helpers.waitOption.previewLoader);
    await t.expect(GetSection(SectionType.headline, index).with({ boundTestRun: t }).find('.Headline').innerText).eql(page + 'Headline', { timeout: 10000 });
  }
  if (type === SectionType.text) {
    // Change Font Size and Line Height
    await t.click(GetSection(SectionType.text, index).with({ boundTestRun: t, timeout: 2000 }));
    await t.click(CustomPage.textLineHeight.with({ boundTestRun: t }));
    await t.click(CustomPage.textLineHeight.with({ boundTestRun: t }).find('option').withAttribute('value', TextLineHt.px16[0]));
    await t.expect(CustomPage.textLineHeight.with({ boundTestRun: t }).value).eql(TextLineHt.px16[0]);
    await t.click(CustomPage.textFontSize.with({ boundTestRun: t, timeout: 2000 }));
    await t.click(CustomPage.textFontSize.with({ boundTestRun: t }).find('option').withAttribute('value', TextFontSize.px26[0]));
    await t.expect(CustomPage.textFontSize.with({ boundTestRun: t }).value).eql(TextFontSize.px26[0]);
    await t.click(CustomPage.textSave.with({ boundTestRun: t }));
    await waitForPageRefresh(t, common_helpers.waitOption.previewLoader);
    // TODO: Uncomment validation when Save option over the next section is working properly
    // await t.expect(GetSection(SectionType.text, index).with({ boundTestRun: t, timeout: 2000 }).find('p').withAttribute('style', 'font-size: ' + TextFontSize.px26[1] + '; line-height: ' + TextLineHt.px16[1] + ';').exists).ok({ timeout: 10000 });
  }
  if (type === SectionType.embed) {
    // Validate Error - ScriptNotAllowed
    await t.click(GetSection(SectionType.embed, index).with({ boundTestRun: t, timeout: 2000 }));
    await t.typeText(CustomPage.embedEditorHtml.with({ boundTestRun: t, timeout: 3000 }).find('textarea'), '<script>');
    await t.expect(CustomPage.embedEditorHtml.with({ boundTestRun: t }).find('span[class$="error-message"]').innerText).eql(CustomPageErrorMsg.embedError_ScriptNotAllowed, { timeout: 5000 });
    await t.expect(CustomPage.embedSave.with({ boundTestRun: t, timeout: 2000 }).getAttribute('aria-disabled')).eql('true');
    // Validate Embed external-Youtube
    await t.typeText(CustomPage.embedEditorHtml.with({ boundTestRun: t, timeout: 3000 }).find('textarea'), CustomPage.youtubeEmbed, { replace: true, paste: true });
    await t.click(CustomPage.embedSave.with({ boundTestRun: t, timeout: 2000 }));
    await waitForPageRefresh(t, common_helpers.waitOption.previewLoader, 2000);
    await t.expect(GetSection(SectionType.embed, index).with({ boundTestRun: t }).find('iframe[title="YouTube video player"]').exists).ok({ timeout: 5000 });
    await t.expect(GetSection(SectionType.embed, index).with({ boundTestRun: t }).find('div').withAttribute('style', 'height: 540px;').exists).ok({ timeout: 5000 });
    // Validate Embed Height change
    await t.click(GetSection(SectionType.embed, index).with({ boundTestRun: t, timeout: 2000 }));
    await t.typeText(CustomPage.embedHeight.with({ boundTestRun: t, timeout: 3000 }), '315', { replace: true, paste: true });
    await t.click(CustomPage.embedSave.with({ boundTestRun: t, timeout: 2000 }));
    await waitForPageRefresh(t, common_helpers.waitOption.previewLoader, 2000);
    await t.expect(GetSection(SectionType.embed, index).with({ boundTestRun: t }).find('div').withAttribute('style', 'height: 315px;').exists).ok({ timeout: 5000 });
  }
  if (type === SectionType.agenda) {
    await t.click(GetSection(SectionType.agenda, index).with({ boundTestRun: t, timeout: 2000 }));
    await t.click(customSelectAgenda.selectAgenda.with({ boundTestRun: t, timeout: 2000 }));
    await waitForPageRefresh(t, common_helpers.waitOption.previewLoader, 2000);
    await t.switchToMainWindow();
    await t.click(customSelectAgenda.createAgenda.with({ boundTestRun: t, timeout: 5000 }));
    await t.hover(agenda.backToAgendas.with({ boundTestRun: t, timeout: 5000 }));
    await t.click(agenda.backToAgendas.with({ boundTestRun: t }));
    await t.expect(agenda.importAgenda.with({ boundTestRun: t, visibilityCheck: true, timeout: 10000 }).exists).ok();
    await t.expect(agenda.moreOption.with({ boundTestRun: t, visibilityCheck: true, timeout: 10000 }).exists).ok();
    await waitForPageRefresh(t, common_helpers.waitOption.explicitWait, 3000, false);
    await t.click(agenda.moreOption.with({ boundTestRun: t, timeout: 5000 }));
    await waitForPageRefresh(t, common_helpers.waitOption.explicitWait, 3000, false);
    await t.expect(Agenda.deleteOption.with({ boundTestRun: t, visibilityCheck: true, timeout: 10000 }).exists).ok();
    await t.click(Agenda.deleteOption.with({ boundTestRun: t, timeout: 5000 }));
    await t.click(agenda.agendaDeleteConfirm.with({ boundTestRun: t, timeout: 10000 }));
    await importAgenda(TEMPLATE.IMMERSION, t);
    await t.click(agenda.moreOption.with({ boundTestRun: t, timeout: 5000 }));
    await t.click(Agenda.editOption.with({ boundTestRun: t, timeout: 5000 }));
    await t.click(agenda.activate.with({ boundTestRun: t, visibilityCheck: true, timeout: 10000 }));
    await t.click(agenda.agendaDialogConfirm.with({ boundTestRun: t, timeout: 5000 }));
    await t.hover(agenda.backToAgendas.with({ boundTestRun: t, timeout: 5000 }));
    await t.click(agenda.backToAgendas.with({ boundTestRun: t }));
    await t.hover(agenda.backToMyEvent.with({ boundTestRun: t, timeout: 5000 }));
    await t.click(agenda.backToMyEvent.with({ boundTestRun: t }));
    await waitForPageRefresh(t, common_helpers.waitOption.previewLoader, 5000);
    await t.click(GetSection(SectionType.agenda, index).with({ boundTestRun: t, timeout: 2000 }));
    await t.click(customSelectAgenda.selectAgenda.with({ boundTestRun: t, timeout: 2000 }));
    await waitForPageRefresh(t, common_helpers.waitOption.previewLoader, 2000);
    await t.switchToMainWindow();
    await t.click(customSelectAgenda.selectLastAgenda.with({ boundTestRun: t, timeout: 2000 }));
    await t.click(customSelectAgenda.saveBtn.with({ boundTestRun: t, timeout: 2000 }));
    await waitForPageRefresh(t, common_helpers.waitOption.previewLoader, 2000);
    await t.click(GetSection(SectionType.agenda, index).with({ boundTestRun: t, timeout: 2000 }));
    await t.expect(customSelectAgenda.editAgenda.with({ boundTestRun: t, visibilityCheck: true, timeout: 10000 }).exists).ok();
    await t.click(customSelectAgenda.cancelAgenda.with({ boundTestRun: t, timeout: 2000 }));
  }
  if (type === SectionType.people) {
    await t.click(GetSection(SectionType.people, index).with({ boundTestRun: t, timeout: 2000 }));
  }
  await t.switchToMainWindow();
};

/**
 * Validate AgendaWidget
 * @param  {TestController} t
 */
const validateAgendaWidget = async (t) => {
  console.info(`[${getTime()}] [${TEMPLATE.IMMERSION}] Validate Agenda Widget`);
  const csvPath = path.resolve(__dirname, '../assets/csv/AgendaTest.csv');
  let agendaData = await extractAgendaData(csvPath);
  let total_sessions = 0;
  let trackCount = 0;
  for (const track in agendaData) {
    total_sessions += agendaData[track].sessions.length;
    trackCount++;
  }
  await t.expect(CustomPage.adendaSessions.with({ boundTestRun: t, timeout: 5000 }).count).eql(total_sessions);
  await t.expect(customAgendaWidget.headerTrackNames.with({ boundTestRun: t, timeout: 5000 }).count).eql(trackCount);
  for (let i = 0; i < trackCount; i++) {
    const wAgendaTrack = await customAgendaWidget.headerTrackNames.with({ boundTestRun: t, timeout: 5000 }).nth(i).innerText;
    await t.expect(agendaData[wAgendaTrack]).ok('Validate presense of' + wAgendaTrack + ' in csv');
    for (let j = 0; j < total_sessions; j++) {
      const wAgendaTrack = await customAgendaWidget.columns.with({ boundTestRun: t }).nth(j).find(customAgendaWidget.trackTitle).innerText;
      const wSessionTitle = await customAgendaWidget.columns.with({ boundTestRun: t }).nth(j).find(customAgendaWidget.title).innerText;
      const wSessionSpeakersCount = await customAgendaWidget.columns.with({ boundTestRun: t }).nth(j).find(customAgendaWidget.speakers).count;
      const trackSessions = agendaData[wAgendaTrack].sessions.length;
      let k = 0;
      for (; k < trackSessions; k++) {
        if (agendaData[wAgendaTrack].sessions[k].sessionName.replace(/['"]+/g, '').toUpperCase() === wSessionTitle) {
          break;
        }
      }
      await t.expect(wSessionTitle).eql((agendaData[wAgendaTrack].sessions[k].sessionName).replace(/['"]+/g, '').toUpperCase());
      console.info(`[${getTime()}] [${TEMPLATE.IMMERSION}] Validated session name: ${wSessionTitle}`);
      await t.expect(wSessionSpeakersCount).eql(Number(agendaData[wAgendaTrack].sessions[k].speakers_count));
      console.info(`[${getTime()}] [${TEMPLATE.IMMERSION}] Validated number of speakers: ${wSessionSpeakersCount}`);
      const columnCard = await customAgendaWidget.columns.with({ boundTestRun: t, timeout: 5000 }).nth(j).find(customAgendaWidget.card);

      // Validate Event details
      await t.click(columnCard.with({ boundTestRun: t }));
      await t.expect(customAgendaWidget.eventModal.with({ boundTestRun: t }).visible).ok();
      await t.expect(customAgendaWidget.eventName.with({ boundTestRun: t }).innerText).eql((agendaData[wAgendaTrack].sessions[k].sessionName).replace(/['"]+/g, ''));
      await t.expect(customAgendaWidget.eventDesc.with({ boundTestRun: t }).innerText).eql((agendaData[wAgendaTrack].sessions[k].sessionDesc).replace(/['"]+/g, ''));
      await t.click(customAgendaWidget.eventClose.with({ boundTestRun: t }));
      console.info(`[${getTime()}] [${TEMPLATE.IMMERSION}] Validated Event details: ${wSessionTitle}`);
      // Validate Speaker details
      for (let s = 0; s < wSessionSpeakersCount; s++) {
        await t.click(columnCard.with({ boundTestRun: t }).find(customAgendaWidget.speakers).nth(s));
        await t.expect(customAgendaWidget.speakerModal.with({ boundTestRun: t }).visible).ok();
        await t.expect(customAgendaWidget.speakerName.with({ boundTestRun: t }).innerText).eql((agendaData[wAgendaTrack].sessions[k].speakers[s]).replace(/['"]+/g, ''));
        await t.click(customAgendaWidget.eventClose.with({ boundTestRun: t }));
        console.info(`[${getTime()}] [${TEMPLATE.IMMERSION}] Validated Speaker details: ${(agendaData[wAgendaTrack].sessions[k].speakers[s]).replace(/['"]+/g, '')}`);
      }
      if (j < total_sessions - 1) {
        const currentSessionDate = await columnCard.with({ boundTestRun: t }).find(customAgendaWidget.date).innerText;
        let p = j + 1;
        let nextCardTrack = await customAgendaWidget.columns.with({ boundTestRun: t }).nth(p).find(customAgendaWidget.trackTitle).innerText;
        while (wAgendaTrack !== nextCardTrack) {
          p++;
          if (p === total_sessions) {
            return;
          }
          nextCardTrack = await customAgendaWidget.columns.with({ boundTestRun: t }).nth(p).find(customAgendaWidget.trackTitle).innerText;
        }
        const nextColumnCard = await customAgendaWidget.columns.with({ boundTestRun: t, timeout: 5000 }).nth(p).find(customAgendaWidget.card);
        const nextSessionDate = await nextColumnCard.with({ boundTestRun: t }).find(customAgendaWidget.date).innerText;
        await t.expect(nextSessionDate >= currentSessionDate).ok('session order validation')
        console.info(`[${getTime()}] [${TEMPLATE.IMMERSION}] Validated sessions in datatime order: ${currentSessionDate};  ${nextSessionDate}`);
      }
    }
  }
};

/**
 * Delete Section
 * @param  {TestController} t
 * @param  {string} page
 * @param  {string} type
 * @param  {number} index
 */
const deleteSection = async (t, page, type, index) => {
  console.info(`[${getTime()}] [${TEMPLATE.IMMERSION}] Delete Section: ${type} of CustomPage: ${page} at index: ${index}`);
  await waitForPageRefresh(t);
  if (!(await GetSection(type, index).with({ boundTestRun: t }).exists)) {
    await t.switchToMainWindow();
    await t.click(Subnav.pages_Home.with({ boundTestRun: t }));
    await t.click(PageLink(page).with({ boundTestRun: t }));
    await waitForPageRefresh(t, common_helpers.waitOption.explicitWait, 2000);
  }
  await t.expect(GetSection(type, index).with({ boundTestRun: t, timeout: 3000 }).exists).ok({ timeout: 5000 });
  await t.click(GetSection(type, index).with({ boundTestRun: t, timeout: 3000 }));
  const sectionCount = await CustomPage.sections.with({ boundTestRun: t }).count;
  if (type === SectionType.headline) {
    await t.click(CustomPage.headlineDelete.with({ boundTestRun: t, timeout: 3000 }));
  }
  if (type === SectionType.text) {
    await t.click(CustomPage.textDelete.with({ boundTestRun: t, timeout: 3000 }));
  }
  if (type === SectionType.embed) {
    await t.click(CustomPage.embedDelete.with({ boundTestRun: t, timeout: 3000 }));
  }
  await waitForPageRefresh(t, common_helpers.waitOption.previewLoader);
  const sectionCountAfterDelete = await CustomPage.sections.with({ boundTestRun: t }).count;
  // Validate the Session index position is correct
  await t.expect(sectionCountAfterDelete).eql(sectionCount - 1, { timeout: 10000 });
  await t.switchToMainWindow();
};

/**
 * Move Section
 * @param  {TestController} t
 * @param  {string} page
 * @param  {string} type
 * @param  {number} typePosition
 * @param  {number} currentIndex
 * @param  {string} option - move Up/down
 */
const moveSection = async (t, page, type, typePosition, currentIndex, option) => {
  console.info(`[${getTime()}] [${TEMPLATE.IMMERSION}] Move Section: ${type} of CustomPage:${page}`);
  await waitForPageRefresh(t);
  if (!(await GetSection(type, currentIndex).with({ boundTestRun: t, visibilityCheck: true, timeout: 5000 }).visible)) {
    await t.switchToMainWindow();
    await t.click(Subnav.pages_Home.with({ boundTestRun: t }));
    await t.click(PageLink(page).with({ boundTestRun: t }));
    await waitForPageRefresh(t, common_helpers.waitOption.explicitWait, 2000);
  }
  let moveSelector;
  let expectedIndex = 0;
  if (option === moveOptions.Up) {
    moveSelector = Selector(`button[data-test-name="${CustomPage.moveUpBtn}.${type}"]`);
    expectedIndex = -1;
  } else {
    moveSelector = Selector(`button[data-test-name="${CustomPage.moveDownBtn}.${type}"]`);
    expectedIndex = +1;
  }
  await t.hover(GetSection(type, currentIndex).with({ boundTestRun: t, visibilityCheck: true, timeout: 2000 }));
  await t.expect(moveSelector.nth(typePosition).with({ boundTestRun: t, visibilityCheck: true, timeout: 2000 }).visible).ok({ timeout: 5000 });
  await t.click(GetSection(type, currentIndex).with({ boundTestRun: t, timeout: 2000 }));
  await t.click(Selector(`button[data-test-name="${CustomPage.sectionEditorCancel}.${type}"]`).with({ boundTestRun: t, timeout: 2000 }));
  await t.expect(moveSelector.nth(typePosition).with({ boundTestRun: t, visibilityCheck: true }).visible).ok({ timeout: 5000 });
  await t.click(moveSelector.nth(typePosition).with({ boundTestRun: t, timeout: 2000 }));
  await waitForPageRefresh(t, common_helpers.waitOption.previewLoader);
  await t.expect(GetSection(type, currentIndex + expectedIndex).with({ boundTestRun: t }).exists).ok({ timeout: 10000 });
  await t.switchToMainWindow();
};

/**
 * Add Custom Page to Menu Link
 * @param  {TestController} t
 * @param  {string} page
 */
const addCustomPageToMenu = async (t, page) => {
  console.info(`[${getTime()}] [${TEMPLATE.IMMERSION}] Add Page:${page} to Menu Nav Link`);
  await waitForPageRefresh(t);
  await t.click(ImmersionHome.addMenuItem.with({ boundTestRun: t, timeout: 3000 }));
  await t.switchToMainWindow();
  await t.expect(ImmersionHome.addMenuModelWindow.with({ boundTestRun: t, visibilityCheck: true }).exists).ok({ timeout: 5000 });
  await t.click(ImmersionHome.menuPageTab.with({ boundTestRun: t }));
  await t.click(ImmersionHome.pageDropdown.with({ boundTestRun: t }));
  await t.click(ImmersionHome.pageDropdown.with({ boundTestRun: t }).find('option').withText(page)); //withAttribute('value', TextFontSize.px26[0]));
  await t.click(ImmersionHome.save.with({ boundTestRun: t, timeout: 3000 }));
  await waitForPageRefresh(t, common_helpers.waitOption.previewLoader);
  await t.expect(ImmersionHome.menuLink.find(`a[title="${page}"]`).with({ boundTestRun: t, visibilityCheck: true, timeout: 5000 }).exists).ok();
  await t.switchToMainWindow();
};

/**
 * Wait for Page Refresh
 * @param  {TestController} t
 * @param  {string} waitOption
 * @param  {number} waitTimeOut
 * @param  {boolean} switchtoIframe
 */
const waitForPageRefresh = async (t, waitOption, waitTimeOut, switchtoIframe = true) => {
  await t.switchToMainWindow();
  if (waitOption === common_helpers.waitOption.previewLoader) {
    let timeout = 5000;
    let timer = 0;
    let condition = false;
    while (!condition) {
      condition = await CustomPage.previewLoader.with({ boundTestRun: t }).exists;
      await t.wait(1000);
      if (timeout <= ++timer * 1000) {
        break;
      }
    }
    timeout = 10000;
    while (condition) {
      condition = await CustomPage.previewLoader.with({ boundTestRun: t }).exists;
      await t.wait(1000);
      if (timeout <= (++timer * 1000)) { break; }
    }
  }
  if (typeof waitTimeOut !== 'undefined') { await t.wait(waitTimeOut); }
  if (!switchtoIframe) return;
  await t.expect(Selector('.page-preview-frame').with({ boundTestRun: t, visibilityCheck: true }).exists).ok(await common_helpers.getBrowserConsoleLogs(t));
  await t.switchToIframe('.page-preview-frame');
};

/**
 * Validate Custom Page - Performes Add a Page, Edit Page, Validate Path Error and Delete a page
 * @param  {TestController} t
 * @param  {number} n=2
 */
const validateCustomPage = async (t, n = 2) => {
  // Add Custom Page
  for (let i = 1; i <= n; i++) {
    await addCustomPage(t, `Custom Page ${i}`)
  }
  // Add Sessions to Custom Page 1
  await addSection(t, SectionType.headline, 'Custom Page 1', 1);
  await addSection(t, SectionType.text, 'Custom Page 1', 1);
  await addSection(t, SectionType.agenda, 'Custom Page 1', 1);
  await addSection(t, SectionType.people, 'Custom Page 1', 1);
  await addSection(t, SectionType.embed, 'Custom Page 1', 1);
  // Add additional sessions for deletion test
  await addSection(t, SectionType.headline, 'Custom Page 1', 1);
  // Edit Sessions
  await editSection(t, 'Custom Page 1', SectionType.headline, 0);
  await editSection(t, 'Custom Page 1', SectionType.text, 1);
  await editSection(t, 'Custom Page 1', SectionType.agenda, 2);
  await editSection(t, 'Custom Page 1', SectionType.people, 3);
  await editSection(t, 'Custom Page 1', SectionType.embed, 4);
  // Move Section Up
  // await moveSection(t, 'Custom Page 1', SectionType.text, 0, 1, moveOptions.Up);
  // Delete Section
  await deleteSection(t, 'Custom Page 1', SectionType.headline, 5);
  // Add Page To Menu
  await addCustomPageToMenu(t, 'Custom Page 1');
  // Page Path Validation - already exist
  await addCustomPage(t, 'Custom Page 1', '/custom-page-1', 'pathExist');
  // Edit Page Name and path
  await editCustomPage(t, n - 1, `Update Page ${n}`, `/page${n}`);
  // Edit Page - incorrect path Validation
  await editCustomPage(t, n - 1, `Page ${n}`, '/page 5 ', 'pathCharError');
  // Delete Page
  await deleteCustomPage(t, n - 1);
};

/**
 * Navigate to published URL->CustomPage and validate Sections are visible.
 * @param  {string} publishedUrl
 * @param  {string} customPage
 * @param  {TestController} t
 */
const validate_publishedCustomPage = async (publishedUrl, customPage, t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  console.info(`[${getTime()}] [${TEMPLATE.IMMERSION}] Validating Published CustomPage Sections are visible`);
  await t.navigateTo(publishedUrl);
  if (await Selector(`nav a[title="${customPage}"]`).with({ boundTestRun: t }).visible === false) {
    const menuButton = await Selector('.PageHeader button.HeaderButton').with({ boundTestRun: t });
    let activeHeaderMenuIndex = 0
    while (!(await menuButton.nth(activeHeaderMenuIndex).visible) && activeHeaderMenuIndex++ < 4);
    await t.expect(Selector('.PageHeader button.HeaderButton').with({ boundTestRun: t }).nth(activeHeaderMenuIndex).visible).ok({ timeout: 5000 });
    await t.click(Selector('.PageHeader button.HeaderButton').with({ boundTestRun: t }).nth(activeHeaderMenuIndex));
  }
  await t.expect(Selector(`nav a[title="${customPage}"]`).with({ boundTestRun: t }).visible).ok({ timeout: 5000 });
  await t.click(Selector(`nav a[title="${customPage}"]`).with({ boundTestRun: t }));
  await t.expect(CustomPage.published_headline.with({ boundTestRun: t }).visible).ok({ timeout: 5000 });
  await t.expect(CustomPage.published_text.with({ boundTestRun: t }).visible).ok({ timeout: 5000 });
  await t.expect(CustomPage.published_embed.with({ boundTestRun: t }).visible).ok({ timeout: 5000 });
  await t.expect(CustomPage.published_agenda.with({ boundTestRun: t }).visible).ok({ timeout: 5000 });
  await validateAgendaWidget(t);
};

module.exports = {
  TEMPLATE, login, login_user, filterTemplate, selectTemplate,
  createExperience, validateHomePagePreview, enableSearch, createCollection,
  addVideo, app2AddVideos, app2AddComponents, app2AddInteractivities, app2AddTracking,
  app1AddTracking, validateAndConfigureSEO, enableDownload, enableCountdown, enableSocialSharing,
  app2LiveEvent, previewExperience, publishExperience, publishapp2, clickPlayIconapp1,
  clickPlayIconapp2, validate_app1VideoPlayback, validate_app2VideoPlayback,
  validate_app1EventCountdown, validate_app2VideoDownload, validate_app1VideoDownload, validate_app2SocialShares,
  selectAgenda, importAgenda, createSpeakers, validateSpeaker, validateImportedAgenda, publishAgenda,
  validateFirstAgendaSession, validateSecondAgendaSession, validateThirdAgendaSession, validate_accessibility,
  addCustomPage, editCustomPage, deleteCustomPage, validateCustomPage, addSection, editSection, moveSection, deleteSection,
  addCustomPageToMenu, validate_publishedCustomPage, validate_app1SocialShares, validateAgendaWidget, getURL, getTime,
  validate_app1Search,
};
