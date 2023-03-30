import React, { useState } from 'react'
import TextField from '@mui/material/TextField'

function SearchText() {
  const [inputText, setInputText] = useState('')

  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase()
    setInputText(lowerCase)

    console.log('inputText', inputText)
  }

  return (
    <div className="main">
      <div className="search">
        <TextField
          id="outlined-basic"
          onChange={inputHandler}
          variant="outlined"
          fullWidth
          label="Search"
        />
      </div>
      {/* <List input={inputText} /> */}
    </div>
  )
}

export default SearchText
