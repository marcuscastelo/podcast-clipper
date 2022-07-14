// interface Options {
//     generalOptions: GeneralOptions;
//     networkOptions: NetworkOptions;
//     geoRestrictionOptions: GeoRestrictionOptions;
//     videoSelectionOptions: VideoSelectionOptions;
//     downloadOptions: DownloadOptions;
//     fileSystemOptions: FileSystemOptions;
//     thumbnailOptions: ThumbnailOptions;
//     internetShortcutOptions: InternetShortcutOptions;
//     verbosityAndSimulationOptions: VerbosityAndSimulationOptions;
//     workaroundOptions: WorkaroundOptions;
//     videoFormatOptions: VideoFormatOptions;
//     subtitleOptions: SubtitleOptions;
//     authenticationOptions: AuthenticationOptions;
//     postProcessingOptions: PostProcessingOptions;
//     sponsorBlockOptions: SponsorBlockOptions;
//     extractorOptions: ExtractorOptions;
// }

// interface GeneralOptions {
//     help: boolean;  // -h, --help
//     version: boolean;  // --version
//     update: boolean;  // -U, --update | --no-update
//     ignoreErrors: boolean;  // -i --ignore-errors
//     abortOnError: boolean;  // --abort-on-error | --no-abort-on-error
//     dumpUserAgent: boolean;  // --dump-user-agent
//     listExtractors: boolean;  // --list-extractors
//     extractorDescriptions: string;  // --extractor-descriptions
//     forceGenericExtractor: boolean;  // --force-generic-extractor
//     defaultSearch: string;  // --default-search PREFIX
//     ignoreConfig: boolean;  // --ignore-config
//     noConfigLocations: boolean;  // --no-config-locations
//     configLocations: string;  // --config-locations PATH
//     flatPlaylist: boolean;  // --flat-playlist | --no-flat-playlist
    
//     //TODO: mark as experimental
//     liveFromStart: boolean;  // --live-from-start | --no-live-from-start

//     waitForVideo: string | false;  // --wait-for-video MIN[-MAX] | --no-wait-for-video
//     markWatched: boolean;  // --mark-watched | --no-mark-watched
//     noColors: boolean;  // --no-colors

//     //TODO: compatOptions
//     //TODO: aliases
// }

// interface NetworkOptions {
//     proxy: string;  // --proxy URL
//     socketTimeout: number;  // --socket-timeout SECONDS
//     sourceAddress: string;  // --source-address IP
//     forceIPv4: boolean;  // -4 | --force-ipv4
//     forceIPv6: boolean;  // -6 | --force-ipv6
// }

// interface GeoRestrictionOptions {
//     geoVerificationProxy: string;  // --geo-verification-proxy URL
//     geoBypass: string;  // --geo-bypass | --no-geo-bypass
//     geoBypassCountry: string;  // --geo-bypass-country CODE
//     geoBypassIPBloc: string;  // --geo-bypass-ip-block IP_BLOCK
// }

// interface VideoSelectionOptions {
//     playlistItems: string;  // --playlist-items [START]:[STOP][:STEP] (e.g. 1:5:2, 1:5, 1::2, ::2, 1:, :5)
//     minFilesize: number;  // --min-filesize SIZE
//     maxFilesize: number;  // --max-filesize SIZE
//     date: string;  // --date DATE
//     dateBefore: string;  // --date-before DATE
//     dateAfter: string;  // --date-after DATE
//     matchFilters: string | null;  // --match-filter FILTER | --no-match-filter
//     yesNoPlaylist: boolean;  // --yes-playlist | --no-playlist
//     ageLimit: number;  // --age-limit YEARS
//     downloadArchive: string | false;  // --download-archive FILE | --no-download-archive
//     maxDownloads: number;  // --max-downloads NUMBER
//     breakOnExisting: boolean;  // --break-on-existing
//     breakOnReject: boolean;  // --break-on-reject
//     //TODO: investigate breakPerInput interaction with other breaks
//     breakPerInput: boolean | undefined;  // --break-per-input | --no-break-per-input
//     skipPlaylistAfterErrors: number;  // --skip-playlist-after-errors NUMBER
// }

// interface DownloadOptions {
//     concurrentFragments: number;  // -N, --concurrent-fragments N
//     limitRate: number;  // -r, --limit-rate RATE
//     throttledRate: number;  // --throttle-rate RATE
//     retries: number;  // --retries RETRIES
//     fileAccessRetries: number;  // --file-access-retries RETRIES
//     fragmentRetries: number;  // --fragment-retries RETRIES
//     retrySleep: string;  // --retry-sleep [TYPE:]EXPR
//     skipUnavailableFragments: boolean;  // --skip-unavailable-fragments
//     abortOnUnavailableFragment: boolean;  // --abort-on-unavailable-fragment
//     // TODO: investigate --no-abort-on-unavailable-fragment
//     keepFragments: boolean;  // --keep-fragments | --no-keep-fragments
//     bufferSize: number;  // --buffer-size SIZE
//     resizeBuffer: boolean;  // --resize-buffer | --no-resize-buffer
//     httpChunkSize: number;  // --http-chunk-size SIZE
//     playlistRandom: boolean;  // --playlist-random
//     lazyPlaylist: boolean;  // --lazy-playlist | --no-lazy-playlist
//     xattrSetFileSize: boolean;  // --xattr-set-file-size | --no-xattr-set-file-size
//     hlsUseMpegts: boolean;  // --hls-use-mpegts | --no-hls-use-mpegts
//     downloadSections: string;  // --download-sections REGEX
//     downloader: string;  // --downloader [PROTO:]NAME
//     downloaderArgs: string;  // --downloader-args NAME:ARGS
// }

