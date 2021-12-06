/*
 * Copyright (c) 2021 - present DigitalOcean, LLC
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

// Utilities for supporting the legacy boolean value in type 'type' field for pre-existing providers
// (GCS and S3).

import { StorageKey } from './interface'

export function isWeb(type: string|boolean): boolean {
  return type === true || type === 'web'
}

export function getBucketFromCredentials(type: string|boolean, credentials: StorageKey): string|undefined {
  const buckets = credentials.buckets
  if (!buckets) {
    return undefined
  }
  const key = type === true ? 'web' : type === false ? 'data' : type as string
  return buckets.get(key)
}
