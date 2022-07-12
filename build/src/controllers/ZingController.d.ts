declare class ZingController {
    get_home(_req: any, res: any): Promise<void>;
    get_song(req: any, res: any): Promise<void>;
    get_song_info(req: any, res: any): Promise<void>;
    get_song_lyrics(req: any, res: any): Promise<void>;
    get_home_chart(_req: any, res: any): Promise<void>;
    get_new_release_chart(_req: any, res: any): Promise<void>;
    get_week_chart(req: any, res: any): Promise<void>;
    get_radio(_req: any, res: any): Promise<void>;
    get_new_feeds(req: any, res: any): Promise<void>;
    get_artist(req: any, res: any): Promise<void>;
    get_hub_home(_req: any, res: any): Promise<void>;
    get_hub_detail(req: any, res: any): Promise<void>;
    get_top_100(_req: any, res: any): Promise<void>;
    get_list_mv(req: any, res: any): Promise<void>;
    get_category_mv(req: any, res: any): Promise<void>;
    get_mv(req: any, res: any): Promise<void>;
    get_playlist(req: any, res: any): Promise<void>;
    get_suggested_playlists(req: any, res: any): Promise<void>;
    get_events(_req: any, res: any): Promise<void>;
    get_event_detail(req: any, res: any): Promise<void>;
    search_all(req: any, res: any): Promise<void>;
    search_by_type(req: any, res: any): Promise<void>;
    get_recommend_keyword(_req: any, res: any): Promise<void>;
    get_suggestion_keyword(req: any, res: any): Promise<void>;
}
declare const _default: ZingController;
export default _default;
//# sourceMappingURL=ZingController.d.ts.map