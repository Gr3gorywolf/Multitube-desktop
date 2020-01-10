export interface YoutubeTrendsResponse {
  responseContext: ResponseContext;
  contents:        Contents;
  header:          YoutubeTrendsResponseHeader;
  trackingParams:  string;
  topbar:          Topbar;
}

export interface Contents {
  twoColumnBrowseResultsRenderer: TwoColumnBrowseResultsRenderer;
}

export interface TwoColumnBrowseResultsRenderer {
  tabs: Tab[];
}

export interface Tab {
  tabRenderer: TabRenderer;
}

export interface TabRenderer {
  selected:       boolean;
  content:        TabRendererContent;
  tabIdentifier:  string;
  trackingParams: string;
}

export interface TabRendererContent {
  sectionListRenderer: SectionListRenderer;
}

export interface SectionListRenderer {
  contents:       SectionListRendererContent[];
  trackingParams: string;
  subMenu:        SubMenu;
}

export interface SectionListRendererContent {
  itemSectionRenderer: ItemSectionRenderer;
}

export interface ItemSectionRenderer {
  contents:       ItemSectionRendererContent[];
  trackingParams: string;
}

export interface ItemSectionRendererContent {
  shelfRenderer: ShelfRenderer;
}

export interface ShelfRenderer {
  content:        ShelfRendererContent;
  trackingParams: string;
  title?:         TitleElement;
}

export interface ShelfRendererContent {
  expandedShelfContentsRenderer: ExpandedShelfContentsRenderer;
}

export interface ExpandedShelfContentsRenderer {
  items: ExpandedShelfContentsRendererItem[];
}

export interface ExpandedShelfContentsRendererItem {
  videoRenderer: VideoRenderer;
}

export interface VideoRenderer {
  videoId:                            string;
  thumbnail:                          VideoRendererThumbnail;
  title:                              PurpleTitle;
  descriptionSnippet:                 TitleElement;
  longBylineText:                     LongBylineTextClass;
  publishedTimeText:                  PublishedTimeTextClass;
  lengthText:                         Text;
  viewCountText:                      PublishedTimeTextClass;
  navigationEndpoint:                 VideoRendererNavigationEndpoint;
  ownerText:                          LongBylineTextClass;
  shortBylineText:                    LongBylineTextClass;
  trackingParams:                     string;
  showActionMenu:                     boolean;
  shortViewCountText:                 PublishedTimeTextClass;
  menu:                               VideoRendererMenu;
  channelThumbnailSupportedRenderers: ChannelThumbnailSupportedRenderers;
  thumbnailOverlays:                  ThumbnailOverlay[];
  richThumbnail?:                     RichThumbnail;
  ownerBadges?:                       OwnerBadge[];
}

export interface ChannelThumbnailSupportedRenderers {
  channelThumbnailWithLinkRenderer: ChannelThumbnailWithLinkRenderer;
}

export interface ChannelThumbnailWithLinkRenderer {
  thumbnail:          ChannelThumbnailWithLinkRendererThumbnail;
  navigationEndpoint: ChannelThumbnailWithLinkRendererNavigationEndpoint;
  accessibility:      HotkeyAccessibilityLabelClass;
}

export interface HotkeyAccessibilityLabelClass {
  accessibilityData: PurpleAccessibility;
}

export interface PurpleAccessibility {
  label: string;
}

export interface ChannelThumbnailWithLinkRendererNavigationEndpoint {
  clickTrackingParams: string;
  commandMetadata:     EndpointCommandMetadata;
  browseEndpoint:      PurpleBrowseEndpoint;
}

export interface PurpleBrowseEndpoint {
  browseId:          string;
  canonicalBaseUrl?: string;
}

export interface EndpointCommandMetadata {
  webCommandMetadata: PurpleWebCommandMetadata;
}

export interface PurpleWebCommandMetadata {
  url:         string;
  webPageType: WebPageType;
  rootVe:      number;
}

