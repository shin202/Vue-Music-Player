import instance from "@/composables/axios";

const path = "/api/top-100";

const get_top_100 = async (): Promise<any> => {
    try {
        const res = await instance.get(path);

        return res;
    } catch (error) {
        console.log(error);
    }
}

export { get_top_100 }