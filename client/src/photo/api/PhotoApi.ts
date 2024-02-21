import api from "../../common/api/api"
import { Photo } from "../type/Photo";


const photoApi = {
    getAll(page = 1, limit = 20) {
        return api.get<Photo[]>(`/list?page=${page}&limit=${limit}`);
    },
}

export default photoApi;