export enum WebPageType {
  WebPageTypeBrowse = "WEB_PAGE_TYPE_BROWSE",
  WebPageTypeSearch = "WEB_PAGE_TYPE_SEARCH",
  WebPageTypeWatch = "WEB_PAGE_TYPE_WATCH",
}

export interface ChannelThumbnailWithLinkRendererThumbnail {
  thumbnails: ThumbnailElement[];
}

export interface ThumbnailElement {
  url:    string;
  width:  number;
  height: number;
}

export interface TitleElement {
  runs: TitleRun[];
}

export interface TitleRun {
  text: string;
}

export interface Text {
  accessibility: HotkeyAccessibilityLabelClass;
  simpleText:    string;
}

export interface LongBylineTextClass {
  runs: LongBylineTextRun[];
}

export interface LongBylineTextRun {
  text:               string;
  navigationEndpoint: ChannelThumbnailWithLinkRendererNavigationEndpoint;
}

export interface VideoRendererMenu {
  menuRenderer: MenuMenuRenderer;
}

export interface MenuMenuRenderer {
  items:          MenuRendererItem[];
  trackingParams: string;
  accessibility:  HotkeyAccessibilityLabelClass;
}

export interface MenuRendererItem {
  menuServiceItemRenderer: MenuServiceItemRenderer;
}

export interface MenuServiceItemRenderer {
  text:            TitleElement;
  icon:            IconImage;
  serviceEndpoint: ServiceEndpoint;
  trackingParams:  string;
}

export interface IconImage {
  iconType: string;
}

export interface ServiceEndpoint {
  clickTrackingParams:    string;
  commandMetadata:        UntoggledServiceEndpointCommandMetadata;
  signalServiceEndpoint?: UntoggledServiceEndpointSignalServiceEndpoint;
  playlistEditEndpoint?:  UntoggledServiceEndpointPlaylistEditEndpoint;
}

export interface UntoggledServiceEndpointCommandMetadata {
  webCommandMetadata: FluffyWebCommandMetadata;
}

export interface FluffyWebCommandMetadata {
  url:      URL;
  sendPost: boolean;
}

export enum URL {
  ServiceAjax = "/service_ajax",
}

export interface UntoggledServiceEndpointPlaylistEditEndpoint {
  playlistId: PlaylistID;
  actions:    PurpleAction[];
}

export interface PurpleAction {
  addedVideoId: string;
  action:       IndecentAction;
}

export enum IndecentAction {
  ActionAddVideo = "ACTION_ADD_VIDEO",
}

export enum PlaylistID {
  Wl = "WL",
}

export interface UntoggledServiceEndpointSignalServiceEndpoint {
  signal:  SignalEnum;
  actions: FluffyAction[];
}

export interface FluffyAction {
  addToPlaylistCommand: AddToPlaylistCommand;
}

export interface AddToPlaylistCommand {
  openMiniplayer:      boolean;
  listType:            ListType;
  onCreateListCommand: OnCreateListCommand;
  videoIds:            string[];
}

export enum ListType {
  PlaylistEditListTypeQueue = "PLAYLIST_EDIT_LIST_TYPE_QUEUE",
}

export interface OnCreateListCommand {
  clickTrackingParams:           string;
  commandMetadata:               UntoggledServiceEndpointCommandMetadata;
  createPlaylistServiceEndpoint: CreatePlaylistServiceEndpoint;
}

export interface CreatePlaylistServiceEndpoint {
  videoIds: string[];
  params:   Params;
}

export enum Params {
  CAQ3D = "CAQ%3D",
}

export enum SignalEnum {
  ClientSignal = "CLIENT_SIGNAL",
}

export interface VideoRendererNavigationEndpoint {
  clickTrackingParams: string;
  commandMetadata:     EndpointCommandMetadata;
  watchEndpoint:       WatchEndpoint;
}

