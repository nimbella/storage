import { getStorageProvider } from '@nimbella/storage/index'

describe('test getStorageProvider method', () => {
  test('should return AWS S3 storage provider from id', () => {
    const id = '@nimbella/storage-s3'
    const sp = getStorageProvider(id)
    expect(sp.identifier).toEqual(id)
  })
  test('should return GCS storage provider from id', () => {
    const id = '@nimbella/storage-gcs'
    const sp = getStorageProvider(id)
    expect(sp.identifier).toEqual(id)
  })
  test('should throw error for unknown storage provider from id', () => {
    const id = '@nimbella/storage-unknown'
    expect(() => getStorageProvider(id)).toThrow(`Unable to find storage provider with id: ${id}`)
  })
})
