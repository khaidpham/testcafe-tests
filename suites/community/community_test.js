import { loginHelper } from '../../helpers/fixtures';
import { validateAskCommunityAccess, validateAskCommunityWithGainSightBadRequest } from '../../helpers/community_helper_functions'

const [env] = loginHelper();

test(`Validate VC->Help->AskCommunity Access on ${env}`, async t => {
  await t.maximizeWindow();
  await validateAskCommunityAccess(env, t);
  await validateAskCommunityWithGainSightBadRequest(env, t);
});