import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Download, Zoom } from "yet-another-react-lightbox/plugins";
import PhotoAlbum, { RenderPhoto} from "react-photo-album";
import PhotoItem from "./PhotoItem";
import { Photo } from "../type/Photo";


const renderPhoto: RenderPhoto = ({ photo, layout, imageProps: { alt, style, ...restImageProps } }) => (
    <PhotoItem 
        width={layout.width} 
        height={layout.height}
        photo={photo}
        imageProps={{alt, style, ...restImageProps}}
    />
);

interface PhotoListProps {
    photos: Photo[];
}

export default function PhotoList({ photos }: PhotoListProps) {
    const [index, setIndex] = useState(-1);

    const slides = photos.map((item) => (
        {
            src: item.url,
            width: item.width,
            height: item.height,
            like: item.like,
            id: item.id,
        }
    ));

    return (
        <section>
            <PhotoAlbum
                layout="masonry"
                photos={slides}
                spacing={15}
                columns={2}
                onClick={({ index: current }) => setIndex(current)}
                renderPhoto={renderPhoto}
            />
            <Lightbox
                slides={slides}
                plugins={[Zoom, Download]}
                open={index >= 0}
                index={index}
                close={() => setIndex(-1)}
            />
        </section>
    )
}