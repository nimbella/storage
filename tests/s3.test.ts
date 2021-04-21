import provider, { NimS3Client } from '../src/providers/s3'
import { StorageKey } from '../src/providers/interface'

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

  test('should return client for web bucket', () => {
    const web = true
    const client = provider.getClient(namespace, apiHost, web, { endpoint }) as NimS3Client
    expect(client.getBucketName()).toEqual(`${namespace}-api-nimbella-io`)
  })
  test('should return client for non-web bucket', () => {
    const web = false
    const client = provider.getClient(namespace, apiHost, web, { endpoint }) as NimS3Client
    expect(client.getBucketName()).toEqual(`data-${namespace}-api-nimbella-io`)
  })
})
