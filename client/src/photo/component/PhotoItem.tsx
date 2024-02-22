import { Skeleton } from "@mui/material";
import { useState } from "react";
import { ImageElementAttributes } from "react-photo-album";

interface Props {
    width: number;
    height: number;
    imageProps: ImageElementAttributes;
}

export default function PhotoItem({ width, height, imageProps: { alt, style, ...restImageProps } }: Props) {
    const [loading, setLoading] = useState(true);

    return (
        <div style={{ ...style, width: width, height: height, borderRadius: '10px' }}>
            { loading && <Skeleton variant="rounded" height='100%'/> }
            <img 
                alt={alt}
                style={{ ...style, width: "100%", borderRadius: 'inherit'}}
                onLoad={() => setLoading(false)}
                {...restImageProps}
            />
        </div>
    );
}