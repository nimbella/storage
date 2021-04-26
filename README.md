# Nimbella Storage Providers for Node.js

A Node.js library to interact with [`nimbella.com`](https://nimbella.com) storage services. 
For more information on how to use the storage services, please see the [documentation](https://docs.nimbella.com/file-stores). 

This library is automatically exposed via the [Nimbella SDK for Node.js](https://github.com/nimbella/nimbella-sdk-nodejs). It is not intended to be used directly.

## Storage Providers

The following storage providers are currently supported:

- [AWS S3](https://aws.amazon.com/s3/) - ([source code](./src/providers/s3.ts))
- [GCP GCS](https://cloud.google.com/storage/) - ([source code](./src/providers/gcs.ts))

## API

```javascript
export function getStorageProvider(providerId: string): StorageProvider
```

Factory function to return the storage client for a provider. The `providerId` key is available from a runtime environment variable (`__NIM_STORAGE_KEY`). If a provider cannot be found for the key - an error is thrown.

## Development

### Building

```
npm run build
```

[esbuild](https://esbuild.github.io/) is used to produce the compiled version of the library for publishing. It is orders of magnitude faster that the native TS compiler or other build tools.

esbuild [uses JS files](https://esbuild.github.io/getting-started/#build-scripts) to configure the build system - rather than a JSON file. This project's configuration resides in [esbuild.config.js](./esbuild.config.js). It produces a single bundled and minified version of the library (with source maps) under the `lib` directory. 

esbuild [does not](https://esbuild.github.io/content-types/#typescript) check TS's types during build or produce types definition files. This is handled by running the normal TS compiler with the `emitDeclarationOnly` flag during the production build.

### Testing

```
npm test
```

This command will execute a very basic high-level set of unit tests for the factory function and each provider. It just tests the correct storage providers are returned for the storage key. It runs against the TS source files located in `src`.

There is also a command to run the tests against the built-version of the library (to ensure the compilation process didn't introduce any issues).

```
npm run test:built
```

This command uses a custom TS config file (`tsconfig.test.json`) to override the default "paths" configuration to load the built-version of the library in the tests.

## Support

We're always happy to help you with any issues you encounter. You may want to [join our Slack community](https://nimbella-community.slack.com/) to engage with us for a more rapid response.

## License

Apache-2.0. See [LICENSE](LICENSE) to learn more.
