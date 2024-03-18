import { useState } from "react";
import PhotoAlbum, { RenderPhoto } from "react-photo-album";
import PhotoItem from "./PhotoItem";
import { Photo } from "../type/Photo";
import { Box, IconButton, Modal } from "@mui/material";
import photoApi from "../api/PhotoApi";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';


const renderPhoto: RenderPhoto = ({ photo, layout, imageProps: { alt, style, ...restImageProps } }) => (
    <PhotoItem
        width={layout.width}
        height={layout.height}
        photo={photo}
        imageProps={{ alt, style, ...restImageProps }}
    />
);

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    width: '80%',
    height: '80%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    padding: 0,
    borderRadius: '20px',

};

interface PhotoListProps {
    photos: Photo[];
}

export default function PhotoList({ photos }: PhotoListProps) {
    const [index, setIndex] = useState(-1);
    const [like, setLike] = useState(-1);

    const slides = photos.map((item) => (
        {
            src: item.url,
            width: item.width,
            height: item.height,
            like: item.likes,
            hashTags: item.hashTags,
            id: item.id,
        }
    ));

    const handleOnLikeClicked = (photo: Photo) => {
        async function likePhoto() {
            let result = await photoApi.likePhoto(photo.id);
            if (result.status === 200) {
                console.log('like success');
                console.log('photo: ', photo.hashTags);
                setLike(result.data);
            }
        }

        likePhoto();
    };

    return (
        <section>
            <PhotoAlbum
                layout="columns"
                photos={slides.reverse()}
                spacing={25}
                columns={2}
                onClick={({ index: current }) => {
                    setIndex(current); 
                    setLike(photos[current].likes)
                }}
                renderPhoto={renderPhoto}
            />
            <Modal
                open={index >= 0}
                onClose={() => setIndex(-1)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div>
                    {(index >= 0) &&
                        <Box sx={style}>
                            <img src={slides[index].src} alt='NO IMAGE' width='100%' height='100%' style={{ borderRadius: 'inherit', objectFit: 'scale-down', }} />
                            <div style={{ position: 'absolute', zIndex: 100, top: '5%', left: '90%' }}>
                                <IconButton onClick={() => handleOnLikeClicked(photos[index])} size="large" style={{ padding: 0, }}>
                                    <FavoriteOutlinedIcon style={{ color: 'red', fontSize: 30 }} />
                                </IconButton>
                                <p style={{
                                    textAlign: 'center',
                                    padding: 0, margin: 0,
                                    color: 'silver',
                                    fontWeight: '10px',
                                    fontSize: '20px',
                                    textShadow: '-0.5px 0 black, 0 0.5px black, 0.5px 0 black, 0 -0.5px black'
                                }}>
                                    {like}
                                </p>
                            </div>
                        </Box>
                    }
                </div>

            </Modal>
        </section>
    )
}