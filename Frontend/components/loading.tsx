function Loading() {
  return (
    <div className="absolute inset-0 bg-gray-100 flex justify-center items-center bg-opacity-30 z-10">
      <div
        className="inline-block h-12 w-12 animate-spin rounded-full border-t-4 border-r-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      />
    </div>
  )
}

export default Loading
