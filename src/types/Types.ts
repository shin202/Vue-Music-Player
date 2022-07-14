interface SideBar {
    icon: string,
    title: string,
    link: string,
}

interface HomeData {
    data: any;
    sectionType: string,
    title: string,
    items: [],
}

interface Playlist {
    encodeId: string,
    title: string,
    thumbnailM: string,
    releaseDate: string,
    sortDescription: string,
    artistsNames: string,
    artists: Artist[],
    contentLastUpdate: number,
    song: {
        items: [],
        total: number,
    }
    items: any,
}

interface Artist {
    name: string,
    thumbnailM: string,
    totalFollow: number,
}

interface Song {
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

interface SuggestedPlaylist {
    data: any;
    sectionType: string,
    title: string,
    items: Playlist[],
}

interface Section {
    sectionType: string,
    title: string,
    items: Playlist[],
}

interface HubDetail {
    encodeId: string,
    cover: string,
    title: string,
    sections: Section[],
    thumbnailR: string,
    description: string,
    playlists: Playlist[],
}

interface Hub {
    nations: HubDetail[],
    topic: HubDetail[],
    genre: HubDetail[],
}

interface Top100 {
    data: any[];
    sectonType: string,
    title: string,
    items: [],
}

export type { SideBar, HomeData, Playlist, Artist, Song, SuggestedPlaylist, Section, Hub, HubDetail, Top100 }