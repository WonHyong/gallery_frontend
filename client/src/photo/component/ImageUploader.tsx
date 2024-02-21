import 'react-dropzone-uploader/dist/styles.css'
import Dropzone, {
  IDropzoneProps,
} from 'react-dropzone-uploader'
import { useState } from 'react';

export default function ImageUploader() {
  const [isUpdatePreview, setIsUpdatePreview] = useState(false);

  const handleChangeStatus: IDropzoneProps['onChangeStatus'] = ({ meta }, status) => {
    console.log(status, meta);
    setIsUpdatePreview(!isUpdatePreview);
  }

  const handleSubmit: IDropzoneProps['onSubmit'] = (files, allFiles) => {
    console.log(files.map(f => f.meta))
    allFiles.forEach(f => f.remove())
  }

  return (
    <Dropzone
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      accept="image/*,video/*"
      inputContent={(_files, { reject }) => (reject ? 'Image and video files only' : 'Upload Files')}
      styles={{
        dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
        inputLabel: (_files, { reject }) => (reject ? { color: 'red' } : {}),
      }}
    />
  )
}
