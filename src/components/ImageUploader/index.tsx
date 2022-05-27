import React, { useEffect, useState } from 'react'
import { Accept, DropEvent, FileRejection, useDropzone } from 'react-dropzone'

type CSSProperties = Record<string, string | number>

const thumbsContainer: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
}

const thumb: CSSProperties = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box',
}

const thumbInner: CSSProperties = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
}

const img: CSSProperties = {
  display: 'block',
  width: 'auto',
  height: '100%',
}

interface IImageUploaderProps {
  maxFiles?: number
  accept?: Accept
  textPlaceholder?: string
}

const ImageUploader = (props: IImageUploaderProps): JSX.Element => {
  const {
    maxFiles = 1,
    accept = {
      'image/*': [],
    },
    textPlaceholder = 'Drop files here',
    // textPlaceholder = 'Drag and drop some files here, or click to select files',
  } = props

  const [files, setFiles] = useState([])
  const { getRootProps, getInputProps } = useDropzone({
    accept,
    maxFiles,
    onDrop: (acceptedFiles: any) => {
      setFiles(
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      )
    },
  })

  const thumbs = files.map((file: any) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          alt={file.name}
          onLoad={() => {
            URL.revokeObjectURL(file.preview)
          }}
        />
      </div>
    </div>
  ))

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file: any) => URL.revokeObjectURL(file.preview))
  }, [])

  return (
    <section className='container'>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>{textPlaceholder}</p>
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </section>
  )
}

export default ImageUploader
