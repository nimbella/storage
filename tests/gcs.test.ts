import provider from '../src/providers/gcs'

const project_id = 'some_project_id'
const private_key = 'THISISMYPRIVATEKEY'
const client_email = 'user@host.com'

describe('test prepareCredentials method', () => {
  test('should return credentials instance from input parameters', () => {
    const creds = provider.prepareCredentials({ client_email, private_key, project_id })
    expect(creds).toEqual({ credentials: { client_email, private_key }, project_id, provider: '@nimbella/storage-gcs' })
  })
})

describe('test getClient method', () => {
  const apiHost = 'https://api.nimbella.com'
  const namespace = 'my_namespace'

  test('should return client for web bucket', () => {
    const web = true
    const client = provider.getClient(namespace, apiHost, web, { client_email, private_key, project_id })
    expect(client.getImplementation().id).toEqual(`${namespace}-api-nimbella-com`)
  })
  test('should return client for non-web bucket', () => {
    const web = false
    const client = provider.getClient(namespace, apiHost, web, { client_email, private_key, project_id })
    expect(client.getImplementation().id).toEqual(`data-${namespace}-api-nimbella-com`)
  })
})
