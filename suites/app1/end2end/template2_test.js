import * as app1_helpers from '../../../helpers/app1_helper_functions';
import { cloudyFixtureHelper } from '../../../helpers/fixtures';

const templateName = app1_helpers.TEMPLATE.TEMPLATE2;
const [env, ga, violationThreshold] = cloudyFixtureHelper(templateName);

test(`Validate ${templateName} experience on ${env}`, async t => {
  await t.maximizeWindow();
  await app1_helpers.selectTemplate(templateName, 'Event', t);
  await app1_helpers.createExperience(templateName, 'Event', ga, t);
  // create and validate speeker
  await app1_helpers.selectAgenda(templateName, t);
  const createdSpeaker = await app1_helpers.createSpeakers(templateName, t);
  await app1_helpers.validateSpeaker(templateName, createdSpeaker, t);
  // import and validate agenda session
  await app1_helpers.selectAgenda(templateName, t);
  await app1_helpers.importAgenda(templateName, t);
  await app1_helpers.validateImportedAgenda(templateName, t);
  await app1_helpers.validateAndConfigureSEO(templateName, t);
  // enable template features
  await app1_helpers.app1AddTracking(templateName, ga, t);
  await app1_helpers.enableDownload(templateName, 'app1', t);
  await app1_helpers.enableSocialSharing(templateName, 'app1', t);
  // validate features on published experience
  const publishedUrl = await app1_helpers.publishExperience(templateName, t);
  await app1_helpers.validate_app1VideoPlayback(publishedUrl, templateName, t);
  await app1_helpers.validate_app1SocialShares(publishedUrl, templateName, env, t);
  await app1_helpers.validate_app1VideoDownload(publishedUrl, templateName, t);
  await app1_helpers.validate_accessibility(publishedUrl, templateName, violationThreshold, t);
});
