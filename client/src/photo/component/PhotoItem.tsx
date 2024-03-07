import { IconButton, Skeleton } from "@mui/material";
import { useState } from "react";
import { ImageElementAttributes, Photo } from "react-photo-album";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import photoApi from "../api/PhotoApi";

interface Props {
    photo: any,
    width: number;
    height: number;
    imageProps: ImageElementAttributes;
}

export default function PhotoItem({ photo, width, height, imageProps: { alt, style, ...restImageProps } }: Props) {
    const [loading, setLoading] = useState(true);
    const [like, setLike] = useState(photo.like);

    const handleOnLikeClicked = () => {
        async function likePhoto() {
            let result = await photoApi.likePhoto(photo.id);
            if (result.status === 200) {
                console.log('like success');
                setLike(result.data);
            }
        }
        
        likePhoto();
    };

    const handleOnImageLoaded = () => {
        setLoading(false);
    }

    return (
        <div style={{ ...style, width: width, height: height, 
        borderRadius: '10px', 
        border: '1px solid silver', 
        position: 'relative'}}>

            { loading && <Skeleton variant="rounded" height='100%'/> }

            <img 
                alt={alt}
                style={{ ...style, width: width, height:height, borderRadius: 'inherit'}}
                onLoad={handleOnImageLoaded}
                {...restImageProps}
            />

            <div style={{position: 'absolute', zIndex: 100, top: '5%', left: '90%'}}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <IconButton onClick={handleOnLikeClicked} size="large" style={{padding: 0,}}> 
                            <FavoriteOutlinedIcon style={{color: 'red', fontSize: 30}}/>
                    </IconButton>
                    <p style={{
                        textAlign: 'center', 
                        padding: 0, margin: 0, 
                        color: 'silver', 
                        fontWeight: '10px',
                        fontSize: '20px',
                        textShadow: '-0.5px 0 black, 0 0.5px black, 0.5px 0 black, 0 -0.5px black'}}>
                        {like}
                    </p>
                </div>
            </div>
        </div>
    );
}