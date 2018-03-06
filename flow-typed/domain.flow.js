/* @flow */

declare type GraphQLResponseRoot = {
  data?: Query | Mutation;
  errors?: Array<GraphQLResponseError>;
}

declare type GraphQLResponseError = {
  message: string;            // Required for all errors
  locations?: Array<GraphQLResponseErrorLocation>;
  [propName: string]: any;    // 7.2.2 says 'GraphQL servers may provide additional entries to error'
}

declare type GraphQLResponseErrorLocation = {
  line: number;
  column: number;
}

/**
  The query type, represents all of the entry points into our object graph
*/
declare type Query = {
  /** Retrieve user account settings. Requesting by ID is deprecated - this will
only ever retrieve the account of the logged in user */
  account: ?Account;
  /** Retrieve asset by ID */
  asset: ?Asset;
  /** Get the last *count* assets by navigation path. If *sinceID* is provided, it
will be used for pagination. The assets will be sorted by published date in
descending order. */
  assetsConnectionByNavigationPath: ?AssetsConnection;
  /** Get the last *count* assets by tag. If *sinceID* is provided, it will be used
for pagination. The assets will be sorted by published date in descending order. */
  assetsConnectionByTag: ?AssetsConnection;
  author: ?Author;
  authorSearch: ?Array<Author>;
  /** Retrieve clippings of authenticated user */
  clippings: Array<Clipping>;
  contentUnit: ?ContentUnit;
  currencyCompare: Array<CurrencyCompare>;
  /** Returns the delayed price data (intraday series + movement data) for the requested local and global index codes. */
  indexPrices: Array<IndexPrice>;
  /** Retrieve the latest assets by brand, render and type */
  latestAssets: Array<Asset>;
  listings: Array<Listing>;
  tempListings: Array<Listing>;
  mostPopularStories: Array<Asset>;
  /** Retrieve page by ID */
  page: ?Page;
  /** Retrieve page by brand, render and path */
  pageByNavigationPath: ?Page;
  paywallRules: ?Rules;
  publicSearch: ?AssetsConnection;
  readingHistory: ReadingHistoryResponse;
  search: ?AssetsConnection;
  scoreboard: FootballScoreboard;
  shortlist: ShortlistResponse;
  tag: ?Tag;
  todaysPaper: TodaysPaperResponse;
  searchTags: TagsReply;
  topBottomQuotes: Array<TopBottomQuote>;
  trending: Array<Asset>;
  weatherForecast: Forecast;
  tagContexts: TagContextsReply;
  tagThemes: TagThemesReply;
}

declare type Account = {
  autoplay: boolean;
  error: ?AccountError;
  id: string;
  location: ?AccountLocation;
}

declare type AccountError = {
  message: string;
  type: AccountErrorType;
}

/**
  AccountErrorType defines the types of errors that can occur when retrieving account information
*/
declare type AccountErrorType = "ACCOUNT_NOT_FOUND_IN_DATABASE" | "AUTHENTICATION_ERROR" | "GENERIC_ERROR" | "INVALID_REQUEST_ERROR";

declare type AccountLocation = {
  postCode: ?string;
  state: ?string;
  suburb: ?string;
}

/**
  Asset represents different types of assets (e.g. Url, Image, Article etc.)
*/
declare type Asset = {
  /** The asset about */
  about: string;
  /** The type of the asset */
  assetType: string;
  /** Asset data */
  asset: AssetData;
  /** Asset brands */
  brands: ?Array<string>;
  /** Asset categories */
  categories: ?Array<string>;
  /** Asset category */
  category: ?AssetCategory;
  /** Asset comments, using a nested comments query */
  commentsConnection: CommentsConnection;
  /** Asset dates */
  dates: AssetDates;
  /** Editing state of the asset */
  editingState: string;
  /** The asset intro */
  intro: ?string;
  /** Label associated with the asset (i.e. exclusive, etc) */
  label: ?string;
  /** Legal status of the asset */
  legalStatus: string;
  /** Editing state of the asset */
  publicState: string;
  /** Article image */
  featuredImages: ?AssetImages;
  /** The asset headline */
  headlines: AssetHeadlines;
  /** The id of the asset */
  id: string;
  /** The participants of the asset */
  participants: ?AssetParticipants;
  /** The source cms of the asset */
  sourceCms: ?AssetSourceCms;
  /** The sponsor of the asset */
  sponsor: ?AssetSponsor;
  /** The tags of the article */
  tags: ?AssetTag;
  /** Comments count */
  totalCommentCount: number;
  /** The asset URLs */
  urls: ?AssetURLs;
}

