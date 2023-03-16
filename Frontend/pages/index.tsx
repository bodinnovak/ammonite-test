import { useEffect, useState, useTransition } from 'react'
import type { NextPage } from 'next'
import { useDispatch, useSelector } from 'react-redux'
import Head from 'next/head'
import { selectedList, setSelectList, playLists, setLists, setLoading, loading } from '../store/common'
import { getPlayList } from '../services/playlist.service'
import CreateListDialog from '../components/modal'
import Loading from '../components/loading'
import PageHeader from '../components/pages/pageHeader'
import PageFooter from '../components/pages/pageFooter'
import PageContent from '../components/pages/pageContent'
import { Playlist } from '../type/type'

const Home: NextPage = () => {
  const selectedRow: Playlist = useSelector(selectedList)
  const lists: Playlist[] = useSelector(playLists)
  const pageLoading: boolean = useSelector(loading)
  const dispatch = useDispatch()
  const [open, setOpen] = useState<boolean>(false)
  const [isPending, startTransition] = useTransition()

  const handleSelectRow = (row: any) => {
    startTransition(() => {
      dispatch(setSelectList(row))
    })
  }

  useEffect(() => {
    dispatch(setLoading(true))
    getPlayList().then((res) => {
      dispatch(setLists(res?.data))
    }).catch((err) => {
      console.log('error', err)
      dispatch(setLists([]))
    }).finally(() => {
      dispatch(setLoading(false))
    })
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Test</title>
      </Head>

      {pageLoading ? <Loading /> : (
        <main className="flex w-full flex-1 flex-col text-center">
          <header className="py-6 flex px-20">
            <h1 className="text-3xl font-bold text-blue-600">
              Playground React Playlist
            </h1>
          </header>

          <div className="container mx-auto pb-32">
            <div className="flex justify-end">
              <button className="cursor-pointer rounded-md bg-indigo-600 py-2 px-6 text-base font-semibold leading-5 text-white hover:bg-indigo-500" onClick={() => setOpen(true)}>
                Create
              </button>
            </div>
            {selectedRow && (
              <PageHeader list={selectedRow} />
            )}
            <PageContent lists={lists} selectedList={selectedRow} handleSelectRow={handleSelectRow} />
          </div>

          {selectedRow && (
            <PageFooter list={selectedRow} />
          )}
        </main>
      )}

      <CreateListDialog setIsOpen={setOpen} isOpen={open} />
    </div>
  )
}

export default Home
