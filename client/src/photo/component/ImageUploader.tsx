import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import HideFab from '../../common/component/HideFab';
import { useRef, useState } from 'react';
import photoApi from '../api/PhotoApi';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { Button, CircularProgress, Grid, IconButton, Typography } from '@mui/material';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { BASE_API_URL } from '../../common/api/api';

const modalBoxStyle = {
	display: 'flex',
	flexDirection: 'column',
	position: 'absolute' as const,
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 500,
	height: 300,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
	padding: 2,
	borderRadius: '10px',
};

const MAX_UPLOAD_NUM = 99;

export default function ImageUploadButton() {
	const [modalOpen, setModalOpen] = useState(false);

	const [files, setFiles] = useState([]);
	const [uploadingCnt, setUploadingCnt] = useState(0);

	const handleOpen = () => setModalOpen(true);
	const handleClose = () => {
		setFiles([]);
		setModalOpen(false);
	}

	const fileInput = useRef(null);

	const selectPhotos = () => {
		if (fileInput.current) {
			fileInput.current.click();
		}
	}

	const addPhotos = (event) => {
		if (files.length >= MAX_UPLOAD_NUM) {
			alert(`최대 ${MAX_UPLOAD_NUM}개 업로드 가능`);
			return;
		}
		const mFiles = event.target.files;
		const mPreviews = [];

		if (mFiles) {
			for (const f of mFiles) {
				mPreviews.push(URL.createObjectURL(f));
			}
		}

		setFiles((files) => [...files, ...mFiles]);
	}

	const uploadPhoto = async () => {
		setUploadingCnt(files.length);

		try {
			for (const file of files) {
				const formData = new FormData();
				formData.append('photo', file);
				const response = await photoApi.uploadPhotos(formData);
				if (response.status === 200) {
					setUploadingCnt((cnt) => cnt - 1);
					console.log('remain upload: ', uploadingCnt);
				}
			}
		} catch (e) {
			console.error(e);
		} finally {
			setFiles([]);
		}

		setModalOpen(false);
	}

	return (
		<>
			<HideFab onClick={handleOpen} />
			<Modal
				open={modalOpen}
				onClose={handleClose}
			>
				<Box sx={modalBoxStyle}>
					<Box
						onClick={selectPhotos}
						sx={{ border: '3px dotted silver', width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
					>
						<Typography color={'silver'}>최대 {MAX_UPLOAD_NUM}개 | 10mb</Typography>
						{(files.length === 0)?
							<CloudUploadOutlinedIcon sx={{ fontSize:'800%', margin: 'auto' }} /> :
							<Typography variant='h3' margin={'auto'}>{files.length}개</Typography>
						}
						<input type='file' accept='image/*' multiple ref={fileInput} onChange={addPhotos} style={{ display: 'none' }} />
					</Box>
					{(files.length !== 0) && <Button variant='contained' onClick={uploadPhoto} sx={{ width: '100%', }}>UPLOAD</Button>}
				</Box>
			</Modal>
		</>
	);
}
