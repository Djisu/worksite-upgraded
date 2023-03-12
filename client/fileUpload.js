import React, { useState } from 'react'
import { storage } from '../firebase'

function ReactFirebaseFileUpload() {
  const [image, setImage] = useState(null)
  const [url, setUrl] = useState('')
  const [progress, setProgress] = useState(0)

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image)
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        )
        setProgress(progress)
      },
      (error) => {
        console.log(error)
      },
      () => {
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url)
          })
      },
    )
  }

  console.log('image: ', image)

  return (
    <div>
      <br />
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      <br />
      {url}
    </div>
  )
}

export default ReactFirebaseFileUpload
