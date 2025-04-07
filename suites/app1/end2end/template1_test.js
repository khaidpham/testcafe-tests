import * as app1_helpers from '../../../helpers/app1_helper_functions';
import { cloudyFixtureHelper } from '../../../helpers/fixtures';

const templateName = app1_helpers.TEMPLATE.TEMPLATE1;
const [env, ga, violationThreshold] = cloudyFixtureHelper(templateName);

test.meta('level', 'smoke')(`Validate ${templateName} app1 experience on ${env} on ${env}`, async t => {
  await t.maximizeWindow();
  await app1_helpers.selectTemplate(templateName, 'app1', t);
  await app1_helpers.createExperience(templateName, 'app1', ga, t);
  await app1_helpers.validateHomePagePreview(templateName, t);
  await app1_helpers.enableDownload(templateName, 'app1', t);
  await app1_helpers.enableSearch(templateName, t);
  await app1_helpers.enableSocialSharing(templateName, 'app1', t);
  await app1_helpers.app1AddTracking(templateName, ga, t);
  await app1_helpers.validateAndConfigureSEO(templateName, t);
  const publishedUrl = await app1_helpers.publishExperience(templateName, t);
  await app1_helpers.validate_app1VideoPlayback(publishedUrl, templateName, t);
  await app1_helpers.validate_app1Search(publishedUrl, templateName, t);
  await app1_helpers.validate_app1SocialShares(publishedUrl, templateName, env, t);
  await app1_helpers.validate_app1VideoDownload(publishedUrl, templateName, t);
  await app1_helpers.validate_accessibility(publishedUrl, templateName, violationThreshold, t);
});
