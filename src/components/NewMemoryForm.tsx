'use client'

import { Camera } from 'lucide-react'
import MediaPicker from './MediaPicker'
import { FormEvent } from 'react'
import { api } from '@/lib/api'
import Cookie from 'js-cookie'
import { useRouter } from 'next/navigation'

const NewMemoryForm = () => {
  const router = useRouter()

  const handleCreateMemory = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    // console.log(Array.from(formData.entries())) to see the entries obs: the checkbox returns 'false' when selected but it returns a string so string = true e when it's not selected it returns nothing so undefined = false :)

    const fileToUpload = formData.get('coverUrl') as File

    let coverUrl = ''

    const token = Cookie.get('token')

    if (fileToUpload && fileToUpload.size > 0) {
      const uploadFormData = new FormData()
      uploadFormData.set('file', fileToUpload)

      const uploadResponse = await api.post('/upload', uploadFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      coverUrl = uploadResponse.data.fileUrl
    }

    await api.post(
      '/memories',
      {
        coverUrl,
        content: formData.get('content'),
        isPublic: formData.get('isPublic'),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    router.push('/')
  }
  return (
    <form onSubmit={handleCreateMemory} className="flex flex-1 flex-col gap-2">
      <div className="flex items-center gap-4">
        <label
          htmlFor="media"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <Camera className="h-4 w-4" />
          Anexar mídia
        </label>

        <label
          htmlFor="isPublic"
          className="flex select-none items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100 "
        >
          <input
            type="checkbox"
            name="isPublic"
            id="isPublic"
            value="false"
            className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500"
          />
          {/* needs Tailwindcss forms to style a checkbox correctly */}
          Torna memória pública
        </label>
      </div>
      <MediaPicker />
      <textarea
        name="content"
        spellCheck={false}
        className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre!"
      />

      <button
        type="submit"
        className="inline-block self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
      >
        Salvar
      </button>
    </form>
  )
}

export default NewMemoryForm
