type PropMessage = {
  message: string;
}

export const AlertWrong = ({ message }: PropMessage) => {
  return (
    <div role="alert" className="rounded border-s-4 border-red-500 bg-red-50 p-4 m-4 z-50 fixed bottom-7 right-4">
      <strong className="block font-medium text-red-800"> Error! </strong>

      <p className="mt-2 text-sm text-red-700">
        {message}
      </p>
    </div>
  )
}
