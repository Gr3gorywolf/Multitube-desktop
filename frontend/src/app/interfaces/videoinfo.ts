export interface VideoInfo {
  innertube_api_key:                string;
  fflags:                           string;
  watermark:                        string;
  innertube_api_version:            string;
  adaptive_fmts:                    string;
  fexp:                             string;
  host_language:                    string;
  player_response:                  PlayerResponse;
  fmt_list:                         string;
  c:                                string;
  csi_page_type:                    string;
  innertube_context_client_version: string;
  cver:                             string;
  gapi_hint_params:                 string;
  url_encoded_fmt_stream_map:       string;
  enablecsi:                        string;
  csn:                              string;
  root_ve_type:                     string;
  cr:                               string;
  timestamp:                        string;
  status:                           string;
  hl:                               string;
  vss_host:                         string;
  formats:                          Format[];
  author:                           Author;
  published:                        number;
  description:                      string;
  media:                            Media;
  related_videos:                   RelatedVideo[];
  video_id:                         string;
  video_url:                        string;
  title:                            string;
  length_seconds:                   string;
  age_restricted:                   boolean;
  html5player:                      string;
  full:                             boolean;
}

export interface Author {
  id:          string;
  name:        string;
  avatar:      string;
  verified:    boolean;
  user:        string;
  channel_url: string;
  user_url:    string;
}

export interface Format {
  mimeType:         string;
  qualityLabel?:    QualityLabel | null;
  bitrate:          number;
  audioBitrate?:    number | null;
  itag:             number;
  width?:           number;
  height?:          number;
  lastModified:     string;
  contentLength:    string;
  quality:          Quality;
  projectionType:   ProjectionType;
  averageBitrate:   number;
  audioQuality?:    AudioQuality;
  approxDurationMs: string;
  audioSampleRate?: string;
  audioChannels?:   number;
  url:              string;
  sp:               SP;
  s:                string;
  container?:       Container;
  codecs?:          string;
  live?:            boolean;
  isHLS?:           boolean;
  isDashMPD?:       boolean;
  initRange?:       Range;
  indexRange?:      Range;
  fps?:             number;
  colorInfo?:       ColorInfo;
  highReplication?: boolean;
}

export enum AudioQuality {
  AudioQualityLow = "AUDIO_QUALITY_LOW",
  AudioQualityMedium = "AUDIO_QUALITY_MEDIUM",
}

export interface ColorInfo {
  primaries:               Primaries;
  transferCharacteristics: TransferCharacteristics;
  matrixCoefficients:      MatrixCoefficients;
}

export enum MatrixCoefficients {
  ColorMatrixCoefficientsBt709 = "COLOR_MATRIX_COEFFICIENTS_BT709",
}

export enum Primaries {
  ColorPrimariesBt709 = "COLOR_PRIMARIES_BT709",
}

export enum TransferCharacteristics {
  ColorTransferCharacteristicsBt709 = "COLOR_TRANSFER_CHARACTERISTICS_BT709",
}

export enum Container {
  Mp4 = "mp4",
  Webm = "webm",
}

export interface Range {
  start: string;
  end:   string;
}

export enum ProjectionType {
  Rectangular = "RECTANGULAR",
}

export enum Quality {
  Hd1080 = "hd1080",
  Hd720 = "hd720",
  Large = "large",
  Medium = "medium",
  Small = "small",
  Tiny = "tiny",
}

export enum QualityLabel {
  The1080P = "1080p",
  The144P = "144p",
  The240P = "240p",
  The360P = "360p",
  The480P = "480p",
  The720P = "720p",
}

export enum SP {
  Sig = "sig",
}

export interface Media {
  category_url: string;
  category:     string;
}

export interface PlayerResponse {
  playabilityStatus: PlayabilityStatus;
  streamingData:     StreamingData;
  playerAds:         PlayerAd[];
  playbackTracking:  PlaybackTracking;
  videoDetails:      VideoDetails;
  playerConfig:      PlayerConfig;
  storyboards:       Storyboards;
  microformat:       Microformat;
  trackingParams:    string;
  attestation:       Attestation;
  adPlacements:      AdPlacement[];
}

export interface AdPlacement {
  adPlacementRenderer: AdPlacementRenderer;
}

export interface AdPlacementRenderer {
  config:         Config;
  renderer:       Renderer;
  trackingParams: string;
}

export interface Config {
  adPlacementConfig: AdPlacementConfig;
}

export interface AdPlacementConfig {
  kind:               string;
  adTimeOffset:       AdTimeOffset;
  hideCueRangeMarker: boolean;
}

export interface AdTimeOffset {
  offsetStartMilliseconds: string;
  offsetEndMilliseconds:   string;
}

export interface Renderer {
  adBreakServiceRenderer: AdBreakServiceRenderer;
}

export interface AdBreakServiceRenderer {
  getAdBreakUrl:         string;
  prefetchMilliseconds?: string;
}

export interface Attestation {
  playerAttestationRenderer: PlayerAttestationRenderer;
}

export interface PlayerAttestationRenderer {
  challenge:    string;
  botguardData: BotguardData;
}