/**
  AssetData represents the core data of the asset: about, headlines and byline
*/
declare type AssetData = {
  /** The asset description. */
  about: string;
  /** The asset byline */
  byline: ?string;
  /** Video duration */
  duration: ?number;
  /** The asset headlines. */
  headlines: AssetHeadlines;
  /** Indicates if the asset is a live article which is currently live */
  live: ?boolean;
}

/**
  Asset headline field
*/
declare type AssetHeadlines = {
  /** Headline of the asset */
  headline: string;
}

/**
  The value type for asset category
*/
declare type AssetCategory = {
  id: ?number;
  name: ?string;
  urls: ?AssetCategoryURLs;
}

/**
  Category URLs type
*/
declare type AssetCategoryURLs = {
  published: ?AssetPublishedURLs;
}

/**
  Published URLs map, for example:
*/
declare type AssetPublishedURLs = {
  brisbanetimes: ?AssetPublishedURL;
  smh: ?AssetPublishedURL;
  theage: ?AssetPublishedURL;
  watoday: ?AssetPublishedURL;
}

/**
  The value type for published a URLs map
*/
declare type AssetPublishedURL = {
  /** Brand is used to extract the environment specific brand host */
  brand: string;
  /** Path of the url */
  path: string;
}

/**
  CommentsConnection represents comments query response

	{
		"totalCommentCount": 4,
		"nodes": [
			{
     			"id": "some-graphql-id",
     			"body": "some comment",
     			"created_at": "2017-11-06T00:00:49.149Z",
     			"user": "some user"
			}
		]
 	}
*/
declare type CommentsConnection = {
  /** List of comment nodes */
  nodes: ?Array<AssetComment>;
  /** Total number of comments which are not marked *rejected* by coral talk moderator */
  totalCommentCount: number;
}

/**
  AssetComment represents comments data for the asset
*/
declare type AssetComment = {
  /** Comment body is UTF-8 character sequence entered by user/author via coral talk and not *rejected* by moderator */
  body: string;
  /** Comment creation date */
  created_at: string;
  /** Comment Id is unique graphql ID assigned to each comment/reply */
  id: string;
  /** User who created the comment */
  user: string;
}

/**
  AssetDates is an object containing different dates fields
*/
declare type AssetDates = {
  /** The date when the asset was created */
  created: string;
  /** The date when the asset was first published */
  firstPublished: ?string;
  /** The date when the asset was last modified */
  modified: string;
  /** The date when the asset was published */
  published: string;
  /** The date when the asset was saved */
  saved: ?string;
  /** The date when the asset is scheduled to be taken down */
  timeToTakeDown: ?string;
}

/**
  All the asset image types. Each asset has different images for different screen
sizes or components. For example one image is shown on asset page, but
completely different image (crop, aspect ratio and offeset is uesd in a content
unit for example)
*/
declare type AssetImages = {
  landscape16x9: ?Image;
  landscape3x2: ?Image;
  portrait2x3: ?Image;
  square1x1: ?Image;
}

/**
  Holds image metadata
*/
declare type Image = {
  data: ImageData;
}

/**
  Holds image fields needed for rendering an image
*/
declare type ImageData = {
  altText: ?string;
  aspect: ?number;
  autoCrop: ?boolean;
  autocrop: ?boolean;
  caption: ?string;
  credit: ?string;
  cropWidth: ?number;
  id: string;
  offsetX: ?number;
  offsetY: ?number;
  source: ?string;
  zoom: ?number;
}

/**
  AssetParticipants holds participants information for an asset
*/
declare type AssetParticipants = {
  /** Authors of an asset */
  authors: ?Array<Author>;
}

/**
  Author information
*/
declare type Author = {
  bio: string;
  dates: AuthorDates;
  email: ?string;
  featuredImages: ?AuthorImages;
  id: string;
  name: string;
  social: ?AuthorSocial;
  title: ?string;
  /** Email for user management only */
  userEmail: ?string;
  /** A paginated collection of assets by this author sorted descending by published date. */
  assetsConnection: ?AssetsConnection;
}

/**
  Dates related to the author entity
*/
declare type AuthorDates = {
  created: string;
  updated: ?string;
}

