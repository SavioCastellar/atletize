'use server'

import { utapi } from '@/app/api/uploadthing/core'

export async function deleteImagesOnServer(imageKeys: string[]) {
  try {
    await utapi.deleteFiles(imageKeys)
    return { success: true }
  } catch (error) {
    console.error('Error deleting images:', error)
    throw new Error('Failed to delete images')
  }
}
