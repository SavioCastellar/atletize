import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from "zod";
import { UTApi } from "uploadthing/server"

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "2MB" } })
    .input(z.object({ athleteName: z.string() }))
    .middleware(async ({ input }) => {
      return { input }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const { athleteName } = metadata.input
      return { athleteName }
    }),

  productUploader: f({ image: { maxFileCount: 6, maxFileSize: '4MB' } })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log(file)
    }),

  idCardPhotoUploader: f({ image: { maxFileCount: 1, maxFileSize: '2MB' } })
    .onUploadComplete(async ({ metadata, file }) => {
      return { file }
    }),

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

export const utapi = new UTApi()
