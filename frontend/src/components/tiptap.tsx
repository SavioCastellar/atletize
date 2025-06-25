'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Toggle } from './ui/toggle'
import { Bold, Italic, List, ListOrdered, Strikethrough } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { Placeholder } from '@tiptap/extension-placeholder'
import { useEffect } from 'react'

type TiptapProps = {
  value: string
  placeholder: string
  valueDB: string
}

const Tiptap = ({ value, placeholder, valueDB }: TiptapProps) => {
  const { setValue } = useFormContext()
  const editor = useEditor({
    extensions: [
      Placeholder.configure({
        placeholder,
        emptyEditorClass:
          `text-muted-foreground/70 cursor-text before:content-[attr(data-placeholder)] before:absolute before:top-3 before:left-3 before:text-mauve-11 before-pointer-events-none`,
      }),
      StarterKit.configure({
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal pl-4'
          }
        },
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc pl-4'
          }
        },
      })
    ],
    onUpdate: ({ editor }) => {
      const content = editor.getHTML()
      setValue('description', content, {
        shouldValidate: true,
        shouldDirty: true,
      })
    },
    content: value,
    editorProps: {
      attributes: {
        class: `min-h-[80px] w-full rounded-md border border-input ${(value === valueDB && valueDB.length > 0) ? 'text-muted-foreground/70 bg-slate-100 opacity-60' : 'text-foreground bg-white'} px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`,
      },
    },
  })

  useEffect(() => {
    if (editor?.isEmpty) {
      editor.commands.setContent(value)
    }
  }, [value])

  return (
    <div className='flex flex-col gap-2'>
      {editor && (
        <div className='border-input border rounded-md'>
          <Toggle
            pressed={editor.isActive('bold')}
            onPressedChange={() => editor.chain().focus().toggleBold().run()}
            size={'sm'}
          >
            <Bold size={14} />
          </Toggle>
          <Toggle
            pressed={editor.isActive('italic')}
            onPressedChange={() => editor.chain().focus().toggleItalic().run()}
            size={'sm'}
          >
            <Italic size={14} />
          </Toggle>
          <Toggle
            pressed={editor.isActive('strike')}
            onPressedChange={() => editor.chain().focus().toggleStrike().run()}
            size={'sm'}
          >
            <Strikethrough size={14} />
          </Toggle>
          <Toggle
            pressed={editor.isActive('orderedList')}
            onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
            size={'sm'}
          >
            <ListOrdered size={14} />
          </Toggle>
          <Toggle
            pressed={editor.isActive('bulletList')}
            onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
            size={'sm'}
          >
            <List size={14} />
          </Toggle>
        </div>
      )}
      <EditorContent editor={editor} />
    </div>
  )
}

export default Tiptap
