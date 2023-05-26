import { getUser } from '@/lib/auth'
import Image from 'next/image'

const Profile = () => {
  const { name, avatarUrl } = getUser()

  return (
    <div className="flex items-center gap-3 text-left">
      <Image
        src={avatarUrl} // Next doesnt load external images by default i need to go to the next.config.js
        width={200}
        height={200}
        alt="Sua foto de perfil!"
        className="h-10 w-10 rounded-full"
      />{' '}
      {/* height and width that i want to the image LOAD */}
      <p className="max-w-[148px] text-sm leading-snug">
        {name}
        <a
          href="/api/auth/logout"
          className="block text-red-500 hover:text-red-400"
        >
          Quero sair
        </a>
      </p>
    </div>
  )
}

export default Profile
