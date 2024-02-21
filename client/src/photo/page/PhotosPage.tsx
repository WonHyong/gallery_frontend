import { useEffect, useRef, useState } from 'react';
import photoApi from '../api/PhotoApi';
import PhotoList from '../component/PhotoList';
import { CircularProgress } from '@mui/material';
import { Photo } from '../type/Photo';
import SearchAppBar from '../component/SearchAppBar';
import ImageUploadButton from '../component/ImageUploadButton';

export default function PhotosPage() {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    
    const observerTarget = useRef(null);

    useEffect(() => {
        async function loadPhotos() {
            setLoading(true);
            try {
                const response = await photoApi.getAll(currentPage);

                if (currentPage === 1) {
                    setPhotos(response.data);
                } else {
                    setPhotos((photos) => [...photos, ...response.data]);
                }

                setCurrentPage((currentPage) => currentPage + 1);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && !loading) {
                    loadPhotos();
                }
            },
            { threshold: 0.3 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [currentPage, observerTarget]);
    
    return (
        <>
            <SearchAppBar />
            <PhotoList photos={photos} />
            {loading && <div className='center-page'><CircularProgress /></div>}
            <ImageUploadButton />
            <div ref={observerTarget} style={{ height: '1px' }}></div>
        </>
    );
}