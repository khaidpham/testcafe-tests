const { Selector } = require('testcafe');

const Publishedapp2 = {
  app2VideoDownload: Selector('.ee-components-download-button'),
  app2FacebookShare: Selector('.ee-components-share-button a').nth(0),
  app2LinkedInShare: Selector('.ee-components-share-button a').nth(1),
  app2PinterestShare: Selector('.ee-components-share-button a').nth(2),
  app2XShare: Selector('.ee-components-share-button a').nth(3),
  app2EmailShare: Selector('.ee-components-share-button a').nth(4),
};

const Publishedapp1 = {
  videoGridItem: Selector('.video-grid-item'),
  app1VideoDownload: Selector('#video-download > a'),
  app1LightboxVideoDownload: Selector('.fa-cloud-download > a'),
  chronicleShareIcon: Selector('.video-share__icon'),
  chronicleVideoDownload: Selector('i.fa.fa-cloud-download').parent('a'),
  chronicleDownloadIcon: Selector('i.fa.fa-cloud-download'),
  discoveryVideoDownload: Selector('.social-share__item--download'),
  showcaseVideoDownload: Selector('.fa.fa-cloud-download').parent('a'),
  showcaseHeroPlay: Selector('#hero .fa.fa-play'),
  countdownHeading: Selector('.countdown h3'),
  countdownMonths: Selector('.months'),
  countdownDays: Selector('.days'),
  countdownHours: Selector('.hours'),
  countdownMinutes: Selector('.minutes'),
  countdownSeconds: Selector('.seconds'),
  shareFacebook: Selector('a[data-media="facebook"]'),
  shareX: Selector('a[data-media="twitter"]'),
  shareLinkedIn: Selector('a[data-media="linkedin"]'),
  sharePinterest: Selector('a[data-media="pinterest"]'),
  shareEmail: Selector('a[data-media="email"]'),
  discoveryShareFacebook: Selector('.social-share__item--facebook'),
  discoveryShareX: Selector('.social-share__item--twitter'),
  discoveryShareLinkedIn: Selector('.social-share__item--linkedin'),
  discoverySharePinterest: Selector('.social-share__item--pinterest'),
  discoveryShareEmail: Selector('.social-share__item--envelope'),
  chronicleShareFacebook: Selector('.video-share__item a').nth(0),
  chronicleShareX: Selector('.video-share__item a').nth(1),
  chronicleShareLinkedIn: Selector('.video-share__item a').nth(2),
  chronicleSharePinterest: Selector('.video-share__item a').nth(3),
  chronicleShareEmail: Selector('.video-share__item a').nth(4)
};

module.exports = {
  Publishedapp2,
  Publishedapp1,
};