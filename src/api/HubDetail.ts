import instance from "@/composables/axios";

const path = "/api/hub/detail";

const get_hub_detail = async (id: string): Promise<any> => {
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

export { get_hub_detail }