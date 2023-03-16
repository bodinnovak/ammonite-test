import Image from 'next/image'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { createPlayList } from '../services/playlist.service'
import { useDispatch } from 'react-redux'
import { addList, setLoading } from '../store/common'

interface CreateListDialogProps {
  setIsOpen: CallableFunction
  isOpen: boolean
}

const schema = Yup.object().shape({
  name: Yup.string().required("The Name is required."),
  totalTime: Yup.string().required("The Total Time is required.")
})

function CreateListDialog({ setIsOpen, isOpen }: CreateListDialogProps) {
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      name: "",
      totalTime: "",
      artistName: "",
      tag: "",
      artistInfoName: "",
      description: ""
    },

    validationSchema: schema,

    onSubmit: async ({ name, totalTime, artistName, tag, artistInfoName, description }) => {
      dispatch(setLoading(true))
      setIsOpen(false)
      const form = {
        name,
        totalTime,
        artistName: artistName ? artistName : null,
        tag: tag ? tag : null,
        artistInfoName: artistInfoName ? artistInfoName : null,
        description: description ? description : null
      }
      createPlayList(form).then((res) => {
        dispatch(addList(res?.data))
      }).catch((err) => {
        console.log('error', err)
      }).finally(() => {
        dispatch(setLoading(false))
      })
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik

  return (
    <div>
      <div
        className={`sidebar-modal bg-white fixed top-0 z-10 -right-full xs:w-full w-[420px] ${
          isOpen ? 'active' : ''
        }`}
      >
        <div className="flex justify-between items-center p-3">
          <p className="text-lg font-medium">Test</p>
          <Image src="/cancel.svg" alt="icon" width={20} height={20} className="cursor-pointer" onClick={() => setIsOpen(false)} />
        </div>
        <form onSubmit={handleSubmit} method="POST" className="flex justify-between flex-wrap px-6">
          <div
            className="flex flex-col w-full"
          >
            <label
              className="text-gray-500 font-normal mb-3"
            >
              Name :
              <input
                className={`border border-dark-grey rounded p-3 mt-0.5 h-12 w-full focus-visible:outline-none focus:border-blue-500 focus:border ${errors.name && touched.name ? 'border border-red-600' : ''}`}
                placeholder="Please insert name"
                name="name"
                value={values.name}
                onChange={handleChange}
              />
              {errors.name && touched.name && <span className="text-sm text-red-600">{errors.name}</span>}
            </label>

            <label
              className="text-gray-500 font-normal mb-3"
            >
              Total Time :
              <input
                className={`border border-dark-grey rounded p-3 mt-0.5 h-12 w-full focus-visible:outline-none focus:border-blue-500 focus:border ${errors.totalTime && touched.totalTime ? 'border border-red-600' : ''}`}
                placeholder="Please insert total time"
                name="totalTime"
                value={values.totalTime}
                onChange={handleChange}
              />
              {errors.totalTime && touched.totalTime && <span className="text-sm text-red-600">{errors.totalTime}</span>}
            </label>

            <label
              className="text-gray-500 font-normal mb-3"
            >
              Artist Name :
              <input
                className="border border-dark-grey rounded p-3 mt-0.5 h-12 w-full focus-visible:outline-none focus:border-blue-500 focus:border"
                placeholder="Please insert total time"
                name="artistName"
                value={values.artistName}
                onChange={handleChange}
              />
            </label>

            <label
              className="text-gray-500 font-normal mb-3"
            >
              Tag :
              <input
                className="border border-dark-grey rounded p-3 mt-0.5 h-12 w-full focus-visible:outline-none focus:border-blue-500 focus:border"
                placeholder="Please insert tag"
                name="tag"
                value={values.tag}
                onChange={handleChange}
              />
            </label>

            <label
              className="text-gray-500 font-normal mb-3"
            >
              Artist Info Name :
              <input
                className="border border-dark-grey rounded p-3 mt-0.5 h-12 w-full focus-visible:outline-none focus:border-blue-500 focus:border"
                placeholder="Please insert artist info name"
                name="artistInfoName"
                value={values.artistInfoName}
                onChange={handleChange}
              />
            </label>

            <label
              className="text-gray-500 font-normal mb-3"
            >
              Description :
              <textarea
                className="border border-dark-grey rounded p-3 mt-0.5 w-full focus-visible:outline-none focus:border-blue-500 focus:border resize-none"
                placeholder="Please insert description"
                name="description"
                value={values.description}
                onChange={handleChange}
                rows={4}
              />
            </label>
          </div>
          <div className="flex w-full justify-end">
            <button type="submit" className="cursor-pointer rounded-md bg-indigo-600 py-2 px-6 text-base font-semibold leading-5 text-white hover:bg-indigo-500">
              Create
            </button>
          </div>
        </form>
      </div>
      <div
        className={`sidebar-overlay fixed top-0 right-0 w-full h-full opacity-0 ${
          isOpen ? 'active' : ''
        }`}
        onClick={() => setIsOpen(false)}
      />
    </div>
  )
}

export default CreateListDialog