export interface WatchEndpoint {
  videoId: string;
}

export interface OwnerBadge {
  metadataBadgeRenderer: MetadataBadgeRenderer;
}

export interface MetadataBadgeRenderer {
  icon:           IconImage;
  style:          MetadataBadgeRendererStyle;
  tooltip:        Tooltip;
  trackingParams: string;
}

export enum MetadataBadgeRendererStyle {
  BadgeStyleTypeVerified = "BADGE_STYLE_TYPE_VERIFIED",
}

export enum Tooltip {
  Verificada = "Verificada",
}

export interface PublishedTimeTextClass {
  simpleText: string;
}

export interface RichThumbnail {
  movingThumbnailRenderer: MovingThumbnailRenderer;
}

export interface MovingThumbnailRenderer {
  movingThumbnailDetails: MovingThumbnailDetails;
  enableHoveredLogging:   boolean;
  enableOverlay:          boolean;
}

export interface MovingThumbnailDetails {
  thumbnails:           ThumbnailElement[];
  logAsMovingThumbnail: boolean;
}

export interface VideoRendererThumbnail {
  thumbnails:                        ThumbnailElement[];
  webThumbnailDetailsExtensionData?: WebThumbnailDetailsExtensionData;
}

export interface WebThumbnailDetailsExtensionData {
  isPreloaded: boolean;
}

export interface ThumbnailOverlay {
  thumbnailOverlayTimeStatusRenderer?:   ThumbnailOverlayTimeStatusRenderer;
  thumbnailOverlayToggleButtonRenderer?: ThumbnailOverlayToggleButtonRenderer;
  thumbnailOverlayNowPlayingRenderer?:   ThumbnailOverlayNowPlayingRenderer;
}

export interface ThumbnailOverlayNowPlayingRenderer {
  text: TitleElement;
}

export interface ThumbnailOverlayTimeStatusRenderer {
  text:  Text;
  style: ThumbnailOverlayTimeStatusRendererStyle;
}

export enum ThumbnailOverlayTimeStatusRendererStyle {
  Default = "DEFAULT",
}

export interface ThumbnailOverlayToggleButtonRenderer {
  isToggled?:               boolean;
  untoggledIcon:            IconImage;
  toggledIcon:              IconImage;
  untoggledTooltip:         UntoggledTooltip;
  toggledTooltip:           ToggledTooltip;
  untoggledServiceEndpoint: ServiceEndpoint;
  toggledServiceEndpoint?:  ToggledServiceEndpoint;
  untoggledAccessibility:   HotkeyAccessibilityLabelClass;
  toggledAccessibility:     HotkeyAccessibilityLabelClass;
  trackingParams:           string;
}

export interface ToggledServiceEndpoint {
  clickTrackingParams:  string;
  commandMetadata:      UntoggledServiceEndpointCommandMetadata;
  playlistEditEndpoint: ToggledServiceEndpointPlaylistEditEndpoint;
}

export interface ToggledServiceEndpointPlaylistEditEndpoint {
  playlistId: PlaylistID;
  actions:    TentacledAction[];
}

export interface TentacledAction {
  action:         HilariousAction;
  removedVideoId: string;
}

export enum HilariousAction {
  ActionRemoveVideoByVideoID = "ACTION_REMOVE_VIDEO_BY_VIDEO_ID",
}

export enum ToggledTooltip {
  Agregado = "Agregado",
}

export enum UntoggledTooltip {
  AgregarALaFila = "Agregar a la fila",
  VerMásTarde = "Ver más tarde",
}

export interface PurpleTitle {
  runs:          TitleRun[];
  accessibility: HotkeyAccessibilityLabelClass;
}

export interface SubMenu {
  channelListSubMenuRenderer: ChannelListSubMenuRenderer;
}

export interface ChannelListSubMenuRenderer {
  contents:       ChannelListSubMenuRendererContent[];
  contentSize:    ContentSize;
  trackingParams: string;
}

