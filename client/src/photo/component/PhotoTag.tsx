import { Box, styled } from "@mui/material";
import { Tag } from "../type/Tag";

const TagItem = styled('div')(({ theme }) => ({
    color: 'white',
    pointerEvents: 'none',
    display: 'inline-block',
    padding: '5px',
    borderRadius: '3px',
    textAlign: 'center',
    backgroundColor: 'rgba(102, 106, 106, 0.5)',
    margin: '5px',
}));

export default function PhotoTag(tag: Tag) {
    return <TagItem>{tag.tag}</TagItem>
}