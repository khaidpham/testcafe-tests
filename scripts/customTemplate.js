import * as app1_helpers from '../../../helpers/app1_helper_functions';
import { cloudyFixtureHelper } from '../../../helpers/fixtures';

const templateName = 'Custom';
const [env, ga] = cloudyFixtureHelper(templateName);

test(`Validate ${templateName} app1 experience on ${env}`, async t => {
  await t.maximizeWindow();
  await app1_helpers.selectTemplate(templateName,'Custom', t);
  await app1_helpers.createExperience(templateName,'Custom', ga, t);
  await app1_helpers.createCollection(templateName, 'Playlist','','Iapp', t);
  await app1_helpers.createCollection(templateName, 'Custom Tags','Tags','Iapp', t);
  await app1_helpers.createCollection(templateName, 'Custom Search','Search','example', t);
  await app1_helpers.createCollection(templateName, 'Custom Field','Custom Field','Iapp', t);
  await app1_helpers.enableDownload(templateName, 'app1', t);
  await app1_helpers.enableSocialSharing(templateName, 'app1', t);
  await app1_helpers.app1AddTracking(templateName, ga, t);
  await app1_helpers.publishExperience(templateName, t);
});
