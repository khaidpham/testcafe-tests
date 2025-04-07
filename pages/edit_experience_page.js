const { Selector } = require('testcafe');

const sidebar_toggleItem = '.app-subnav > ul > div > div > div > div > a > span';

const Subnav = {
  // PAGES
  pages: Selector('div[data-test-name="components.edit.mainEditor.EditorNav.pages"] > a'),
  pages_Home: Selector('div[data-test-name="components.edit.mainEditor.EditorNav.pages.index"]'),
  pages_Category: Selector('div[data-test-name="components.edit.mainEditor.EditorNav.pages.category"]'),
  pages_VideoDetail: Selector('div[data-test-name="components.edit.mainEditor.EditorNav.pages.detail"]'),
  pages_Search: Selector(sidebar_toggleItem).withExactText('Search'),
  pages_Playback: Selector('div[data-test-name="components.edit.mainEditor.EditorNav.pages.detail"]'),

  // VIDEOS
  videos: Selector('div[data-test-name="components.edit.mainEditor.EditorNav.videos"]'),
  videosapp2: Selector('span').withExactText('Videos'),
  videos_RemoveVideos: Selector('span').withExactText('Remove Videos'),
  videos_AddVideos: Selector('button > span').withExactText('Add Videos'),
  videos_SelectVideo: Selector('button > span').withExactText('Select Video'),
  videos_SelectVideos: Selector('button > span').withExactText('Select Videos'),
  videos_AddInteractivity: Selector('span').withExactText('Add Interactivity'),
  videos_app2Videos: Selector('.VideoSelector-row.app-thumbnail-small'),
  videos_PreEvent: Selector('.ee--video-tile-configuration').withExactText('Pre-Event'),
  videos_LiveEvent: Selector('.ee--video-tile-configuration').withExactText('Live'),
  videos_PostEvent: Selector('.ee--video-tile-configuration').withExactText('Post-Event'),
  videos_PreEventVideoId: Selector('.ee--video-tile-id'),
  videos_AddButton: Selector('button > span').withExactText('Add'),
  videos_SelectButton: Selector('button > span').withExactText('Select'),
  firstVideo: Selector('.app-grid-50').withText('Video Collection').find('tr'),
  saveVideo: Selector('button[data-test-name="components.edit.videos.singleVideo.SingleVideoPicker.save-brn"]'),

  // STYLE
  style: Selector('div[data-test-name="components.edit.mainEditor.EditorNav.style"]'),

  // CALLS-TO-ACTION
  cta: Selector('div[data-test-name="components.edit.mainEditor.EditorNav.calls-to-action"]'),
  cta_Home: Selector(sidebar_toggleItem).withExactText('Home'),
  cta_Category: Selector(sidebar_toggleItem).withExactText('Category'),
  cta_VideoDetail: Selector(sidebar_toggleItem).withExactText('Video Detail'),
  cta_Search: Selector(sidebar_toggleItem).withExactText('Search'),
  cta_Playback: Selector(sidebar_toggleItem).withExactText('Playback'),

  // APPEARANCE AND BEHAVIOR
  appearance: Selector('div[data-test-name="components.edit.mainEditor.EditorNav.appearance-and-behavior"]').child('a'),
  appearance_TemplateSettings: Selector('[data-test-name="components.edit.mainEditor.EditorNav.template-settings"] a span'),
  appearance_HeaderAndFooter: Selector('div[data-test-name="components.edit.mainEditor.EditorNav.headerfooter"]'),
  appearance_Custom: Selector('div[data-test-name="components.edit.mainEditor.EditorNav.custom"]'),

  // SITE FEATURES
  siteFeatures: Selector('div[data-test-name="components.edit.mainEditor.EditorNav.site-features"] a span'),
  siteFeatures_SiteSearch: Selector('div[data-test-name="components.edit.mainEditor.EditorNav.site-search"]'),
  enable_search: Selector('div[data-test-name="components.edit.settings.search.SearchSettings.search-enabled-cb"]'),
  save_search: Selector('button[data-test-name="components.edit.settings.search.SearchSettings.save-btn"]'),
  siteFeatures_Agenda: Selector('div[data-test-name="components.edit.mainEditor.EditorNav.agenda"]'),
  siteFeatures_Sponsors: Selector('div[data-test-name="components.edit.mainEditor.EditorNav.sponsors"]'),
  siteFeatures_Social: Selector('div[data-test-name="components.edit.mainEditor.EditorNav.social"]'),
  siteFeatures_Comments: Selector(sidebar_toggleItem).withExactText('Comments'),

  // VIDEO AND PLAYBACK
  videoPlayback: Selector('div[data-test-name="components.edit.mainEditor.EditorNav.video-and-playback"] a span'),
  videoPlayback_Video: Selector('div[data-test-name="components.edit.mainEditor.EditorNav.video"]'),
  videoPlayback_PlayerAndLeadForm: Selector('div[data-test-name="components.edit.mainEditor.EditorNav.player-and-lead-form"]'),

  // SITE CONFIGURATION
  siteConfiguration: Selector('div[data-test-name="components.edit.mainEditor.EditorNav.site-configuration"] a'),
  siteConfiguration_Url: Selector('div[data-test-name="components.edit.mainEditor.EditorNav.url"]'),
  siteConfiguration_Seo: Selector('div[data-test-name="components.edit.mainEditor.EditorNav.seo"]'),
  siteConfiguration_AccessControl: Selector('div[data-test-name="components.edit.mainEditor.EditorNav.accesscontrol"]'),
  siteConfiguration_ThirdParty_Tracking: Selector('div[data-test-name="components.edit.mainEditor.EditorNav.tracking"]'),

  //Settings
  app2Settings : Selector('span' ).withExactText('Settings'),
  app2Settings_Video: Selector('span').withExactText('Video'),
  app2Settings_Social: Selector('span').withExactText('Social'),
  app2Settings_Tracking: Selector('span').withExactText('Tracking'),

  // OVERVIEW
  overview: Selector('div[data-test-name="components.edit.mainEditor.EditorNav.overview"]'),
};

