import instance from "@/composables/axios";

const get_playlist = async (id: string): Promise<any> => {
    const path = "/api/playlist";
    try {
        const res = await instance.get(path, {
            params: {
                id: id,
            }
        });

        return res;
    } catch (error) {
        console.log(error);
    }
}

const get_suggested_playlists = async (id: string): Promise<any> => {
    const path = "/api/playlist/section-bottom";
    try {
        const res = await instance.get(path, {
            params: {
                id: id,
            }
        });

        return res;
    } catch (error) {
        console.log(error);
    }
}

export { get_playlist, get_suggested_playlists }