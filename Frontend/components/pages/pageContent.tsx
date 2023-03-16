import { ChangeEvent, useDeferredValue, useId, useMemo, useState } from 'react'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { Playlist } from '../../type/type'
import { playTrack } from '../../services/playlist.service'
import { setLists } from '../../store/common'

type PageContentProps = {
  lists: Playlist[]
  selectedList: Playlist
  handleSelectRow: (list: Playlist) => void
}

function PageContent({ lists, selectedList, handleSelectRow }: PageContentProps) {
  const dispatch = useDispatch()
  const [search, setSearch] = useState("")
  const deferredSearch = useDeferredValue(search)
  const uniqueId = useId()

  const clientLists = useMemo(() => {
    return lists.filter(item => item.name.toLowerCase().includes(deferredSearch.toLowerCase()))
  }, [deferredSearch, lists])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const playMusic = (id: string) => {
    playTrack(id).then((res) => {
      dispatch(setLists(res?.data))
    }).catch((err) => {
      console.log('error', err)
    })
  }

  return (
    <>
      <div className="flex justify-end">
        <input
          className="mt-6 mb-6 border border-dark-grey rounded p-3 mt-0.5 h-10 focus-visible:outline-none focus:border-blue-500 focus:border w-[40%]"
          placeholder="Search play lists"
          value={search}
          onChange={handleChange}
        />
      </div>
      {clientLists.length > 0 ? (
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
          <tr>
            <th scope="col" className="px-6 py-4">TRACK</th>
            <th scope="col" className="px-6 py-4" />
            <th scope="col" className="px-6 py-4">FEATURED ARTISTS</th>
            <th scope="col" className="px-6 py-4"><Image src="/schedule.svg" alt="icon" width={24} height={24} /></th>
            <th scope="col" className="px-6 py-4">POP.</th>
          </tr>
          </thead>
          <tbody>
          {clientLists.map((list: any, index: number) => (
            <tr key={`${list.id}-${uniqueId}`} className={`hover:bg-gray-100 cursor-pointer ${selectedList?.id === list.id ? 'bg-gray-100' : ''}`} onClick={() => handleSelectRow(list)}>
              <td className="whitespace-nowrap px-6 py-4 font-medium">
                <div className="flex items-center">
                  <div className="relative">
                    <Image src="/music.jpg" alt="music" width={60} height={60} className="rounded" />
                    {selectedList?.id === list.id && (
                      <div
                        className="explode-animation w-[45px] h-[45px] rounded-full bg-white absolute left-1/2 top-1/2 transform -translate-x-2/4 -translate-y-2/4 cursor-pointer flex justify-center items-center"
                        onClick={() => playMusic(list.id)}
                      >
                        <Image
                          src="/play-black.svg"
                          alt="music"
                          width={42}
                          height={42}
                          className="scale-animation"
                        />
                      </div>
                    )}
                  </div>
                  <p className={`ml-8 text-base ${selectedList?.id === list.id ? 'text-red-500' : ''}`}>{index + 1} {list.name}</p>
                  <Image src="/explicit.svg" alt="icon" width={20} height={20} className="ml-3" />
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="flex justify-end">
                  <Image src="/favorite.svg" alt="icon" width={24} height={24} className="cursor-pointer" />
                  <Image src="/more_horiz.svg" alt="icon" width={24} height={24} className="ml-8 cursor-pointer" />
                </div>
              </td>
              <td className={`whitespace-nowrap px-6 py-4 ${selectedList?.id === list.id ? 'text-red-500' : ''}`}>{list.artist ? list.artist : '-'}</td>
              <td className={`whitespace-nowrap px-6 py-4 ${selectedList?.id === list.id ? 'text-red-500' : ''}`}>{list.totalTime}</td>
              <td className="whitespace-nowrap px-6 py-4" />
            </tr>
          ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-3xl font-bold">No data</p>
      )}
    </>
  )
}

export default PageContent;
