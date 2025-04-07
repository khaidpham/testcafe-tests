import * as app1_helpers from '../../../helpers/app1_helper_functions';
import { cloudyFixtureHelper } from '../../../helpers/fixtures';

const templateName = app1_helpers.TEMPLATE.TEMPLATE3;
const [env, ga, violationThreshold] = cloudyFixtureHelper(templateName);

test(`Validate ${templateName} app1 experience on ${env}`, async t => {
  // Capture browser console messages
  window.addEventListener('error', function (e) {
    console.error(e.message); 
  });
  })(`Logged console messages`, async t => {
  // console.log(await t.getBrowserConsoleMessages());

  await t.maximizeWindow();
  await app1_helpers.selectTemplate(templateName,'app1', t);
  await app1_helpers.createExperience(templateName,'Custom', ga, t);
  await app1_helpers.validateHomePagePreview(templateName, t);
  await app1_helpers.createCollection(templateName, 'Playlist','','Iapp', t);
  await app1_helpers.createCollection(templateName, 'Custom Tags','Tags','Iapp', t);
  await app1_helpers.createCollection(templateName, 'Custom Search','Search','example', t);
  await app1_helpers.createCollection(templateName, 'Custom Field','Custom Field','Iapp', t);
  await app1_helpers.validateCustomPage(t);
  await app1_helpers.enableSearch(templateName, t);
  await app1_helpers.validateAndConfigureSEO(templateName, t);
  await app1_helpers.app1AddTracking(templateName, ga, t);
  const publishedUrl = await app1_helpers.publishExperience(templateName, t);
  await app1_helpers.validate_app1VideoPlayback(publishedUrl, templateName, t);
  await app1_helpers.validate_app1Search(publishedUrl, templateName, t);
  await app1_helpers.validate_publishedCustomPage(publishedUrl,'Custom Page 1', t);
  await app1_helpers.validate_accessibility(publishedUrl, templateName, violationThreshold, t);
  await app1_helpers.validate_accessibility(publishedUrl, templateName, violationThreshold, t, 'Custom Page 1');
});
