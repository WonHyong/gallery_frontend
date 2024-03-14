export interface Photo {
    id: number;
    width: number;
    height: number;
    likes: number;
    url: string;
    thbUrl: string;
    hashTags: [];
    gpsLatitude: number;
    gpsLongitude: number;
    uploadDate;
}