interface Options {
    generalOptions: GeneralOptions;
    networkOptions: NetworkOptions;
    geoRestrictionOptions: GeoRestrictionOptions;
    videoSelectionOptions: VideoSelectionOptions;
    downloadOptions: DownloadOptions;
    fileSystemOptions: FileSystemOptions;
    thumbnailOptions: ThumbnailOptions;
    internetShortcutOptions: InternetShortcutOptions;
    verbosityAndSimulationOptions: VerbosityAndSimulationOptions;
    workaroundOptions: WorkaroundOptions;
    videoFormatOptions: VideoFormatOptions;
    subtitleOptions: SubtitleOptions;
    authenticationOptions: AuthenticationOptions;
    postProcessingOptions: PostProcessingOptions;
    sponsorBlockOptions: SponsorBlockOptions;
    extractorOptions: ExtractorOptions;
}

interface GeneralOptions {
    help: boolean;  // -h, --help
    version: boolean;  // --version
    update: boolean;  // -U, --update | --no-update
    ignoreErrors: boolean;  // -i --ignore-errors
    abortOnError: boolean;  // --abort-on-error | --no-abort-on-error
    dumpUserAgent: boolean;  // --dump-user-agent
    listExtractors: boolean;  // --list-extractors
    extractorDescriptions: string;  // --extractor-descriptions
    forceGenericExtractor: boolean;  // --force-generic-extractor
    defaultSearch: string;  // --default-search PREFIX
    ignoreConfig: boolean;  // --ignore-config
    noConfigLocations: boolean;  // --no-config-locations
    configLocations: string;  // --config-locations PATH
    flatPlaylist: boolean;  // --flat-playlist | --no-flat-playlist
    
    //TODO: mark as experimental
    liveFromStart: boolean;  // --live-from-start | --no-live-from-start

    waitForVideo: string | false;  // --wait-for-video MIN[-MAX] | --no-wait-for-video
    markWatched: boolean;  // --mark-watched | --no-mark-watched
    noColors: boolean;  // --no-colors

    //TODO: compatOptions
    //TODO: aliases
}

interface NetworkOptions {
    proxy: string;  // --proxy URL
    socketTimeout: number;  // --socket-timeout SECONDS
    sourceAddress: string;  // --source-address IP
    forceIPv4: boolean;  // -4 | --force-ipv4
    forceIPv6: boolean;  // -6 | --force-ipv6
}

interface GeoRestrictionOptions {
    geoVerificationProxy: string;  // --geo-verification-proxy URL
    geoBypass: string;  // --geo-bypass | --no-geo-bypass
    geoBypassCountry: string;  // --geo-bypass-country CODE
    geoBypassIPBloc: string;  // --geo-bypass-ip-block IP_BLOCK
}

interface VideoSelectionOptions {
    playlistItems: string;  // --playlist-items [START]:[STOP][:STEP] (e.g. 1:5:2, 1:5, 1::2, ::2, 1:, :5)
    minFilesize: number;  // --min-filesize SIZE
    maxFilesize: number;  // --max-filesize SIZE
    date: string;  // --date DATE
    dateBefore: string;  // --date-before DATE
    dateAfter: string;  // --date-after DATE
    matchFilters: string | null;  // --match-filter FILTER | --no-match-filter
    yesNoPlaylist: boolean;  // --yes-playlist | --no-playlist
    ageLimit: number;  // --age-limit YEARS
    downloadArchive: string | false;  // --download-archive FILE | --no-download-archive
    maxDownloads: number;  // --max-downloads NUMBER
    breakOnExisting: boolean;  // --break-on-existing
    breakOnReject: boolean;  // --break-on-reject
    //TODO: investigate breakPerInput interaction with other breaks
    breakPerInput: boolean | undefined;  // --break-per-input | --no-break-per-input
    skipPlaylistAfterErrors: number;  // --skip-playlist-after-errors NUMBER
}

interface DownloadOptions {
    concurrentFragments: number;  // -N, --concurrent-fragments N
    limitRate: number;  // -r, --limit-rate RATE
    throttledRate: number;  // --throttle-rate RATE
    retries: number;  // --retries RETRIES
    fileAccessRetries: number;  // --file-access-retries RETRIES
    fragmentRetries: number;  // --fragment-retries RETRIES
    retrySleep: string;  // --retry-sleep [TYPE:]EXPR
    skipUnavailableFragments: boolean;  // --skip-unavailable-fragments
    abortOnUnavailableFragment: boolean;  // --abort-on-unavailable-fragment
    // TODO: investigate --no-abort-on-unavailable-fragment
    keepFragments: boolean;  // --keep-fragments | --no-keep-fragments
    bufferSize: number;  // --buffer-size SIZE
    resizeBuffer: boolean;  // --resize-buffer | --no-resize-buffer
    httpChunkSize: number;  // --http-chunk-size SIZE
    playlistRandom: boolean;  // --playlist-random
    lazyPlaylist: boolean;  // --lazy-playlist | --no-lazy-playlist
    xattrSetFileSize: boolean;  // --xattr-set-file-size | --no-xattr-set-file-size
    hlsUseMpegts: boolean;  // --hls-use-mpegts | --no-hls-use-mpegts
    downloadSections: string;  // --download-sections REGEX
    downloader: string;  // --downloader [PROTO:]NAME
    downloaderArgs: string;  // --downloader-args NAME:ARGS
}

export async function download(urls: string | string[], options: Options) {

}