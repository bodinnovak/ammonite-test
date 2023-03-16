import Image from "next/image";
import { Playlist } from '../../type/type'
import { useMouseDetect } from '../../hooks/mouse'

function PageFooter({ list } : { list: Playlist }) {
  const [comRef, isInComponent] = useMouseDetect();

  return (
    <div className="fixed left-0 bottom-0 px-20 py-8 bg-white border-t w-full flex items-center justify-between dropdown-show" ref={comRef}>
      <div className="w-[10%] flex items-center justify-between pr-8">
        <Image src="/skip-previous.svg" alt="icon" width={30} height={30} className="cursor-pointer" />
        <Image src="/play.svg" alt="icon" width={36} height={36} className="cursor-pointer" />
        <Image src="/skip-next.svg" alt="icon" width={30} height={30} className="cursor-pointer" />
      </div>
      <div className="flex-1 px-20">
        <div className="flex items-end">
          <p className="text-sm text-gray-600">00:00</p>
          <div className="flex flex-col px-4 flex-1 pb-2">
            <div className="flex justify-between mb-3">
              <div className="flex">
                <Image src="/explicit.svg" alt="icon" width={20} height={20} className="mr-3" />
                <p>{list?.name} · {list?.artistInfoName}</p>
              </div>
              <div className="flex">
                <Image src="/add.svg" alt="icon" width={24} height={24} className="cursor-pointer" />
                <Image src="/favorite.svg" alt="icon" width={24} height={24} className="ml-4 cursor-pointer" />
              </div>
            </div>
            <div className="h-[1px] bg-black" />
          </div>
          <p className="text-sm text-gray-600">00:00</p>
        </div>
      </div>
      <div className="w-[15%] flex items-center justify-between px-8">
        <Image src="/screencast.svg" alt="icon" width={20} height={20} className="cursor-pointer" />
        <Image src="/repeat.svg" alt="icon" width={20} height={20} className="cursor-pointer" />
        <Image src="/random.svg" alt="icon" width={20} height={20} className="cursor-pointer" />
        <Image src="/volume-up.svg" alt="icon" width={20} height={20} className="cursor-pointer" />
        <Image src="/playlist.svg" alt="icon" width={20} height={20} className="cursor-pointer" />
      </div>
      <div className="flex items-center px-8 border-l">
        <Image src="/music.jpg" alt="music" width={32} height={32} className={`rounded ${isInComponent ? 'rotate-animation' : ''}`} />
        <p className="ml-4">Queue</p>
      </div>
    </div>
  )
}

export default PageFooter
