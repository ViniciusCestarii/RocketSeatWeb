'use client'

import { ChangeEvent, useState } from 'react'

const MediaPicker = () => {
  const [preview, setPreview] = useState<string | null>(null)
  const [isVideo, setIsVideo] = useState<boolean | null>(null)

  const onFileSelected = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target

    if (!files || (files && files.length < 1)) {
      setPreview(null)
      return
    }

    const videoRegex = /^.*\.(mp4|mov|avi|mkv|wmv)$/

    if (videoRegex.test(files[0].name)) {
      setIsVideo(true)
    } else {
      setIsVideo(false)
    }
    const previewURL = URL.createObjectURL(files[0])

    setPreview(previewURL)
  }
  return (
    <>
      <input
        onChange={onFileSelected}
        name="coverUrl"
        type="file"
        id="media"
        accept="image/*,video/*"
        className="invisible h-0 w-0"
      />

      {preview &&
        (isVideo ? (
          <video
            controls
            src={preview}
            className="aspect-video w-full rounded-lg object-cover"
          />
        ) : (
          // eslint-disable-next-line
          <img
            src={preview}
            alt="Image preview"
            className="aspect-video w-full rounded-lg object-cover"
          />
        ))}
    </>
  )
}

export default MediaPicker
