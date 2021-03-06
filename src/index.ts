/*
 * Copyright (c) 2019 - present Nimbella Corp.
 *
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { StorageProvider } from './providers/interface'

import s3StorageProvider from './providers/s3'
import gcsStorageProvider from './providers/gcs'

const providers: Map<string, StorageProvider> = new Map([
  [s3StorageProvider.identifier, s3StorageProvider],
  [gcsStorageProvider.identifier, gcsStorageProvider]
])

export function getStorageProvider(providerId: string): StorageProvider {
  const provider = providers.get(providerId)

  if (!provider) {
    throw new Error(`Unable to find storage provider with id: ${providerId}`)
  }

  return provider
}

export * from './providers/interface'
export { StorageClient } from './providers/interface'
