import express from "express";
import ZingController from "../controllers/ZingController";

const router = express.Router();

router.get('/', ZingController.get_home);

router.get('/song', ZingController.get_song);

router.get('/song/info', ZingController.get_song_info);

router.get('/song/lyrics', ZingController.get_song_lyrics);

router.get('/chart/home', ZingController.get_home_chart);

router.get('/chart/new-release', ZingController.get_new_release_chart);

router.get('/chart/week', ZingController.get_week_chart);

router.get('/radio', ZingController.get_radio);

router.get('/newfeeds', ZingController.get_new_feeds);

router.get('/artist', ZingController.get_artist);

router.get('/hub/home', ZingController.get_hub_home);

router.get('/hub/detail', ZingController.get_hub_detail);

router.get('/top-100', ZingController.get_top_100);

router.get('/mv/list', ZingController.get_list_mv);

router.get('/mv/category', ZingController.get_category_mv);

router.get('/mv/detail', ZingController.get_mv);

router.get('/playlist', ZingController.get_playlist);

router.get('/playlist/section-bottom', ZingController.get_suggested_playlists);

router.get('/events', ZingController.get_events);

router.get('/events/detail', ZingController.get_event_detail);

router.get('/search', ZingController.search_all);

router.get('/search/type', ZingController.search_by_type);

router.get('/recommend-keyword', ZingController.get_recommend_keyword);

router.get('/suggestion-keyword', ZingController.get_suggestion_keyword);

export default router;