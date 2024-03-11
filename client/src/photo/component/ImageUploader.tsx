import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import HideFab from '../../common/component/HideFab';
import { useRef, useState } from 'react';
import photoApi from '../api/PhotoApi';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { Button, CircularProgress, Grid, Typography } from '@mui/material';
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

export default function ImageUploadButton() {
	const [modalOpen, setModalOpen] = useState(false);

	const [files, setFiles] = useState([]);
	const [previews, setPreviews] = useState([]);
	const [uploadingCnt, setUploadingCnt] = useState(0);

	const handleOpen = () => setModalOpen(true);
	const handleClose = () => setModalOpen(false);

	const fileInput = useRef(null);

	const selectPhotos = () => {
		if (fileInput.current) {
			fileInput.current.click();
		}
	}

	const addPhotos = (event) => {
		const mFiles = event.target.files;
		const mPreviews = [];

		if (mFiles) {
			for (const f of mFiles) {
				mPreviews.push(URL.createObjectURL(f));
			}
		}

		setFiles((files) => [...files, ...mFiles]);
		setPreviews((previews) => [...previews, ...mPreviews]);
	}

	const removePhoto = (idx) => {
		setFiles(files.splice(idx, 1));
		setPreviews(previews.splice(idx, 1));
	}

	const uploadPhoto = async () => {
		setUploadingCnt(files.length);

		try {
			for (const file of files) {
				const formData = new FormData();
				formData.append('photo', file);
				const response = await photoApi.uploadPhotos(formData);
				if (response.status === 200) {
					console.log('remain upload: ', uploadingCnt);
					setUploadingCnt((cnt) => cnt - 1);
				}
			}
		} catch (e) {
			console.error(e);
		} finally {
			setFiles([]);
			setPreviews([]);
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
						sx={{ border: '3px dotted silver', width: '100%', height: ((files.length === 0) ? '100%' : '20%'), display: 'flex', flexDirection: 'column' }}
					>
						<CloudUploadOutlinedIcon sx={{ fontSize: ((files.length === 0) ? '800%' : '200%'), margin: 'auto' }} />
						<input type='file' accept='image/*' multiple ref={fileInput} onChange={addPhotos} style={{ display: 'none' }} />
					</Box>
					{(files.length !== 0) &&
						<Box sx={{ flexGrow: 1, margin: '5px' }}>
							<Grid container spacing={2}>
								{previews.map((item, idx) => {
									return (
										<Grid item xs={3} sx={{ borderRadius: '10px', margin: '3px'}}>
											<img src={item} width={100} height={100} style={{borderRadius: 'inherit'}}/>
										</Grid>
									)
								})}
							</Grid>
							<Button variant='contained' onClick={uploadPhoto}>
								<Typography variant='h6'>업로드</Typography>
							</Button>
						</Box>
					}

				</Box>
			</Modal>
		</>
	);
}
