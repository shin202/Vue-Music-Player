export interface playlist_type {
    encodeId: string,
    title: string,
    thumbnailM: string,
    releaseDate: string,
    sortDescription: string,
    artistsNames: string,
    artists: artists[],
    contentLastUpdate: number,
    song: {
        items: [],
        total: number,
    }
}

export interface song_type {
    encodeId: string,
    index: number,
    artistsNames: string,
    title: string,
    thumbnailM: string,
    duration: number,
    currentTime: number,
    "128": string,
    "320": string,
}

export interface suggested_playlists_type {
    data: any;
    sectionType: string,
    title: string,
    items: playlist_type[],
}

export interface hub_detail_type {
    encodeId: string,
    cover: string,
    title: string,
    sections: section_type[],
    thumbnailR: string,
    description: string,
    playlists: playlist_type[],
}

export interface section_type {
    sectionType: string,
    title: string,
    items: playlist_type[],
}

export interface hub_type {
    nations: hub_detail_type[],
    topic: hub_detail_type[],
    genre: hub_detail_type[],
}

export interface home_playlist_type {
    data: any;
    sectionType: string,
    title: string,
    items: [],
}

export interface artists {
    name: string,
    thumbnailM: string,
    totalFollow: number,
}

export interface top_100_type {
    data: any[];
    sectonType: string,
    title: string,
    items: [],
}