import instance from "@/composables/axios";

const path = "/api";
const get_home = async (): Promise<any> => {
    try {
        const res = await instance.get(path);

        return res;
    } catch (error) {
        console.log(error);
    }
}

export { get_home };