import 'react-dropzone-uploader/dist/styles.css'
import Dropzone, {
  IDropzoneProps,
} from 'react-dropzone-uploader'
import { useState } from 'react';
import photoApi from '../api/PhotoApi';

export default function ImageUploader() {
  const [isUpdatePreview, setIsUpdatePreview] = useState(false);

  const handleChangeStatus: IDropzoneProps['onChangeStatus'] = ({ meta }, status) => {
    console.log(status, meta);
    setIsUpdatePreview(!isUpdatePreview);
  }

  const handleSubmit: IDropzoneProps['onSubmit'] = (files, allFiles) => {
    console.log(files.map(f => f.file));

    const formData = new FormData();
    Array.from(files.map(f => f.file)).forEach((el) => {
      formData.append('photos', el);
    })

    async function uploadPhotos(photos: File[]) {
      const formData = new FormData();
      Array.from(photos).forEach((el) => {
        formData.append('photos', el);
      });
        try {
          const response = await photoApi.uploadPhotos(formData);
          console.log('upload: ', response);
        } catch (e) {
          console.error(e);
        }
    }

    uploadPhotos(files.map(f => f.file));
    allFiles.forEach(f => f.remove());
  }

  return (
    <Dropzone
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      accept="image/*,video/*"
      inputContent={(_files, { reject }) => (reject ? 'Image and video files only' : 'Upload Files')}
      styles={{
        dropzone: { color: 'inherit' },
        dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
        inputLabel: (_files, { reject }) => (reject ? { color: 'red' } : { color: 'inherit' }),
        submitButton: { backgroundColor: 'black' },
        inputLabelWithFiles: { backgroundColor: 'black', color: 'white', },
      }}
    />
  )
}