export interface BotguardData {
  program:        string;
  interpreterUrl: string;
}

export interface Microformat {
  playerMicroformatRenderer: PlayerMicroformatRenderer;
}

export interface PlayerMicroformatRenderer {
  thumbnail:            PlayerMicroformatRendererThumbnail;
  embed:                Embed;
  title:                Description;
  description:          Description;
  lengthSeconds:        string;
  ownerProfileUrl:      string;
  ownerGplusProfileUrl: string;
  externalChannelId:    string;
  isFamilySafe:         boolean;
  availableCountries:   string[];
  isUnlisted:           boolean;
  hasYpcMetadata:       boolean;
  viewCount:            string;
  category:             string;
  publishDate:          Date;
  ownerChannelName:     string;
  uploadDate:           Date;
}

export interface Description {
  simpleText: string;
}

export interface Embed {
  iframeUrl:      string;
  flashUrl:       string;
  width:          number;
  height:         number;
  flashSecureUrl: string;
}

export interface PlayerMicroformatRendererThumbnail {
  thumbnails: ThumbnailElement[];
}

export interface ThumbnailElement {
  url:    string;
  width:  number;
  height: number;
}

export interface PlayabilityStatus {
  status:          string;
  playableInEmbed: boolean;
}

export interface PlaybackTracking {
  videostatsPlaybackUrl:  PtrackingURLClass;
  videostatsDelayplayUrl: PtrackingURLClass;
  videostatsWatchtimeUrl: PtrackingURLClass;
  ptrackingUrl:           PtrackingURLClass;
  qoeUrl:                 PtrackingURLClass;
  setAwesomeUrl:          AtrURLClass;
  atrUrl:                 AtrURLClass;
}

export interface AtrURLClass {
  baseUrl:                 string;
  elapsedMediaTimeSeconds: number;
}

export interface PtrackingURLClass {
  baseUrl: string;
}

export interface PlayerAd {
  playerLegacyDesktopWatchAdsRenderer: PlayerLegacyDesktopWatchAdsRenderer;
}

export interface PlayerLegacyDesktopWatchAdsRenderer {
  playerAdParams: PlayerAdParams;
  afvParams:      AfvParams;
  afcParams:      AfcParams;
  gutParams:      GutParams;
  showAfv:        boolean;
  showCompanion:  boolean;
  showInstream:   boolean;
  useGut:         boolean;
}

export interface AfcParams {
  adBlock:    string;
  adChannel:  string;
  adClient:   string;
  adHost:     string;
  adType:     string;
  format:     string;
  lact:       string;
  language:   string;
  videoDocId: string;
  coreDbp:    string;
  loeid:      string;
  pucrd:      string;
}

export interface AfvParams {
  googleAdBlock:    string;
  googleAdChannel:  string;
  googleAdClient:   string;
  googleAdFormat:   string;
  googleAdHeight:   string;
  googleAdHost:     string;
  googleAdType:     string;
  googleLact:       string;
  googleLanguage:   string;
  googleLoeid:      string;
  googlePageUrl:    string;
  googleVideoDocId: string;
  googleYtPt:       string;
  googleCoreDbp:    string;
  googlePucrd:      string;
}

export interface GutParams {
  tag: string;
}

export interface PlayerAdParams {
  showContentThumbnail: boolean;
  enabledEngageTypes:   string;
}

export interface PlayerConfig {
  audioConfig:           AudioConfig;
  streamSelectionConfig: StreamSelectionConfig;
  mediaCommonConfig:     MediaCommonConfig;
}

export interface AudioConfig {
  loudnessDb:              number;
  perceptualLoudnessDb:    number;
  enablePerFormatLoudness: boolean;
}

export interface MediaCommonConfig {
  dynamicReadaheadConfig: DynamicReadaheadConfig;
}

export interface DynamicReadaheadConfig {
  maxReadAheadMediaTimeMs: number;
  minReadAheadMediaTimeMs: number;
  readAheadGrowthRateMs:   number;
}

export interface StreamSelectionConfig {
  maxBitrate: string;
}

export interface Storyboards {
  playerStoryboardSpecRenderer: PlayerStoryboardSpecRenderer;
}

export interface PlayerStoryboardSpecRenderer {
  spec: string;
}

export interface StreamingData {
  expiresInSeconds: string;
  formats:          Format[];
  adaptiveFormats:  Format[];
}

export interface VideoDetails {
  videoId:           string;
  title:             string;
  lengthSeconds:     string;
  keywords:          string[];
  channelId:         string;
  isOwnerViewing:    boolean;
  shortDescription:  string;
  isCrawlable:       boolean;
  thumbnail:         PlayerMicroformatRendererThumbnail;
  averageRating:     number;
  allowRatings:      boolean;
  viewCount:         string;
  author:            string;
  isPrivate:         boolean;
  isUnpluggedCorpus: boolean;
  isLiveContent:     boolean;
}

export interface RelatedVideo {
  id:                    string;
  title:                 string;
  author:                string;
  ucid:                  string;
  author_thumbnail:      string;
  short_view_count_text: string;
  view_count:            string;
  length_seconds:        number;
  video_thumbnail:       string;
}
