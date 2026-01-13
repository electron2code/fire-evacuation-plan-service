"use client";

import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import type { DropFile } from './hero-slider';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Trash } from 'lucide-react';

export default function DropzoneComponent({ dropFile, setDropFile }: { dropFile: DropFile | null, setDropFile: React.Dispatch<React.SetStateAction<DropFile | null>> }) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setDropFile({
        id: uuidv4(),
        file,
        uploading: false,
        progress: 0,
        isDeleting: false,
        error: false,
        objectUrl: URL.createObjectURL(file),
      });
    }
  }, [])

  const onDropRejected = useCallback((rejectedFiles: File[]) => {
    const toManyFiles = rejectedFiles.length > 1;
    const fileTooLarge = rejectedFiles[0]?.errors[0]?.code === 'file-too-large';
    if (toManyFiles) {
      toast.error("Please upload only one file at a time.");
    }
    if (fileTooLarge) {
      toast.error("File size exceeds 5MB limit.");
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    multiple: false,
    accept: {
      'image/*': []
    },
    maxFiles: 1,
    maxSize: 1024 * 1024 * 5, // 5 MB
  })
  // console.log('dropFile', dropFile);
  return (
    <div {...getRootProps()} className='h-full min-h-80 bg-gray-300 dark:bg-black/50 dark:text-gray-100 p-2'>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p className='text-center text-primary/70'>Drop the file here ...</p> :
          !isDragActive && dropFile ? (
            <div className='h-full w-full relative z-5'>
              <Image src={dropFile.objectUrl!} alt="Uploaded Image" className="w-full h-full
                object-contain" width={200} height={300} />
              <div className='absolute top-0 right-0'>
                <Button disabled={dropFile.uploading} title='Cancel Upload' className='rounded-full cursor-pointer' variant="destructive" size="icon" onClick={(e) => {
                  e.stopPropagation();
                  if (dropFile.objectUrl) {
                    URL.revokeObjectURL(dropFile.objectUrl);
                  }
                  setDropFile(null);
                }}>
                  <Trash className='size-4' />
                </Button>
              </div>
              {
                dropFile.uploading && (
                  <div className='absolute bottom-2 left-2 w-full'>
                    <div className='w-full bg-gray-400 h-2 rounded'>
                      <div className='bg-blue-600 h-2 rounded' style={{ width: `${dropFile.progress}%` }}></div>
                    </div>
                  </div>
                )
              }
            </div>
          ) : (
            <div className='flex flex-col min-h-80 items-center justify-center gap-2'>
              <p className='mb-2 text-center text-gray-600'>Drag 'n' drop an image here, or click to select one maxium of 5MB</p>
              <Button className='cursor-pointer' variant="outline">Browse Files</Button>
            </div>
          )
      }
    </div>
  )
}