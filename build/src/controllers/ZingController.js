"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zingmp3_api_next_1 = require("zingmp3-api-next");
class ZingController {
    async get_home(_req, res) {
        const data = await zingmp3_api_next_1.zing.get_home();
        res.json(data);
    }
    async get_song(req, res) {
        const data = await zingmp3_api_next_1.zing.get_song(req.query.id);
        res.json(data);
    }
    async get_song_info(req, res) {
        const data = await zingmp3_api_next_1.zing.get_song_info(req.query.id);
        res.json(data);
    }
    async get_song_lyrics(req, res) {
        const data = await zingmp3_api_next_1.zing.get_song_lyric(req.query.id);
        res.json(data);
    }
    async get_home_chart(_req, res) {
        const data = await zingmp3_api_next_1.zing.get_home_chart();
        res.json(data);
    }
    async get_new_release_chart(_req, res) {
        const data = await zingmp3_api_next_1.zing.get_new_release_chart();
        res.json(data);
    }
    async get_week_chart(req, res) {
        const data = await zingmp3_api_next_1.zing.get_week_chart(req.query.id, req.query.week, req.query.year);
        res.json(data);
    }
    async get_radio(_req, res) {
        const data = await zingmp3_api_next_1.zing.get_radio();
        res.json(data);
    }
    async get_new_feeds(req, res) {
        const data = await zingmp3_api_next_1.zing.get_list_by_genre(req.query.id, req.query.page);
        res.json(data);
    }
    async get_artist(req, res) {
        const data = await zingmp3_api_next_1.zing.get_artist(req.query.name);
        res.json(data);
    }
    async get_hub_home(_req, res) {
        const data = await zingmp3_api_next_1.zing.get_hub_home();
        res.json(data);
    }
    async get_hub_detail(req, res) {
        const data = await zingmp3_api_next_1.zing.get_hub_detail(req.query.id);
        res.json(data);
    }
    async get_top_100(_req, res) {
        const data = await zingmp3_api_next_1.zing.get_top_100();
        res.json(data);
    }
    async get_list_mv(req, res) {
        const data = await zingmp3_api_next_1.zing.get_list_mv(req.query.id, req.query.page, req.query.count, req.query.sort);
        res.json(data);
    }
    async get_category_mv(req, res) {
        const data = await zingmp3_api_next_1.zing.get_category_mv(req.query.id);
        res.json(data);
    }
    async get_mv(req, res) {
        const data = await zingmp3_api_next_1.zing.get_mv(req.query.id);
        res.json(data);
    }
    async get_playlist(req, res) {
        const data = await zingmp3_api_next_1.zing.get_playlist(req.query.id);
        res.json(data);
    }
    async get_suggested_playlists(req, res) {
        const data = await zingmp3_api_next_1.zing.get_suggested_playlists(req.query.id);
        res.json(data);
    }
    async get_events(_req, res) {
        const data = await zingmp3_api_next_1.zing.get_events();
        res.json(data);
    }
    async get_event_detail(req, res) {
        const data = await zingmp3_api_next_1.zing.get_event_info(req.query.id);
        res.json(data);
    }
    async search_all(req, res) {
        const data = await zingmp3_api_next_1.zing.search_all(req.query.keyword);
        res.json(data);
    }
    async search_by_type(req, res) {
        const data = await zingmp3_api_next_1.zing.search_by_type(req.query.keyword, req.query.type, req.query.page, req.query.count);
        res.json(data);
    }
    async get_recommend_keyword(_req, res) {
        const data = await zingmp3_api_next_1.zing.get_recommend_keyword();
        res.json(data);
    }
    async get_suggestion_keyword(req, res) {
        const data = await zingmp3_api_next_1.zing.get_suggestion_keyword(req.query.keyword);
        res.json(data);
    }
}
exports.default = new ZingController;
//# sourceMappingURL=ZingController.js.map