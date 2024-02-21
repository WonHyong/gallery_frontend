import * as React from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import { Fab } from "@mui/material";
import AddIcon  from '@mui/icons-material/Add'

const fabStyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
};

interface HideOnScrollProps {
    direction: 'down' | 'up';
    children: React.ReactElement;
}

function HideOnScroll(props: HideOnScrollProps) {
    const { children } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger();

    return (
        <Slide appear={false} direction={props.direction} in={!trigger}>
            {children}
        </Slide>
    );
}

interface HideFabProps {
    onClick: React.MouseEventHandler;
}

export default function HideFab(props: HideFabProps) {
    return <HideOnScroll direction='up'>
        <Fab color="primary" aria-label="add" sx={fabStyle} onClick={props.onClick}>
            <AddIcon />
        </Fab>
    </HideOnScroll>
}