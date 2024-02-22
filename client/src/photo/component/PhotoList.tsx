import { Photo } from "../type/Photo";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Download, Zoom } from "yet-another-react-lightbox/plugins";
import PhotoAlbum, { RenderPhoto } from "react-photo-album";
import PhotoItem from "./PhotoItem";

const renderPhoto: RenderPhoto = ({ layout, imageProps: { alt, style, ...restImageProps } }) => (
    <PhotoItem 
        width={layout.width} 
        height={layout.height} 
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
            src: item.download_url,
            width: item.width,
            height: item.height
        }
    ));

    return (
        <section>
            <PhotoAlbum
                layout="masonry"
                photos={slides}
                spacing={15}
                columns={2} // TODO: Only for mobile, Have to define for tablet and pc.
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