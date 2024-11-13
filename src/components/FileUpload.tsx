import React, { useState } from 'react'

type FileUploadButtonProps = {
  disabled?: boolean
  loading?: boolean
  onUpload?: (file: File) => void,
}

export const FileUpload: React.FC<FileUploadButtonProps> = ({
  disabled,
  onUpload
}) => {
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true)
      onUpload?.(e.target.files[0])
      setIsUploading(false)
    }
  }

  return (
    <div className="flex flex-col items-start space-y-2">
      <input
        type="file"
        onChange={handleFileChange}
        disabled={isUploading || disabled}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-base file:bg-blue-600 file:text-white file:disabled:bg-gray-400"
      />
    </div>
  )
}