/**
  Author featured images
*/
declare type AuthorImages = {
  headshot: ?Image;
}

/**
  Author social links
*/
declare type AuthorSocial = {
  /** The author's facebook ID */
  facebook: ?AuthorSocialID;
  /** The author's GooglePlus ID */
  googlePlus: ?AuthorSocialID;
  /** The author's Twitter ID */
  twitter: ?AuthorSocialID;
}

/**
  Represents the ID of the author in a given social media
*/
declare type AuthorSocialID = {
  id: ?string;
}

/**
  A connection object for paginated assets
*/
declare type AssetsConnection = {
  /** Access to the assets without edge wrapping. */
  assets: ?Array<Asset>;
  /** The edges for each of the assets. */
  edges: ?Array<AssetEdge>;
  /** Information for paginating this connection */
  pageInfo: PageInfo;
  /** Total number of results */
  totalCount: ?number;
}

/**
  An edge object for an asset
*/
declare type AssetEdge = {
  /** A cursor used for pagination */
  cursor: string;
  /** The asset represented by this asset edge */
  node: ?Asset;
}

/**
  Information for paginating a connection
*/
declare type PageInfo = {
  startCursor: ?string;
  endCursor: ?string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  /** StartOffset used for offset based pagination */
  startOffset: ?number;
  /** EndOffset used for offset based pagination */
  endOffset: ?number;
}

/**
  AssetSourceCms holds data related to the source cms of an asset
*/
declare type AssetSourceCms = {
  /** Type of the cms of the asset */
  cmsType: ?string;
}

/**
  AssetSponsor holds sponsor information for an asset
*/
declare type AssetSponsor = {
  /** Name of the sponsor */
  name: ?string;
}

/**
  Asset tag type used in
*/
declare type AssetTag = {
  primary: string;
  primaryTag: ?AssetTagDetails;
  secondary: ?Array<AssetTagDetails>;
}

/**
  Asset tag details
*/
declare type AssetTagDetails = {
  displayName: string;
  urls: ?TagURLs;
}

/**
  The urls of the tag

    "urls": {
        "canonical": {
            "brand": "smh",
            "path": "/topic/<tag-slug>-<tag-id>"
        },
        "published": {
            "brisbanetimes": {
                "path": "/topic/<tag-slug>-<tag-id>"
            },
            "smh": {
                "path": "/topic/<tag-slug>-<tag-id>"
            },
            "theage": {
                "path": "/topic/<tag-slug>-<tag-id>"
            },
            "watoday": {
                "path": "/topic/<tag-slug>-<tag-id>"
            }
        }
    }
*/
declare type TagURLs = {
  /** Canonical URL */
  canonical: ?TagURL;
  /** Published URL */
  published: ?TagPublishedURLs;
}

/**
  Tag URL contains brand and path used to construct a URL
*/
declare type TagURL = {
  /** Brand is used to extract the environment specific brand host */
  brand: string;
  /** Path of the url */
  path: string;
}

/**
  Tag Published URLs map, for example:
*/
declare type TagPublishedURLs = {
  brisbanetimes: ?TagPublishedURL;
  smh: ?TagPublishedURL;
  theage: ?TagPublishedURL;
  watoday: ?TagPublishedURL;
}

/**
  The value type for published a URLs map
*/
declare type TagPublishedURL = {
  path: string;
}

/**
  The urls of the asset

    "urls": {
        "canonical": {
            "brand": "smh",
            "path": "/some/path/here"
        },
        "published": {
            "brisbanetimes": {
                "path": "/some/path/here"
            },
            "smh": {
                "path": "/some/path/here"
            },
            "theage": {
                "path": "/some/path/here"
            },
            "watoday": {
                "path": "/some/path/here"
            }
        }
    }
*/
declare type AssetURLs = {
  /** Canonical URL */
  canonical: ?AssetURL;
  /** Published URL */
  published: ?AssetPublishedURLs;
}

/**
  Asset URL contains brand and path used to construct a URL
*/
declare type AssetURL = {
  /** Brand is used to extract the environment specific brand host */
  brand: string;
  /** Path of the url */
  path: string;
}

/**
  AssetType represents the different types of assets (e.g. article, gallery, url, etc.)
*/
declare type AssetType = "article" | "bespoke" | "featureArticle" | "gallery" | "liveArticle" | "url" | "video";

