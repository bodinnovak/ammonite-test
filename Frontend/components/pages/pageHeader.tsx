import Image from 'next/image'
import { Playlist } from '../../type/type'
import { playTrack } from '../../services/playlist.service'
import { useDispatch } from 'react-redux'
import { setLists } from '../../store/common'

function PageHeader({ list } : { list: Playlist }) {
  const dispatch = useDispatch()

  const playMusic = (id: string) => {
    playTrack(id).then((res) => {
      dispatch(setLists(res?.data))
    }).catch((err) => {
      console.log('error', err)
    })
  }

  return (
    <div className="flex mb-8 items-center slide-show">
      <Image src="/music.jpg" alt="music" width={240} height={240} className="rounded mr-8" />
      <div className="flex flex-col items-start">
        <p className="px-2 bg-black text-white rounded text-sm mb-3">{list?.tag}</p>
        <p className="text-4xl font-bold mb-4">{list?.name}</p>
        <div className="flex items-center mb-2">
          <Image src="/avatar.jpg" alt="avatar" width={30} height={30} className="rounded-full mr-2" />
          <p>{list?.artistInfoName}</p>
        </div>
        <p className="text-xs mb-4">{list?.description}</p>
        <div className="flex">
          <button
            className="gelatine flex items-center px-8 bg-red-500 text-white rounded-full mr-8 h-[36px]"
            onClick={() => playMusic(list.id)}
          >
            <Image src="/play-white.svg" alt="icon" width={20} height={20} className="mr-4" />
            LISTEN
          </button>
          <button className="w-[36px] h-[36px] border rounded-full flex justify-center items-center mr-4">
            <Image src="/favorite.svg" alt="icon" width={20} height={20} />
          </button>
          <button className="w-[36px] h-[36px] border rounded-full flex justify-center items-center mr-4">
            <Image src="/share.jpg" alt="icon" width={20} height={20} />
          </button>
          <button className="w-[36px] h-[36px] border rounded-full flex justify-center items-center">
            <Image src="/more_horiz.svg" alt="icon" width={20} height={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default PageHeader;
