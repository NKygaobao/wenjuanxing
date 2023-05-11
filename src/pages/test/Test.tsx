import React, { ChangeEvent, FC, useState } from 'react'

const Text: FC = () => {
  const [text, setText] = useState('hello')
  const [gender, setGender] = useState('male')

  //   const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
  //     setText(event.target.value)
  //   }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGender(event.target.value)
  }

  const getHtml = () => {
    return { __html: text.replaceAll('\n', '<br>') }
  }
  return (
    <>
      <div>
        {/* <textarea value={text} onChange={handleChange}></textarea>
        <p dangerouslySetInnerHTML={getHtml()}></p> */}
      </div>
      <div>
        <label htmlFor="radio1">男</label>
        <input
          type="radio"
          checked={gender === 'male'}
          name="gender"
          id="radio1"
          value="male"
          onChange={handleChange}
        />
        <label htmlFor="radio2">女</label>
        <input
          type="radio"
          checked={gender === 'female'}
          name="gender"
          id="radio2"
          value="female"
          onChange={handleChange}
        />
      </div>
    </>
  )
}

export default Text