/**
  Clipping models a clipping
*/
declare type Clipping = {
  /** Asset being clipped */
  asset: Asset;
  /** Asset variations */
  assetVariations: ?Variations;
}

/**
  Variations contains fields which are used to overwrite asset list entry fields
*/
declare type Variations = {
  /** Asset about */
  about: ?string;
  /** Asset headline */
  headline: ?string;
  /** Asset featured images */
  featuredImages: ?AssetImages;
}

/**
  Content unit represents the data that is bound to a piece of rendering block of assets
*/
declare type ContentUnit = {
  /** The asset list is an optional field which is only used by asset with manually curated content */
  assetList: ?AssetList;
  /** Array of assets */
  assets: Array<Asset>;
  /** The config of the content unit */
  config: ?ContentUnitConfig;
  /** The description of the content unit */
  description: ?string;
  /** The unique id of the content unit */
  id: number;
  /** Maximum number of assets to be displayed. The assets array might have different length */
  maxCount: number;
  /** The name of the content unit */
  name: string;
  /** The name of the type of content unit */
  typeName: string;
}

/**
  Asset list contains a list of assets
*/
declare type AssetList = {
  id: number;
  description: ?string;
  itemListElement: Array<AssetListEntry>;
  name: string;
}

/**
  AssetListEntry represents a single asset in an asset list
*/
declare type AssetListEntry = {
  /** Unique id */
  id: string;
  /** Used for ordering when rendering the content unit */
  position: number;
  /** Fields used to overwrite the corresponding fields of the underlying asset */
  variations: ?Variations;
}

/**
  ContentUnitConfig represents the configuration of the content unit
*/
declare type ContentUnitConfig = {
  /** Display Configuration of the content in the content unit */
  displayConfig: ?DisplayConfiguration;
  /** The heading of the content unit */
  heading: ?string;
  /** The link of the heading of the content unit */
  headingLink: ?string;
  /** Additional links to display alongside the heading of the content unit */
  links: ?Array<ContentUnitConfigLink>;
  /** Mode of the content in the content unit */
  mode: ?string;
  /** Sponsor of the content in the content unit */
  sponsor: ?string;
  /** Configuration for any related widget to the content unit */
  widget: ?WidgetConfiguration;
}

/**
  DisplayConfiguration represents the display configuration of the content unit
*/
declare type DisplayConfiguration = {
  /** Show the primary tag for the content unit */
  showPrimaryTag: ?boolean;
}

declare type ContentUnitConfigLink = {
  /** The url for the additional link */
  link: ?string;
  /** The name for the additional link */
  title: ?string;
}

/**
  WidgetConfiguration represents the configuration of any related widget to the content unit
*/
declare type WidgetConfiguration = {
  /** Type of the related widget */
  type: ?string;
  /** Configuration data for the specified type of widget */
  data: ?WidgetData;
}

/**
  Union object representing the type of widget data
*/
declare type WidgetData = ScoreboardData | CricketScorecardData;

/**
  Data object for AFL, NRL and Rugby Union sport types
*/
declare type ScoreboardData = {
  /** The identification number for the game/series */
  gameID: ?string;
  /** The title of the sport/widget */
  title: ?string;
}

/**
  Data object for Cricket sport
*/
declare type CricketScorecardData = {
  /** Classnames required by the widget */
  classNames: ?string;
  /** Flag to enable/disable lazy load of cricket iframe */
  lazyLoad: ?string;
}

/**
  Foreign currency codes
*/
declare type CurrencyCode = "AUD" | "CAD" | "CHF" | "CNY" | "EUR" | "GBP" | "HKD" | "IDR" | "INR" | "JPY" | "MYR" | "NZD" | "SGD" | "THB" | "USD" | "ZAR";

/**
  Business Data Currency Compare data
*/
declare type CurrencyCompare = {
  /** Identifier of a currency comparison */
  compareName: string;
  /** Currency code being converted from */
  from: CurrencyCode;
  /** Currency name being converted from */
  fromDisplayName: string;
  /** Currency code being converted to */
  to: CurrencyCode;
  /** Currency name being converted to */
  toDisplayName: string;
  /** The current price */
  price: number;
  /** Last time the price was updated */
  lastUpdated: string;
  /** The value change of the price */
  priceMvt: number;
  /** The percentage change of the price */
  priceMvtPct: number;
  /** The buy price */
  buyPrice: number;
  /** The sell price */
  sellPrice: number;
}

