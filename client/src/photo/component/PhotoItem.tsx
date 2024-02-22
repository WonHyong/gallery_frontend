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

    const handleOnLoad = () => {
        setLoading(false);
    }

    return (
        <div style={{ width: width, height: height }}>
            { loading && <Skeleton component="div" variant="rectangular" height='100%'/> }
            <img 
                alt={alt}
                style={{ ...style, width: "100%", padding: 0,}} 
                onLoad={handleOnLoad}
                {...restImageProps}
            />
        </div>
    );
}