export interface ContentSize {
  value: string;
}

export interface ChannelListSubMenuRendererContent {
  channelListSubMenuAvatarRenderer: ChannelListSubMenuAvatarRenderer;
}

export interface ChannelListSubMenuAvatarRenderer {
  thumbnail:          VideoRendererThumbnail;
  navigationEndpoint: ChannelListSubMenuAvatarRendererNavigationEndpoint;
  trackingParams:     string;
  accessibility:      HotkeyAccessibilityLabelClass;
  title:              PublishedTimeTextClass;
  statusEntityKey:    string;
}

export interface ChannelListSubMenuAvatarRendererNavigationEndpoint {
  clickTrackingParams: string;
  commandMetadata:     EndpointCommandMetadata;
  browseEndpoint:      FluffyBrowseEndpoint;
}

export interface FluffyBrowseEndpoint {
  browseId: string;
  params:   string;
}

export interface YoutubeTrendsResponseHeader {
  feedTabbedHeaderRenderer: FeedTabbedHeaderRenderer;
}

export interface FeedTabbedHeaderRenderer {
  title: TitleElement;
}

export interface ResponseContext {
  serviceTrackingParams:           ServiceTrackingParam[];
  maxAgeSeconds:                   number;
  webResponseContextExtensionData: WebResponseContextExtensionData;
}

export interface ServiceTrackingParam {
  service: string;
  params:  Param[];
}

export interface Param {
  key:   string;
  value: string;
}

export interface WebResponseContextExtensionData {
  webResponseContextPreloadData: WebResponseContextPreloadData;
  ytConfigData:                  YtConfigData;
}

export interface WebResponseContextPreloadData {
  preloadThumbnailUrls: string[];
}

export interface YtConfigData {
  csn:                   string;
  visitorData:           string;
  rootVisualElementType: number;
}

export interface Topbar {
  desktopTopbarRenderer: DesktopTopbarRenderer;
}

export interface DesktopTopbarRenderer {
  logo:                     Logo;
  searchbox:                Searchbox;
  trackingParams:           string;
  countryCode:              string;
  topbarButtons:            TopbarButton[];
  hotkeyDialog:             HotkeyDialog;
  backButton:               BackButtonClass;
  forwardButton:            BackButtonClass;
  a11ySkipNavigationButton: A11YSkipNavigationButtonClass;
}

export interface A11YSkipNavigationButtonClass {
  buttonRenderer: A11YSkipNavigationButtonButtonRenderer;
}

export interface A11YSkipNavigationButtonButtonRenderer {
  style:          string;
  size:           string;
  isDisabled:     boolean;
  text:           TitleElement;
  trackingParams: string;
  command?:       Command;
}

export interface Command {
  clickTrackingParams:   string;
  commandMetadata:       UntoggledServiceEndpointCommandMetadata;
  signalServiceEndpoint: CommandSignalServiceEndpoint;
}

export interface CommandSignalServiceEndpoint {
  signal:  SignalEnum;
  actions: ToggleOffActionElement[];
}

export interface ToggleOffActionElement {
  signalAction: Signal;
}

export interface Signal {
  signal: string;
}

export interface BackButtonClass {
  buttonRenderer: ForwardButtonButtonRenderer;
}

export interface ForwardButtonButtonRenderer {
  trackingParams: string;
  command:        Command;
}

export interface HotkeyDialog {
  hotkeyDialogRenderer: HotkeyDialogRenderer;
}

export interface HotkeyDialogRenderer {
  title:          TitleElement;
  sections:       HotkeyDialogRendererSection[];
  dismissButton:  A11YSkipNavigationButtonClass;
  trackingParams: string;
}

export interface HotkeyDialogRendererSection {
  hotkeyDialogSectionRenderer: HotkeyDialogSectionRenderer;
}