/**
  Intraday index price series and price movement data
*/
declare type IndexPrice = {
  code: string;
  name: string;
  price: number;
  priceClose: number;
  priceMovement: number;
  priceMovementPercent: number;
  series: Array<IndexPriceItem>;
  lastUpdated: string;
}

/**
  Contains the price of an index at a given point in time.
*/
declare type IndexPriceItem = {
  price: number;
  time: string;
}

/**
  ListingsFilterType represents the different ways listings could be filtered
*/
declare type ListingsFilterType = "NONE" | "DRAFT" | "READY" | "REVIEW";

/**
  ListingsOrderType represents the different ways listings could be ordered
*/
declare type ListingsOrderType = "DEADLINE" | "LAST_MODIFIED" | "PUBLISHED";

declare type Listing = {
  asset: ?Asset;
  /** The brief for a listing */
  brief: ?string;
  /** The collaborators for a listing */
  collaborators: Array<Author>;
  /** The deadline date for the listing */
  deadline: string;
  /** The identifier for listing */
  identifier: ?string;
}

/**
  Page holds page metadata
*/
declare type Page = {
  /** The page configuration */
  config: ?PageConfig;
  /** The page description */
  description: ?string;
  /** The page ID */
  id: string;
  /** The page name */
  name: ?string;
  /** The page type */
  pageType: PageType;
  /** The redirect to a page */
  redirect: ?string;
}

declare type PageConfig = {
  /** The configuration to disable ads */
  adsDisabled: ?boolean;
  /** The page type */
  pageType: string;
  /** The pages ad configuration */
  ads: ?PageConfigAds;
  /** The pages nielsen configuration */
  nielsen: ?PageConfigNielsen;
  /** The pages seo configuration */
  seo: ?PageConfigSEO;
}

declare type PageConfigAds = {
  /** Whether or not ads should be suppressed for the appropriate page */
  suppress: boolean;
}

declare type PageConfigNielsen = {
  /** Nielsen appID for the page */
  appID: ?string;
  /** Nielsen ASN for the page */
  asn: ?string;
  /** Nielsen sega for the page */
  sega: ?string;
}

declare type PageConfigSEO = {
  /** SEO description of the page */
  description: ?string;
  /** SEO keywords of the page */
  keywords: ?string;
  /** SEO title of the page */
  title: ?string;
}

declare type PageType = "homepage";

/**
  Rules represents the meter and paywall rules
*/
declare type Rules = {
  meters: ?Array<MeterRule>;
  paywall: ?PaywallRule;
  meters_variants: ?Array<MetersVariants>;
}

/**
  MeterRule represents the metering rule
*/
declare type MeterRule = {
  count: ?number;
  prompt: ?Prompt;
  promptVariants: ?Array<PromptVariants>;
}

/**
  Prompt represents the meter/paywall prompt
*/
declare type Prompt = {
  callToAction: ?string;
  countRemaining: ?string;
  message: ?string;
  style: ?string;
  subscriptionURL: ?string;
  title: ?string;
}

/**
  PromptVariants represents category based variants of prompts
*/
declare type PromptVariants = {
  category: ?string;
  prompt: ?Prompt;
  categories: ?Array<string>;
  tags: ?Array<string>;
}

/**
  PaywallRule represents the paywall rules
*/
declare type PaywallRule = {
  enabled: ?boolean;
  exceptions: ?PaywallExceptions;
  inclusions: ?PaywallInclusions;
  limit: ?number;
  prompt: ?Prompt;
  promptVariants: ?Array<PromptVariants>;
  limit_variants: ?Array<LimitVariants>;
}

/**
  PaywallExceptions represents the paywall rule exceptions
*/
declare type PaywallExceptions = {
  referrers: ?PaywallExceptionsReferrers;
  referrers_variants: ?Array<PaywallExceptionsReferrersVariants>;
  sponsored: ?boolean;
}

/**
  PaywallExceptionsReferrers represents the exceptions for referrers in regards to the paywall rules
*/
declare type PaywallExceptionsReferrers = {
  domains: ?Array<string>;
  limit: ?number;
}

/**
  PaywallExceptionsReferrersVariants represents the variant exceptions for referrers in regards to the paywall rules
*/
declare type PaywallExceptionsReferrersVariants = {
  referrers: ?PaywallExceptionsReferrers;
}

/**
  PaywallInclusions represents the paywall rule inclusions
*/
declare type PaywallInclusions = {
  tags: ?Array<string>;
}

