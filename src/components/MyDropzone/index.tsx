import { useCallback } from 'react'
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone'

const MyDropzone = (): JSX.Element => {
  const onDrop = useCallback(
    <T extends File>(
      acceptedFiles: T[],
      fileRejections: FileRejection[],
      event: DropEvent
    ) => {
      // Do something with the files
      console.log({ acceptedFiles })
      console.log({ fileRejections })
      console.log({ event })
    },
    []
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  )
}

export default MyDropzone