export interface HotkeyDialogSectionRenderer {
  title:   TitleElement;
  options: Option[];
}

export interface Option {
  hotkeyDialogSectionOptionRenderer: HotkeyDialogSectionOptionRenderer;
}

export interface HotkeyDialogSectionOptionRenderer {
  label:                     TitleElement;
  hotkey:                    string;
  hotkeyAccessibilityLabel?: HotkeyAccessibilityLabelClass;
}

export interface Logo {
  topbarLogoRenderer: TopbarLogoRenderer;
}

export interface TopbarLogoRenderer {
  iconImage:      IconImage;
  tooltipText:    TitleElement;
  endpoint:       Endpoint;
  trackingParams: string;
}

export interface Endpoint {
  clickTrackingParams: string;
  commandMetadata:     EndpointCommandMetadata;
  browseEndpoint:      EndpointBrowseEndpoint;
}

export interface EndpointBrowseEndpoint {
  browseId: string;
}

export interface Searchbox {
  fusionSearchboxRenderer: FusionSearchboxRenderer;
}

export interface FusionSearchboxRenderer {
  icon:            IconImage;
  placeholderText: TitleElement;
  config:          Config;
  trackingParams:  string;
  searchEndpoint:  FusionSearchboxRendererSearchEndpoint;
}

export interface Config {
  webSearchboxConfig: WebSearchboxConfig;
}

export interface WebSearchboxConfig {
  requestLanguage:     string;
  requestDomain:       string;
  hasOnscreenKeyboard: boolean;
  focusSearchbox:      boolean;
}

export interface FusionSearchboxRendererSearchEndpoint {
  clickTrackingParams: string;
  commandMetadata:     EndpointCommandMetadata;
  searchEndpoint:      SearchEndpointSearchEndpoint;
}

export interface SearchEndpointSearchEndpoint {
  query: string;
}

export interface TopbarButton {
  topbarMenuButtonRenderer?: TopbarMenuButtonRenderer;
  buttonRenderer?:           TopbarButtonButtonRenderer;
}

export interface TopbarButtonButtonRenderer {
  style:              string;
  size:               string;
  text:               TitleElement;
  icon:               IconImage;
  navigationEndpoint: ButtonRendererNavigationEndpoint;
  trackingParams:     string;
  targetId:           string;
}

export interface ButtonRendererNavigationEndpoint {
  clickTrackingParams: string;
  commandMetadata:     NextEndpointCommandMetadata;
  signInEndpoint:      PurpleSignInEndpoint;
}

export interface NextEndpointCommandMetadata {
  webCommandMetadata: TentacledWebCommandMetadata;
}

export interface TentacledWebCommandMetadata {
  url:    string;
  rootVe: number;
}

export interface PurpleSignInEndpoint {
  idamTag: string;
}

export interface TopbarMenuButtonRenderer {
  icon:           IconImage;
  menuRenderer:   TopbarMenuButtonRendererMenuRenderer;
  trackingParams: string;
  accessibility:  HotkeyAccessibilityLabelClass;
  tooltip:        string;
  style:          string;
}

export interface TopbarMenuButtonRendererMenuRenderer {
  multiPageMenuRenderer: MenuRendererMultiPageMenuRenderer;
}

export interface MenuRendererMultiPageMenuRenderer {
  sections:       PurpleSection[];
  trackingParams: string;
  style?:         string;
}

export interface PurpleSection {
  multiPageMenuSectionRenderer: MultiPageMenuSectionRenderer;
}

export interface MultiPageMenuSectionRenderer {
  items?:                                    MultiPageMenuSectionRendererItem[];
  trackingParams:                            string;
  webMultiPageMenuSectionRendererExtension?: WebMultiPageMenuSectionRendererExtension;
}

export interface MultiPageMenuSectionRendererItem {
  compactLinkRenderer?:            CompactLinkRenderer;
  toggleThemeCompactLinkRenderer?: ToggleThemeCompactLinkRenderer;
}

