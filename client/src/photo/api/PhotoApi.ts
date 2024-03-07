import axios from "axios";
import api from "../../common/api/api"
import { Photo } from "../type/Photo";


const photoApi = {
    // getPhotos(page = 1, limit = 20) {
    //     return api.get<Photo[]>(`/list?page=${page}&limit=${limit}`);
    // },
    getPhotos(page = 0, size = 20) {
        return api.get<Photo[]>(`/photos`, {
            params: { page: page, size: size }
        });
    },
    uploadPhotos(photos: FormData) {
        return api.post<string>(`/photos`, photos);
        // return axios.post<string>('https://httpbin.org/post', {
        //     photos: photos
        // });
    },
    deletePhoto(id: number) {
        return api.delete<string>(`/${id}`);
    },
    likePhoto(id: number) {
        return api.put<number>(`/photos/${id}/likes`);
    }
}

export default photoApi;