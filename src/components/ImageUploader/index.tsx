import { CloseCircle } from 'iconsax-react'
import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import './style.scss'

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
  schema?: any
  onChange?: any
  value?: [string]
  disabled: boolean
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
  const { onChange, value, schema, disabled } = props
  const {
    maxItems,
    accept = {
      'image/*': [],
    },
    textPlaceholder = 'Drop or select files',
    title = '',
  } = schema

  const [files, setFiles] = useState<any[]>(value ?? [])

  useEffect(() => {
    onChange(files)
  }, [files])

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    accept,
    // maxFiles,
    disabled,
    onDrop: (acceptedFiles: any) => {
      const fileList = acceptedFiles.map((file: any) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
      setFiles(fileList)
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

  const removeImage = (fileName: string): void => {
    const filteredFiles = files.filter((file) => file.name !== fileName)

    setFiles(filteredFiles as any)
  }

  const renderThumbs = (): JSX.Element[] => {
    return files.map((file: any) => (
      <div style={thumb} key={file.name} className='thumb-container'>
        <div className='delete-thumb-icon'>
          <CloseCircle size='20' onClick={() => removeImage(file.name)} />
        </div>
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
  }

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file: any) => URL.revokeObjectURL(file.preview))
  }, [])

  return (
    <section className='container'>
      {title && <p>{title}</p>}
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>{textPlaceholder}</p>
      </div>
      <aside style={thumbsContainer}>{renderThumbs()}</aside>
      {/* <h4>Rejected files</h4>
      <ul>{fileRejectionItems}</ul> */}
    </section>
  )
}

export default ImageUploader