export interface CompactLinkRenderer {
  icon:                IconImage;
  title:               TitleElement;
  navigationEndpoint?: CompactLinkRendererNavigationEndpoint;
  trackingParams:      string;
  style?:              string;
  serviceEndpoint?:    CompactLinkRendererServiceEndpoint;
}

export interface CompactLinkRendererNavigationEndpoint {
  clickTrackingParams:       string;
  commandMetadata:           NextEndpointCommandMetadata;
  signInEndpoint?:           FluffySignInEndpoint;
  urlEndpoint?:              NavigationEndpointURLEndpoint;
  signalNavigationEndpoint?: Signal;
}

export interface FluffySignInEndpoint {
  nextEndpoint: NextEndpoint;
}

export interface NextEndpoint {
  clickTrackingParams: string;
  commandMetadata:     NextEndpointCommandMetadata;
  urlEndpoint:         NextEndpointURLEndpoint;
}

export interface NextEndpointURLEndpoint {
  url: string;
}

export interface NavigationEndpointURLEndpoint {
  url:     string;
  target?: string;
}

export interface CompactLinkRendererServiceEndpoint {
  clickTrackingParams:   string;
  commandMetadata:       UntoggledServiceEndpointCommandMetadata;
  signalServiceEndpoint: PurpleSignalServiceEndpoint;
}

export interface PurpleSignalServiceEndpoint {
  signal:  SignalEnum;
  actions: StickyAction[];
}

export interface StickyAction {
  signalAction?:       Signal;
  sendFeedbackAction?: SendFeedbackAction;
}

export interface SendFeedbackAction {
  bucket: string;
}

export interface ToggleThemeCompactLinkRenderer {
  primaryIcon:     IconImage;
  secondaryIcon:   IconImage;
  toggledOnTitle:  TitleElement;
  toggledOffTitle: TitleElement;
  serviceEndpoint: ToggleThemeCompactLinkRendererServiceEndpoint;
}

export interface ToggleThemeCompactLinkRendererServiceEndpoint {
  clickTrackingParams:   string;
  commandMetadata:       UntoggledServiceEndpointCommandMetadata;
  signalServiceEndpoint: FluffySignalServiceEndpoint;
}

export interface FluffySignalServiceEndpoint {
  signal:  SignalEnum;
  actions: IndigoAction[];
}

export interface IndigoAction {
  getMultiPageMenuAction: GetMultiPageMenuAction;
}

export interface GetMultiPageMenuAction {
  menu: GetMultiPageMenuActionMenu;
}

export interface GetMultiPageMenuActionMenu {
  multiPageMenuRenderer: MenuMultiPageMenuRenderer;
}

export interface MenuMultiPageMenuRenderer {
  header:         MultiPageMenuRendererHeader;
  sections:       FluffySection[];
  trackingParams: string;
}

export interface MultiPageMenuRendererHeader {
  simpleMenuHeaderRenderer: SimpleMenuHeaderRenderer;
}

export interface SimpleMenuHeaderRenderer {
  backButton: BackButton;
  title:      TitleElement;
}

export interface BackButton {
  buttonRenderer: PurpleButtonRenderer;
}

export interface PurpleButtonRenderer {
  style:             string;
  size:              string;
  icon:              IconImage;
  accessibility:     PurpleAccessibility;
  trackingParams:    string;
  accessibilityData: HotkeyAccessibilityLabelClass;
}

export interface FluffySection {
  toggleItemRenderer: ToggleItemRenderer;
}

export interface ToggleItemRenderer {
  descriptionLines: TitleElement[];
  label:            TitleElement;
  toggleOnActions:  ToggleOffActionElement[];
  toggleOffActions: ToggleOffActionElement[];
}

export interface WebMultiPageMenuSectionRendererExtension {
  hack: boolean;
}