const Components = {
  left: Selector('.ee--plus-button').nth(0),
  right: Selector('.ee--plus-button').nth(1),
  top: Selector('.ee--plus-button').nth(2),
  bottom: Selector('.ee--plus-button').nth(3),
  ad: Selector('.ee--add-component').nth(0),
  chat: Selector('.ee--add-component').nth(1),
  custom: Selector('.ee--add-component').nth(2),
  image: Selector('.ee--add-component').nth(3),
  text: Selector('.ee--add-component').nth(4),
  feed: Selector('.ee--add-component').nth(5),

  imageURL: Selector('.gal-image-uploader-image-url-input input'),
  imageAdd: Selector('.gal-image-uploader-image-url-input span').withExactText('Add'),
  imageSize: Selector('.ee-editors-image-upload-styling-options label input').nth(1),
  imageW: Selector('.ee-editors-image-upload-styling-options label input').nth(2),
  imageH: Selector('.ee-editors-image-upload-styling-options label input').nth(3),
  imageAlignLeft: Selector('.ee-editors-image-alignment-wrap svg').nth(0),
  imageAlignCenter: Selector('.ee-editors-image-alignment-wrap svg').nth(1),
  imageAlignRight: Selector('.ee-editors-image-alignment-wrap svg').nth(2),
  imageLinkURL: Selector('.ee-editors-image-url-options input'),
  imageLinkNewWindow: Selector('.ee-editors-image-box'),

  adHeader: Selector('.ee-editors-advertisement textarea').nth(0),
  adUnit: Selector('.ee-editors-advertisement textarea').nth(1),
  feedCode: Selector('.ee-editors-container textarea'),
  customCode: Selector('.ee-editors-html textarea'),
  chatCode: Selector('.ee-editors-chat textarea'),

  beforePlay: Selector('span').withExactText('Before Play'),
  duringPlay: Selector('span').withExactText('Playing'),
  afterPlay: Selector('span').withExactText('After Play'),
  preEvent: Selector('span').withExactText('Pre-Event'),
  liveEvent: Selector('span').withExactText('Live'),
  postEvent: Selector('span').withExactText('Post-Event'),

  cancel: Selector('span').withExactText('Cancel'),
  save: Selector('span').withExactText('Save'),
}