/**
  LimitVariants represents referrer based variants of paywall limit
*/
declare type LimitVariants = {
  referrers: ?PaywallExceptionsReferrers;
}

/**
  MetersVariants represents referrer based variants of meter rules
*/
declare type MetersVariants = {
  referrers: ?PaywallExceptionsReferrers;
  meters: ?Array<MeterRule>;
}

/**
  ReadingHistoryResponse is the response to a reading history request
*/
declare type ReadingHistoryResponse = {
  error: ?ReadingHistoryError;
  readingHistory: ?ReadingHistory;
}

/**
  ReadingHistoryError defines an error that can occur when operating on a reading history
*/
declare type ReadingHistoryError = {
  message: string;
  type: ReadingHistoryErrorType;
}

/**
  ReadingHistoryErrorType defines the types of errors that can occur for interacting with reading histories
*/
declare type ReadingHistoryErrorType = "AUTHENTICATION_ERROR" | "GENERIC_ERROR";

/**
  ReadingHistory holds a paginated collection of assets read by the user,
sorted descending by timestamp.
*/
declare type ReadingHistory = {
  /** Unique ID of the reading history */
  id: string;
  /** A paginated collection of assets in the reading history, sorted in reverse chronological order. */
  assetsConnection: ?AssetsConnection;
}

/**
  Football represents the the scoreboard data for winter sports
*/
declare type FootballScoreboard = {
  /** The id of the query */
  id: number;
  /** An array of matches */
  matches: Array<Match>;
}

/**
  Match describes a match of a winter code
*/
declare type Match = {
  /** The id of the match */
  id: string;
  /** The team playing at home */
  homeTeam: Team;
  /** The team playing away */
  awayTeam: Team;
  /** The date of the match */
  date: string;
  /** The Location of the match */
  location: string;
  /** The Location Abbreviation for tooltip display */
  displayLocation: string;
  /** The match status */
  status: string;
  /** The match number in round */
  number: number;
  /** The round number for the match */
  roundID: number;
}

declare type Team = {
  /** The unique id from matchID and teamID appended */
  id: string;
  /** The Team Name */
  name: string;
  /** The Team Name Abbreviation */
  displayName: ?string;
  /** The team score */
  score: string;
  /** The team ID */
  teamID: number;
}

/**
  ShortlistResponse is the response to a shortlist request
*/
declare type ShortlistResponse = {
  error: ?ShortlistError;
  shortlist: ?Shortlist;
}

/**
  ShortlistError defines an error that can occur when operating on a Shortlist
*/
declare type ShortlistError = {
  message: string;
  type: ShortlistErrorType;
}

/**
  ShortlistErrorType defines the types of errors that can occur for interacting with shortlists
*/
declare type ShortlistErrorType = "AUTHENTICATION_ERROR" | "GENERIC_ERROR" | "INVALID_REQUEST_ERROR";

/**
  Shortlist holds assets that have been shortlisted by the user for later reading
*/
declare type Shortlist = {
  /** Unique ID of the shortlist */
  id: ?string;
  /** Items which have been added to the shortlist */
  items: ?Array<ShortlistItem>;
  /** A paginated collection of assets in the shortlist, sorted descending by date and time. */
  assetsConnection: ?AssetsConnection;
}

/**
  ShortlistItem is a single asset shortlisted by a user
*/
declare type ShortlistItem = {
  id: string;
  assetId: string;
  shortlistedDate: ?string;
}

/**
  Tag represents the tag and its associated asset information
*/
declare type Tag = {
  context: string;
  description: string;
  displayName: string;
  id: string;
  name: string;
  seo: ?TagSEO;
  themes: ?Array<string>;
  urls: ?TagURLs;
  visible: boolean;
  /** A paginated collection of assets by this tag sorted descending by published date. */
  assetsConnection: ?AssetsConnection;
}

/**
  Tag SEO contains the seo for a tag
*/
declare type TagSEO = {
  description: ?string;
  keywords: ?string;
  title: ?string;
}

/**
  TodaysPaperResponse is the response for todays paper request
*/
declare type TodaysPaperResponse = {
  link: ?string;
}

declare type TagSearchField = "displayName" | "name" | "partialText";

declare type TagsReply = {
  Tags: Array<Tag>;
}

