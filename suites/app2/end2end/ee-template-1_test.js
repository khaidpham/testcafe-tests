import * as app1_helpers from '../../../helpers/app1_helper_functions';
import { cloudyFixtureHelper } from '../../../helpers/fixtures';
import { templateNameEnv } from '../../../helpers/common_helper_functions';

const template = 'Template 1';
const [env, ga] = cloudyFixtureHelper(template);
const templateName = templateNameEnv(template, env);

test(`Validate ${templateName} app2 experience`, async t => {
  await t.maximizeWindow();
  await app1_helpers.selectTemplate(templateName, 'In-Page', t);
  await app1_helpers.createExperience(templateName, 'In-Page', ga, t);
  await app1_helpers.app2AddComponents(templateName, t);
  await app1_helpers.app2AddVideos(templateName, 4, t);
  await app1_helpers.app2AddInteractivities(templateName, t);
  await app1_helpers.enableDownload(templateName, 'In-Page', t);
  await app1_helpers.enableSocialSharing(templateName, 'In-Page', t);
  await app1_helpers.app2AddTracking(templateName, ga, t);
  const publishedUrl = await app1_helpers.publishapp2(templateName, t);
  await app1_helpers.validate_app2VideoPlayback(publishedUrl, templateName, t);
  await app1_helpers.validate_app2SocialShares(publishedUrl, templateName, env, t);
  await app1_helpers.validate_app2VideoDownload(publishedUrl, templateName, t);
});