const Interactivity = {
  iLink: Selector('.ee-video-inline-edit-options-option').nth(0), // Link
  iCard: Selector('.ee-video-inline-edit-options-option').nth(1), // Card
  iHTML: Selector('.ee-video-inline-edit-options-option').nth(2), // Companion HTML
  iImage: Selector('.ee-video-inline-edit-options-option').nth(3), // Companion Image
  iText: Selector('.ee-video-inline-edit-options-option').nth(4), // Text

  // interactivity settings
  link: Selector('.ee-interaction-editor li').nth(0),
  linkText: Selector('.ee-interactivity-dialog-content input').nth(0),
  linkURL: Selector('.ee-interactivity-dialog-content input').nth(1),
  cardImageUrl: Selector('.ee-interactivity-dialog-content input').nth(0),
  cardImageAdd: Selector('.ee-interactivity-dialog-content span').withExactText('Add'),
  cardTitle: Selector('.ee-interactivity-dialog-content input').nth(1),
  cardLinkText: Selector('.ee-interactivity-dialog-content input').nth(2),
  cardLinkURL: Selector('.ee-interactivity-dialog-content input').nth(3),
  comHTMLCode: Selector('.ee-interactivity-dialog-content textarea').nth(0),
  comImageUrl: Selector('.ee-interactivity-dialog-content input').nth(1),
  comImageAdd: Selector('.ee-interactivity-dialog-content span').withExactText('Add'),
  comImageLinkUrl: Selector('.ee-interactivity-dialog-content input').nth(6),
  comImageLinkNewWindow: Selector('.ee-interactivity-dialog-content input').nth(7),

  // configure
  configure: Selector('.ee-interaction-editor li').nth(1),
  start: Selector('.ee-interactivity input').nth(4),
  duration: Selector('.ee-interactivity input').nth(7),
  applyAll: Selector('.ee-interactivity span').withExactText('Apply this interaction to all videos in the experience'),
  cancel: Selector('.ee-interactivity span').withExactText('Cancel'),
  save: Selector('.ee-interactivity span').withExactText('Save'),
  close: Selector('.ee-interactivity button.app-close')
};

const ManageCollection = {
  addCollection: Selector('button > span').withText('Add New Collection'),
  collectionName: Selector('.appg-collection-list-item-label > input[type=name]'),
  editPlayListCollection: Selector('a').withText('Playlist'),
  editCustomTagsCollection: Selector('a').withText('Custom Tags'),
  editCustomSearchCollection: Selector('a').withText('Custom Search'),
  editCustomFieldCollection: Selector('a').withText('Custom Field'),
};

const EditCollection = {
  saveBtn: Selector('button', { visibilityCheck: true }).withText('Save'),
  dropDown: Selector('.appg-form-row > span > select'),
  selectedText: Selector('.appg-tag-list-input > input'),
  customFieldName: Selector('input[data-test-name="components.edit.videos.collections.CustomField.custom-field-key"]'),
  customFieldValue: Selector('input[data-test-name="components.edit.videos.collections.CustomField.custom-field-value"]'),
  playlistText: Selector('input[data-test-name="components.edit.videos.common.PlaylistTable.search"]'),
  radioPlaylistBtn: Selector('input[type=radio]').sibling('div').withText('Playlist'),
  radioCustomBtn: Selector('input[type=radio]').sibling('div').withText('Custom'),
  videoCount: Selector('.appg-paged-table-header'),
  playlistSelect: Selector('.appg-playlist-table tr td'),
};

const PublishingHeader = {
  previewBtn: Selector('div[data-test-name="components.edit.common.BuildControls.preview-btn"]'),
  publishBtn: Selector('button[data-test-name="components.edit.common.BuildControls.publish-btn"]'),
  publishEmbedBtn: Selector('span').withExactText('Publish & Embed'),
};

