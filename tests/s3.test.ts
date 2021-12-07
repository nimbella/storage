import provider, { NimS3Client } from '@nimbella/storage/providers/s3'
import { StorageKey } from '@nimbella/storage/providers/interface'
import {S3RemoteFile} from '../src/providers/s3'
import {S3Client} from '@aws-sdk/client-s3'

describe('test prepareCredentials method', () => {
  test('should return credentials instance from input parameters', () => {
    const params: StorageKey = { provider: '@nimbella/storage-s3' }
    const creds = provider.prepareCredentials(params)
    expect(creds).toEqual(params)
  })
})

describe('test getClient method', () => {
  const apiHost = 'https://api.nimbella.com'
  const namespace = 'my_namespace'
  const endpoint = 'https://region.s3.aws.com'
  const buckets = new Map()
  const expectedBucketName = 'someBucketName'
  buckets.set('build', expectedBucketName)

  test('should return client for web bucket', () => {
    const web = true
    const client = provider.getClient(namespace, apiHost, web, { endpoint }) as NimS3Client
    expect(client.getBucketName()).toEqual(`${namespace}-api-nimbella-io`)
  })
  test('should return client for legacy data bucket', () => {
    const web = false
    const client = provider.getClient(namespace, apiHost, web, { endpoint }) as NimS3Client
    expect(client.getBucketName()).toEqual(`data-${namespace}-api-nimbella-io`)
  })
  test('should return client for named bucket', () => {
    const type = 'build'
    const client = provider.getClient(namespace, apiHost, type, { endpoint, buckets }) as NimS3Client
    expect(client.getBucketName()).toEqual(expectedBucketName)
  })
})

describe('test file.exists() method', () => {
  test('should return true if file exists', async () => {
    const client = { send: async () => ({ storageClass: null, ContentLength: null, etag: null }) }
    const file = new S3RemoteFile((client as unknown) as S3Client, '', '', false)
    expect(await file.exists()).toBeTruthy()
  })
  test('should return false if file does not exist', async () => {
    class ServiceError extends Error {
      "$metadata": {}
    }
    const client = {
      send: async () => {
        const err = new ServiceError('Missing file')
        err["$metadata"] = { httpStatusCode: 404 }
        throw err
      } 
    }
    const file = new S3RemoteFile((client as unknown) as S3Client, '', '', false)
    expect(await file.exists()).toBeFalsy()
  })
  test('should throw error otherwise', async () => {
    class ServiceError extends Error {
      "$metadata": {}
    }
    const client = {
      send: async () => {
        const err = new ServiceError('Some error message')
        err["$metadata"] = { httpStatusCode: 500 }
        throw err
      } 
    }
    const file = new S3RemoteFile((client as unknown) as S3Client, '', '', false)
    return expect(file.exists()).rejects.toThrow('Some error message');
  })
})
