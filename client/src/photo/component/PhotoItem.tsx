import { IconButton, Skeleton } from "@mui/material";
import { useState } from "react";
import { ImageElementAttributes, Photo } from "react-photo-album";
import FavoriteIcon from '@mui/icons-material/Favorite';

interface Props {
    photo: any,
    width: number;
    height: number;
    imageProps: ImageElementAttributes;
}

export default function PhotoItem({ photo, width, height, imageProps: { alt, style, ...restImageProps } }: Props) {
    const [loading, setLoading] = useState(true);

    return (
        <div style={{ ...style, width: width, height: height, borderRadius: '10px', border: '1px solid silver', }}>

            { loading && <Skeleton variant="rounded" height='100%'/> }

            <img 
                alt={alt}
                style={{ ...style, width: "100%", borderRadius: 'inherit'}}
                onLoad={() => setLoading(false)}
                {...restImageProps}
            />

            <div>
                <IconButton>
                    <FavoriteIcon color="secondary"/>
                </IconButton>
                <p>{photo.like}</p>
            </div>
        </div>
    );
}