const PublishSiteModal = {
  cancel: Selector('button[data-test-name="components.edit.publish.PublishModal.cancel-btn"]'),
  publishNow: Selector('button[data-test-name="components.edit.publish.PublishModal.publish-btn"]'),
  publishedUrl: Selector('.gal-form-row-small > a'),
  publishapp2: Selector('button > span').withExactText('Publish'),
  publishedUrlapp2: Selector('.ee-publish > div > div > a', { timeout: 60000 }),
  publishedEmbedCode: Selector('textarea'),
};

const SidebarStyle = {
  backToExperience: Selector('.appg--style-link').child('a > div'),
};

const VideoSetting = {
  app2VideosDownload: Selector('#app-content > div > div > div > div > div > div > fieldset > div > div label > div').withExactText('Provide a download link for each video'),
  app2SaveBtn: Selector('#app-content > div >div > div > div > div > div button').withExactText('Save'),
  app1VideosDownload: Selector('[data-test-name="components.edit.settings.video.VideoSettings.download-option-all"]'),
  app1SaveBtn: Selector('button[data-test-name="components.edit.settings.video.VideoSettings.save-btn"]')
}

const SharingOptions = {
  app1FacebookText: Selector('#app-content h4').withText('Facebook'),
  app1FacebookInput: Selector('.gal-social-option input').nth(0),
  app1LinkedInText: Selector('#app-content h4').withText('LinkedIn'),
  app1LinkedInInput: Selector('.gal-social-option input').nth(2),
  app1PinterestText: Selector('#app-content h4').withText('Pinterest'),
  app1PinterestInput: Selector('.gal-social-option input').nth(4),
  app1XText: Selector('#app-content h4').withText('X'),
  app1XInput: Selector('.gal-social-option input').nth(6),
  app1EmailText: Selector('#app-content h4').withText('Email'),
  app1EmailInput: Selector('.gal-social-option input').nth(8),
  app1VideoSharingSave: Selector('button[data-test-name="components.edit.settings.social.VideoSharingTab.save-btn"]'),
  app1EventSharingSave: Selector('button[data-test-name="components.edit.settings.social.EventSharingTab.save-btn"]'),
  app2DisplayCollapsed: Selector('[name="videoSharingDisplayOptions"]').nth(0),
  app2DisplayExpanded: Selector('[name="videoSharingDisplayOptions"]').nth(1),
  app2LiveDisplayCollapsed: Selector('[name="videoSharingDisplayOptions"]').nth(0),
  app2LiveDisplayExpanded: Selector('[name="videoSharingDisplayOptions"]').nth(1),
  app2FacebookText: Selector('#app-content h4').withText('Facebook'),
  app2FacebookInput: Selector('.gal-social-option input').nth(0),
  app2LinkedInText: Selector('#app-content h4').withText('LinkedIn'),
  app2LinkedInInput: Selector('.gal-social-option input').nth(2),
  app2PinterestText: Selector('#app-content h4').withText('Pinterest'),
  app2PinterestInput: Selector('.gal-social-option input').nth(4),
  app2XText: Selector('#app-content h4').withText('X'),
  app2XInput: Selector('.gal-social-option input').nth(6),
  app2EmailText: Selector('#app-content h4').withText('Email'),
  app2EmailInput: Selector('.gal-social-option input').nth(8),
  app2LiveFacebookInput: Selector('.gal-social-option input').nth(10),
  app2LiveLinkedInInput: Selector('.gal-social-option input').nth(12),
  app2LivePinterestInput: Selector('.gal-social-option input').nth(14),
  app2LiveXInput: Selector('.gal-social-option input').nth(16),
  app2LiveEmailInput: Selector('.gal-social-option input').nth(18),
}

const Tracking = {
  app2GA: Selector('.ee-content input'),
  app1GA: Selector('[data-test-name^="components.edit.settings.tracking.TrackingSettings"] input').nth(0),
  save: Selector('span').withText('Save'),
}

const TemplateSettings = {
  enableCountdown: Selector('span').withText('Enable countdown'),
  dateDropdown: Selector('.app-toggle.gal-date-picker-dropdown-button'),
  dateNext: Selector('.DayPicker-NavButton.DayPicker-NavButton--next'),
  date1: Selector('.DayPicker-Day').withText('1'),
  save: Selector('span').withText('Save')
};

