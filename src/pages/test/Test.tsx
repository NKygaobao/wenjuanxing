import React, { ChangeEvent, FC, useState } from 'react'

const Text: FC = () => {
    const [text, setText] = useState('hello')

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value)
    }
    return <>
        <p></p>
        <div>
            <textarea value={text} onChange={handleChange}></textarea>
            {text.replaceAll('\n', '<br>')}
        </div>
    </>
}

export default Text