/**
  Business Top Bottom Quote data
*/
declare type TopBottomQuote = {
  /** Company security code */
  ASXCode: string;
  /** The quote issuer name */
  issuerName: IssuerName;
  /** Last trade price */
  lastTradePrice: number;
  /** Price movement */
  priceMovement: number;
  /** Price movement percentage */
  priceMovementPercentage: number;
  /** Trade value */
  tradeValue: number;
  /** Trade volume */
  tradeVolume: number;
  /** Last update time */
  lastUpdated: string;
}

/**
  Quote Issuer Name
*/
declare type IssuerName = {
  fullName: string;
  abbrevName: string;
  shortName: string;
}

/**
  Weather *forecast* for the location/postcode

	{
   	"forecast": {
     		"current": 0,
     		"maximum": 0,
     		"minimum": 0,
     		"weatherSummary": "Some weather condition"
   	}
 	}
*/
declare type Forecast = {
  /** Current temperature of the day */
  current: ?number;
  /** Maximum temperature of the day */
  maximum: ?number;
  /** Minimum temperature of the day */
  minimum: ?number;
  /** Current weather conditions */
  weatherSummary: string;
}

declare type TagContextsReply = {
  TagContexts: Array<TagContext>;
}

/**
  TagContext represents the tag context
*/
declare type TagContext = {
  description: string;
  id: string;
  name: string;
}

declare type TagThemesReply = {
  TagThemes: Array<TagTheme>;
}

/**
  TagTheme represents the tag theme
*/
declare type TagTheme = {
  description: string;
  id: string;
  name: string;
}

/**
  The mutation type, represents all of the mutation points into our object graph
*/
declare type Mutation = {
  /** marks an asset as read by a user */
  assetRead: AssetReadReply;
  /** clippingAdd adds a clipping for logged-in editor */
  clippingAdd: ClippingAddReply;
  /** Subscribe to newsletter */
  newsletterSubscribe: SubscribeReply;
  /** shortlistAddItem adds an item to a shortlist */
  shortlistAddItem: ShortlistAddItemReply;
  /** shortlistMerge merges a device shortlist into a member's shortlist */
  shortlistMerge: ShortlistMergeReply;
  /** shortlistRemoveItem removes an item from a shortlist */
  shortlistRemoveItem: ShortlistRemoveItemReply;
  /** tagCreate creates a new Tag to help editors categorise articles and other assets */
  tagCreate: TagCreateReply;
  /** tagUpdate updates an existing Tag to help editors categorise articles and other assets */
  tagUpdate: TagUpdateReply;
  updateAccount: ?UpdateAccountResult;
  updatePage: ?PageUpdate;
}

/**
  AssetReadInput models the input to a assetRead mutation
*/
declare type AssetReadInput = {
  /** ID of the asset that has been read */
  assetId: string;
  /** ID of the device used to identify the user */
  deviceId: ?string;
}

/**
  AssetReadReply models the output for a assetRead mutation
*/
declare type AssetReadReply = {
  error: ?AssetReadError;
  reference: ?AssetReadReference;
}

/**
  AssetReadError defines an error that can occur when calling assetRead()
*/
declare type AssetReadError = {
  message: string;
  type: AssetReadErrorType;
}

/**
  AssetReadErrorType defines AssetReadError types
*/
declare type AssetReadErrorType = "AUTHENTICATION_ERROR" | "GENERIC_ERROR" | "INVALID_REQUEST_ERROR";

/**
  AssetReadReference models an assetRead mutation reference
*/
declare type AssetReadReference = {
  assetEdge: ?AssetEdge;
  readingHistoryId: ?string;
  shortlistId: string;
  shortlistItem: ShortlistItem;
}

/**
  ClippingAddInput models the input to a clippingAdd mutation
*/
declare type ClippingAddInput = {
  /** string representation asset data with variations if any */
  assetVariations: ?string;
  /** ID of the asset being clipped */
  assetID: string;
}

declare type ClippingAddReply = {
  /** ID of the asset being clipped */
  assetID: string;
}

declare type NewsletterSubscribeInput = {
  channelKey: string;
  email: string;
  newsletterID: string;
}

declare type SubscribeReply = {
  success: boolean;
}

/**
  ShortlistAddItemInput models the input to a shortlistAddItem mutation
*/
declare type ShortlistAddItemInput = {
  /** ID of the device used to identify the shortlist to modify */
  deviceId: ?string;
  /** ID of the item to add to the shortlist */
  itemId: string;
  /** Minutes of offset from UTC time for the client */
  clientUtcOffsetMinutes: number;
}

