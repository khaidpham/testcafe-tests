const { Selector} = require('testcafe');

const ChooseTemplateHeader = {
  backToAllExperiences: Selector('.appg-choose-template-header a'),
  header: Selector('.appg-choose-template-header span'),
};

const TemplateFilterBar = {
  all: Selector('div[data-test-name="components.create.TemplateChooserFilterBar.filters-all"]'),
  app1: Selector('div[data-test-name="components.create.TemplateChooserFilterBar.filters-videoSites"]'),
  inpage: Selector('div[data-test-name="components.create.TemplateChooserFilterBar.filters-videoLayouts"]'),
  landingpage: Selector('div[data-test-name="components.create.TemplateChooserFilterBar.filters-filters-landingPages"]'),
  event: Selector('div[data-test-name="components.create.TemplateChooserFilterBar.filters-eventSites"]'),
  custom: Selector('div[data-test-name="components.create.TemplateChooserFilterBar.filters-custom"]'),
};

const Templates = {
  templateTitle: Selector('.appg-choose-template-item-header > h2'),
  templateChooseBtn: Selector('.appg-choose-template-item-actions > button > span').withExactText('Choose'),
  templateChooseClassic: Selector('div[data-test-name="components.create.TemplateGrid.item-the_classic-v2"]').find('button'),
  templateChooseMarquee: Selector('div[data-test-name="components.create.TemplateGrid.item-marquee-v2"]').find('button'),
  templateChooseMosaic: Selector('div[data-test-name="components.create.TemplateGrid.item-mosaic"]').find('button'),
};

const ExperienceOverview = {
  noThanks: Selector('input[type=radio]').sibling('div').withText('No thanks'),
  populateExperience: Selector('input[type=radio]').sibling('div').withText('Yes, pre-populate my experience'),
  cancelBtn: Selector('button[data-test-name="components.create.CreateSiteModal.cancel-btn"]'),
  createExperienceBtn: Selector('button').withText('Create Experience'),
  privacyInput: Selector('.appg-input-big-margin[data-test-name="components.edit.overview.Overview.privacy-link"]').child('input'),
  termsInput: Selector('.appg-input-big-margin[data-test-name="components.edit.overview.Overview.terms-link"]').child('input'),
  helpEmail: Selector('input[type=email]'),
};

module.exports = {
  ChooseTemplateHeader,
  TemplateFilterBar,
  Templates,
  ExperienceOverview,
};