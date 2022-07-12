import { zing } from "zingmp3-api-next";

class ZingController {
    public async get_home(_req: any, res: any) {
        const data = await zing.get_home();
        res.json(data);
    }

    public async get_song(req: any, res: any) {
        const data = await zing.get_song(req.query.id);
        res.json(data);
    }

    public async get_song_info(req: any, res: any) {
        const data = await zing.get_song_info(req.query.id);
        res.json(data);
    }

    public async get_song_lyrics(req: any, res: any) {
        const data = await zing.get_song_lyric(req.query.id);
        res.json(data);
    }

    public async get_home_chart(_req: any, res: any) {
        const data = await zing.get_home_chart();
        res.json(data);
    }

    public async get_new_release_chart(_req: any, res: any) {
        const data = await zing.get_new_release_chart();
        res.json(data);
    }

    public async get_week_chart(req: any, res: any) {
        const data = await zing.get_week_chart(req.query.id, req.query.week, req.query.year);
        res.json(data);
    }

    public async get_radio(_req: any, res: any) {
        const data = await zing.get_radio();
        res.json(data);
    }

    public async get_new_feeds(req: any, res: any) {
        const data = await zing.get_list_by_genre(req.query.id, req.query.page);
        res.json(data);
    }

    public async get_artist(req: any, res: any) {
        const data = await zing.get_artist(req.query.name);
        res.json(data);
    }

    public async get_hub_home(_req: any, res: any) {
        const data = await zing.get_hub_home();
        res.json(data);
    }

    public async get_hub_detail(req: any, res: any) {
        const data = await zing.get_hub_detail(req.query.id);
        res.json(data);
    }

    public async get_top_100(_req: any, res: any) {
        const data = await zing.get_top_100();
        res.json(data);
    }

    public async get_list_mv(req: any, res: any) {
        const data = await zing.get_list_mv(req.query.id, req.query.page, req.query.count, req.query.sort);
        res.json(data);
    }

    public async get_category_mv(req: any, res: any) {
        const data = await zing.get_category_mv(req.query.id);
        res.json(data);
    }

    public async get_mv(req: any, res: any) {
        const data = await zing.get_mv(req.query.id);
        res.json(data);
    }

    public async get_playlist(req: any, res: any) {
        const data = await zing.get_playlist(req.query.id);
        res.json(data);
    }

    public async get_suggested_playlists(req: any, res: any) {
        const data = await zing.get_suggested_playlists(req.query.id);
        res.json(data);
    }

    public async get_events(_req: any, res: any) {
        const data = await zing.get_events();
        res.json(data);
    }

    public async get_event_detail(req: any, res: any) {
        const data = await zing.get_event_info(req.query.id);
        res.json(data);
    }

    public async search_all(req: any, res: any) {
        const data = await zing.search_all(req.query.keyword);
        res.json(data);
    }

    public async search_by_type(req: any, res: any) {
        const data = await zing.search_by_type(req.query.keyword, req.query.type, req.query.page, req.query.count);
        res.json(data);
    }

    public async get_recommend_keyword(_req: any, res: any) {
        const data = await zing.get_recommend_keyword();
        res.json(data);
    }

    public async get_suggestion_keyword(req: any, res: any) {
        const data = await zing.get_suggestion_keyword(req.query.keyword);
        res.json(data);
    }
}

export default new ZingController;