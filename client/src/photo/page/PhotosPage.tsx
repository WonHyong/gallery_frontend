import { useEffect, useRef, useState } from 'react';
import photoApi from '../api/PhotoApi';
import PhotoList from '../component/PhotoList';
import { Box, CircularProgress, Divider, Drawer, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Photo } from '../type/Photo';
import SearchAppBar from '../../common/component/SearchAppBar';
import ImageUploadButton from '../component/ImageUploadButton';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

export default function PhotosPage() {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isLast, setIsLast] = useState(false);
    const [drawerOpened, setDrawerOpened] = useState(false);

    const observerTarget = useRef(null);

    const toggleDrawer =
        (open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }
                setDrawerOpened(open);
            };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                <ListItem key={'LOCATION'} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <LocationOnIcon />
                        </ListItemIcon>
                        <ListItemText primary='LOCATION' />
                    </ListItemButton>
                </ListItem>
                <ListItem key={'TIME'} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <AccessTimeIcon />
                        </ListItemIcon>
                        <ListItemText primary='TIME' />
                    </ListItemButton>
                </ListItem>
                <ListItem key={'TAG'} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <LocalOfferIcon />
                        </ListItemIcon>
                        <ListItemText primary='TAG' />
                    </ListItemButton>
                </ListItem>
            </List>

            <Divider />
        </Box>
    );

    useEffect(() => {
        async function loadPhotos() {
            setLoading(true);
            try {
                const response = await photoApi.getPhotos(currentPage, 10);

                console.log('load photos', response);

                if (currentPage === 0) {
                    setPhotos(response.data);
                } else {
                    setPhotos((photos) => [...photos, ...response.data]);
                }

                setCurrentPage((currentPage) => currentPage + 1);

                if (response.data.length < 10) {
                    setIsLast(true);
                }
            } catch (e) {
                console.error(e);
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && !loading && !isLast && !error) {
                    loadPhotos();
                }
            },
            { threshold: 0.5 }
        );



        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        // TODO: ???? why assign outside of return
        const target = observerTarget.current;

        return () => {
            if (target) {
                observer.unobserve(target);
            }
        };
    }, [currentPage, loading, observerTarget]);

    return (
        <>
            <SearchAppBar title='logallery' titleLink='/' onMenuButtonClick={toggleDrawer(true)} />

            {/* ONLY FOR MOBILE AND TABLET, HAVE TO MAKE FOR PC */}
            <Drawer
                anchor='left'
                open={drawerOpened}
                onClose={toggleDrawer(false)}
            >
                {DrawerList}
            </Drawer>
            <PhotoList photos={photos} />
            {loading && <div className='center-page'><CircularProgress /></div>}
            <ImageUploadButton />
            <div ref={observerTarget} style={{ height: '1px' }}></div>
        </>
    );
}