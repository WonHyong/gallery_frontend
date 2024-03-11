import { useState } from "react";
import PhotoAlbum, { RenderPhoto} from "react-photo-album";
import PhotoItem from "./PhotoItem";
import { Photo } from "../type/Photo";
import { Box, Modal } from "@mui/material";


const renderPhoto: RenderPhoto = ({ photo, layout, imageProps: { alt, style, ...restImageProps } }) => (
    <PhotoItem 
        width={layout.width} 
        height={layout.height}
        photo={photo}
        imageProps={{alt, style, ...restImageProps}}
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
    objectFit: 'cover',
  };

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
            like: item.likes,
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
            <Modal
                open={index >= 0}
                onClose={() => setIndex(-1)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div>
                    {(index >= 0) &&
                        <Box sx={style}>
                            <img src={slides[index].src} alt='NO IMAGE' width='100%' height='100%' style={{borderRadius: 'inherit', }}/>
                        </Box>
                    }
                </div>
            </Modal>
        </section>
    )
}