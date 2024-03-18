import { Tag } from "./Tag";

export interface Photo {
    id: number;
    width: number;
    height: number;
    likes: number;
    url: string;
    thbUrl: string;
    hashTags: Tag[];
    gpsLatitude: number;
    gpsLongitude: number;
    uploadDate;
}