// interface FileSystemOptions {
//     batchFile: string | null;  // -a --batch-file FILE | --no-batch-file
//     paths: string;  // -P, --paths [TYPES:]PATH
//     output: string;  // -o, --output [TYPES:]TEMPLATE
//     outputNAPlaceholder: string;  // --output-na-placeholder TEXT
//     restrictFileNames: boolean;  // --restrict-filenames | --no-restrict-filenames
//     windowsFileNames: boolean;  // --windows-filenames | --no-windows-filenames
//     trimFilenames: number;  // --trim-filenames LENGTH
//     noOverwrites: boolean;  // --no-overwrites
//     forceOverwrites: boolean;  // --force-overwrites | --no-force-overwrites
//     continue: boolean;  // --continue | --no-continue
//     part: boolean;  // --part | --no-part
//     mTime: boolean;  // --mtime | --no-mtime
//     writeDescription: boolean;  // --write-description | --no-write-description
//     writeInfoJson: boolean;  // --write-info-json | --no-write-info-json
//     writePlaylistMetafiles: boolean;  // --write-playlist-metafiles | --no-write-playlist-metafiles
//     cleanInfoJson: boolean;  // --clean-info-json | --no-clean-info-json
//     writeComments: boolean;  // --write-comments | --no-write-comments
//     loadInfoJson?: string;  // --load-info-json FILE
//     cookies: string | false;  // --cookies FILE | --no-cookies
//     cookiesFromBrowser: string | false; // --cookies-from-browser BROWSER[+KEYRING][:PROFILE] | --no-cookies-from-browser
//     cacheDir: string | false;  // --cache-dir DIR | --no-cache-dir
//     rmCacheDir?: true;  // --rm-cache-dir
// }

// interface ThumbnailOptions {
//     writeThumbnails: boolean;  // --write-thumbnails | --no-write-thumbnails
//     writeAllThumbnails?: true;  // --write-all-thumbnails
//     listThumbnails?: true;  // --list-thumbnails
// }

// interface InternetShortcutOptions {
//     writeLink?: true;  // --write-link
//     writeUrlLink?: true;  // --write-url-link
//     writeWeblocLink?: true;  // --write-webloc-link
//     writeDestktopLink?: true;  // --write-desktop-link
// }

// interface VerbosityAndSimulationOptions {
//     quiet?: true;  // -q, --quiet
//     noWarnings?: true;  // --no-warnings
//     simulate?: boolean;  // -s, --simulate | --no-simulate
//     ignoreNoFormatError?: boolean;  // --ignore-no-format-error | --no-ignore-no-format-error
//     skipDownload?: true;  // --skip-download
//     print?: string; // --print [WHEN:]TEMPLATE
//     printToFile?: string; // --print-to-file [WHEN:]TEMPLATE FILE
//     dumpJson?: true; // -j, --dump-json
//     dumpSingleJson?: true; // -J, --dump-single-json
//     forceWriteArchive?: true; // --force-write-archive
//     newline?: true; // --newline
//     progress?: boolean; // --progress | --no-progress
//     consoleTitle?: true; // --console-title
//     progressTemplate?: string; // --progress-template [TYPES:]TEMPLATE
//     verbose?: true; // -v, --verbose
//     dumpPages?: true; // --dump-pages
//     writePages?: true; // --write-pages
//     printTraffic?: true; // --print-traffic
// }

// interface WorkaroundOptions {
//     encoding?: string;  // --encoding ENCODING
//     legacyServerConnect?: true;  // --legacy-server-connect
//     noCheckCertificate?: true;  // --no-check-certificate
//     preferInsecure?: true;  // --prefer-insecure
//     addHeader?: string;  // --add-header FIELD:VALUE
//     bidiWorkaround?: true;  // --bidi-workaround
//     sleepRequests?: number;  // --sleep-requests SECONDS
//     sleepInterval?: number;  // --sleep-interval SECONDS
//     maxSleepInterval?: number;  // --max-sleep-interval SECONDS
//     sleepSubtitles?: string;  // --sleep-subtitles SECONDS
// }

// interface VideoFormatOptions {
//     format?: string;  // -f, --format FORMAT
//     formatSort?: string; // -S, --format-sort SORTORDER
//     formatSortForce?: boolean; // --format-sort-force | --no-format-sort-force
//     videoMultistreams?: boolean; // --video-multistreams | --no-video-multistreams
//     audioMultistreams?: boolean; // --audio-multistreams | --no-audio-multistreams
//     preferFreeFormats?: boolean; // --prefer-free-formats | --no-prefer-free-formats
//     checkFormats?: boolean; // --check-formats | --no-check-formats
//     checkAllFormats?: true; // --check-all-formats
//     listFormats?: true; // --list-formats
//     mergeOutputFormat?: string; // --merge-output-format FORMAT
// }



    
// export async function download(urls: string | string[], options: Options) {

// }