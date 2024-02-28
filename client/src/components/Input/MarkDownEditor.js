import { Editor } from '@tinymce/tinymce-react'
import React, { memo } from 'react'

const MarkDownEditor = ({ label, value, changeValue, name, inValidFields, setInvalidFields }) => {
    return (
        <div className='flex flex-col'>
            <span>{label}</span>
            <Editor
                apiKey='y4uan3x0gwpemofpoxtkly3g1p21sjyy9qvhcoxzx1hscuva'
                initialValue={value}
                init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'align right alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body {font-family: Helvetica, Arial, sans-serif; font-size: 14px}'
                }}
                onChange={e => changeValue(prev => ({ ...prev, [name]: e.target.getContent() }))}
                onFocus={() => setInvalidFields && setInvalidFields([])}
            />
            {inValidFields?.some(item => item.name === name) && <small className='text-red-500 italic'>{inValidFields?.find(item => item.name === name)?.message}</small>}
        </div>
    )
}

export default memo(MarkDownEditor)