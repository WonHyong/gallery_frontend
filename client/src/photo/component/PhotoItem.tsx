import { IconButton, Skeleton, Typography } from "@mui/material";
import { useState } from "react";
import { ImageElementAttributes, Photo } from "react-photo-album";

import photoApi from "../api/PhotoApi";
import PhotoTag from "./PhotoTag";

interface Props {
    photo: any,
    width: number;
    height: number;
    imageProps: ImageElementAttributes;
}

export default function PhotoItem({ photo, width, height, imageProps: { alt, style, ...restImageProps } }: Props) {
    const [loading, setLoading] = useState(true);

    const handleOnImageLoaded = () => {
        setLoading(false);
    }

    return (
        <div style={{
            ...style, width: width, height: height,
            border: '1px solid silver',
            borderRadius: '5px',
            position: 'relative'
        }}>

            {loading && <Skeleton variant="rounded" height='100%' />}

            <img
                alt={alt}
                style={{ ...style, width: width, height: height, borderRadius: 'inherit' }}
                onLoad={handleOnImageLoaded}
                {...restImageProps}
            />

            <div style={{ display: 'flex', flexDirection: 'row', position: 'absolute', zIndex: 100, top: '0.5%', margin: '10px'}}>
                {photo.hashTags && photo.hashTags.map((tag) => {
                    return <PhotoTag id={tag.id} tag={tag.tag} />
                })}

            </div>
        </div>
    );
}