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
  // maxFiles?: number
  // accept?: Accept
  // textPlaceholder?: string

  schema?: any
  onChange?: any
  value?: [string]
}

const MAX_LENGTH = 100

const nameLengthValidator = (file: File): any => {
  if (file.name.length > MAX_LENGTH) {
    return {
      code: 'name-too-large',
      message: `Name is larger than ${MAX_LENGTH} characters`,
    }
  }

  return null
}

const ImageUploader = (props: IImageUploaderProps): JSX.Element => {
  const { onChange, value, schema } = props
  const {
    maxLength,
    accept = {
      'image/*': [],
    },
    textPlaceholder = 'Drop or select files',
  } = schema

  const maxFiles = maxLength ?? 1

  const [files, setFiles] = useState(value ?? [])
  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    accept,
    maxFiles,

    onDrop: (acceptedFiles: any) => {
      const fileList = acceptedFiles.map((file: any) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
      setFiles(fileList)
      onChange(fileList)
    },
    validator: nameLengthValidator,
  })

  const fileRejectionItems = fileRejections.map(
    ({ file, errors }: { file: any; errors: any }) => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
        <ul>
          {errors.map((e: any) => (
            <li key={e.code}>{e.message}</li>
          ))}
        </ul>
      </li>
    )
  )

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
      {/* <h4>Rejected files</h4>
      <ul>{fileRejectionItems}</ul> */}
    </section>
  )
}

export default ImageUploader
