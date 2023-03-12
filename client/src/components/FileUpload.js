import React, { useEffect, useState } from 'react'
//import { render } from 'react-dom'
import { storage } from '../firebase'

const FileUpload = () => {
  const [image, setImage] = useState(null)
  const [url, setUrl] = useState(null)
  const [progress, setProgress] = useState(0)

  const handleChange = (e) => {
    console.log('in handleChange')
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleUpload = () => {
    console.log('in handleupload')

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

    return image
  }

  useEffect(() => {
    console.log('image: ', image)
  })

  //  const imgSrc = document.querySelector('medium')
  //   const srcx = imgSrc.src

  return (
    <div>
      <progress value={progress} max="100" />
      <br />
      <br />
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      <br />
      {url}
      <br />
      <img
        className="medium"
        src={url || 'http://via.placeholder.com/300'}
        alt="firebase-imagex"
      />
      <br />
      Select image link and drag it into 'Upload the image for your service'
    </div>
  )
}
export default FileUpload //.handleUpload()
//render(<ReactFirebaseFileUpload />, document.querySelector('#root')){/* {srcx} */}
