"use client";

import { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import type { Editor as TinyMCEEditor } from 'tinymce';
import { Button } from './button';
import { setBannerContent } from '@/actions/banner';

export default function TextEditor({ heroContent }: { heroContent: string }) {
  const [isMounted, setIsMounted] = useState(false);
  const [updating, setUpdating] = useState(false);
  const editorRef = useRef<TinyMCEEditor | null>(null);
  async function uploadHeroContent() {
    setUpdating(true);
    try {
      if (editorRef.current) {
        const content = editorRef.current.getContent();
        await setBannerContent(content);
      }
    } catch (error) {

    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, [])

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
        onInit={(_evt, editor: TinyMCEEditor) => editorRef.current = editor}
        initialValue={heroContent || "Please Update your hero content"}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      <Button className='w-full mt-2 bg-blue-500 hover:bg-blue-600' disabled={updating} onClick={uploadHeroContent}>Update Hero Content</Button>
    </>
  );
}