const HeaderAndFooter = {
  customHeaderHtml: Selector('.appg-form-row > label'),
  customHeaderHtmlInput: Selector('textarea').nth(0),
  headerandFooterSaveBtn: Selector('.appg-content > button')
};

const AddAgenda = {
  importAgenda: Selector('#agendaUpload-UploadField > label'),
  deactivateAgenda: Selector('#app-content > div > main > div > div> div > div > div > table > tbody > tr> td:.nth(2)'),
  newAgenda: Selector('#app-content > div > main > div button'),
  pubAgenda: Selector('#app-content > div > main > header > div > div > div > button'),
  siteConfig: Selector('div[data-test-name="components.edit.mainEditor.EditorNav.site-configuration"]'),
  accessControl: Selector('div[data-test-name="components.edit.mainEditor.EditorNav.accesscontrol"]'),
  accessControlSelect: Selector(
    '#app-content > div:nth-child(2) > div > div > div.app-main-after > div > div.appg-content > div > span > select'
  ),
  accessControlSaveButton: Selector('button[data-test-name="components.edit.settings.accessControl.AccessControl.save-btn"]'),
};

const Agenda = {
  agendaTable: Selector('table > tbody > tr'),
  lastAgenda: Selector('tr:last-child td'),
  moreOption: 'button svg[data-icon-name="MORE_HORIZONTAL"]',
  firstEvent: Selector('div[role="tablist').child(0),
  secondEvent: Selector('div[role="tablist').child(1),
  firstSession: Selector('.rapp-event-content > div > div > span').nth(0),
  secondSession: Selector('.rapp-event-content > div > div > span').nth(3),
  thirdSession: Selector('.rapp-event-content > div > div > span').nth(6),
  editOption: Selector('li').withExactText('Edit'),
  deleteOption: Selector('li').withExactText('Delete'),
  downloadOption: Selector('li').withExactText('Download'),
};

const Auth0 = {
  user: Selector('input[name="email"]'),
  password: Selector('input[name="password"]'),
  login: Selector('button[name="submit"]'),
};

const Toaster = {
  x: Selector('#app-content span').withText('×')
};

const SEO = {
  useDescriptionCB: Selector('div[data-test-name="components.edit.settings.seo.SeoSettings.use-description-seo-cb"] > label > input'),
  useCustomVideoFieldsCB: Selector('div[data-test-name="components.edit.settings.seo.SeoSettings.custom-fields-cb"] > label > input'),
  useCanonicalUrlCB: Selector('div[data-test-name="components.edit.settings.seo.SeoSettings.rel-link-canonical-cb"] > label > input'),
  disableVideoTitleCB: Selector('div[data-test-name="components.edit.settings.seo.SeoSettings.disable-video-title-cb"] > label > input'),
  metaImage: Selector('label[data-test-name="components.edit.settings.seo.SeoSettings.meta-image"]'),
  imageURL: Selector('input[placeholder="Paste image URL..."]'),
  addImage: Selector('button > span').withExactText('Add'),
  keywords: Selector('div[data-test-name="components.edit.settings.seo.SeoSettings.meta-keywords"] > input'),
  metaTags: Selector('label[data-test-name="components.edit.settings.seo.SeoSettings.meta-tags"] textarea'),
  useVideoTagsCB: Selector('div[data-test-name="components.edit.settings.seo.SeoSettings.video-tags-cb"] > label'),
  save: Selector('button[data-test-name="components.edit.settings.seo.SeoSettings.save-btn"]'),
};

module.exports = {
  Subnav,
  Components,
  Interactivity,
  ManageCollection,
  EditCollection,
  PublishingHeader,
  PublishSiteModal,
  SidebarStyle,
  VideoSetting,
  SharingOptions,
  Tracking,
  TemplateSettings,
  HeaderAndFooter,
  AddAgenda,
  Agenda,
  Auth0,
  Toaster,
  SEO,
};