/**
  ShortlistAddItemReply models the output for a shortlistAddItem mutation
*/
declare type ShortlistAddItemReply = {
  error: ?ShortlistAddItemError;
  addedItem: ?ShortlistAddItemReference;
}

/**
  ShortlistAddItemError defines an error that can occur when adding an item to a Shortlist
*/
declare type ShortlistAddItemError = {
  message: string;
  type: ShortlistAddItemErrorType;
}

/**
  ShortlistErrorType defines the types of errors that can occur when adding an item to a shortlists
*/
declare type ShortlistAddItemErrorType = "AUTHENTICATION_ERROR" | "GENERIC_ERROR" | "INVALID_REQUEST_ERROR";

/**
  ShortlistAddItemReference defines an item added to a Shortlist
*/
declare type ShortlistAddItemReference = {
  shortlistId: string;
  item: ?ShortlistItem;
  edge: ?AssetEdge;
}

/**
  ShortlistMergeInput models the input to a shortlistMerge mutation
*/
declare type ShortlistMergeInput = {
  /** ID of the device used to identify the shortlist to merge */
  deviceId: string;
}

/**
  ShortlistMergeReply models the output for a shortlistMerge mutation
*/
declare type ShortlistMergeReply = {
  error: ?ShortlistMergeError;
}

/**
  ShortlistMergeError defines an error that can occur when merging two shortlists
*/
declare type ShortlistMergeError = {
  message: string;
  type: ShortlistMergeErrorType;
}

/**
  ShortlistMergeErrorType defines the types of errors that can occur when merging two shortlists
*/
declare type ShortlistMergeErrorType = "AUTHENTICATION_ERROR" | "GENERIC_ERROR";

/**
  ShortlistRemoveItemInput models the input to a shortlistRemoveItem mutation
*/
declare type ShortlistRemoveItemInput = {
  /** ID of the device used to identify the shortlist to modify */
  deviceId: ?string;
  /** ID of the item to remove from the shortlist */
  itemId: string;
}

/**
  ShortlistRemoveItemReply models the output for a shortlistRemoveItem mutation
*/
declare type ShortlistRemoveItemReply = {
  error: ?ShortlistRemoveItemError;
  removedItem: ?ShortlistRemoveItemReference;
}

/**
  ShortlistRemoveItemError defines an error that can occur when removing an item from a Shortlist
*/
declare type ShortlistRemoveItemError = {
  message: string;
  type: ShortlistRemoveItemErrorType;
}

/**
  ShortlistErrorType defines the types of errors that can occur when removing an item from shortlists
*/
declare type ShortlistRemoveItemErrorType = "AUTHENTICATION_ERROR" | "GENERIC_ERROR" | "INVALID_REQUEST_ERROR";

/**
  ShortlistRemoveItemReference is a reference to a defined shortlist, typically returned by mutations
*/
declare type ShortlistRemoveItemReference = {
  /** ID of the shortlist being referenced */
  shortlistId: string;
  /** ID of the item removed */
  itemId: string;
}

declare type TagCreateInput = {
  contextID: string;
  description: ?string;
  displayName: string;
  name: string;
  SEODescription: ?string;
  SEOTitle: ?string;
  slug: ?string;
  themeIDs: ?Array<string>;
  visible: boolean;
}

declare type TagCreateReply = {
  tagID: string;
}

declare type TagUpdateInput = {
  contextID: string;
  description: ?string;
  displayName: string;
  ID: string;
  name: string;
  SEODescription: ?string;
  SEOTitle: ?string;
  slug: ?string;
  themeIDs: ?Array<string>;
  visible: boolean;
}

declare type TagUpdateReply = {
  success: boolean;
}

declare type UpdateAccountInput = {
  /** DEPRECATED: Account ID is sourced from the logged in member */
  id: ?string;
  autoplay: boolean;
  postCode: ?string;
  state: ?string;
  suburb: ?string;
}

declare type UpdateAccountResult = {
  autoplay: boolean;
  error: ?AccountError;
  id: string;
  new: boolean;
  location: ?AccountLocation;
}

declare type PageConfigInput = {
  /** The configuration to disable ads */
  adsDisabled: ?boolean;
  /** The page type */
  pageType: PageType;
}

declare type PageUpdate = {
  /** The page ID */
  id: string;
}