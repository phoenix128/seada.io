// This file is generated by Seada.io. Do not edit manually!
// @ts-nocheck

import * as __seada__seada_io_source_builder_service_storage_get_storage_adapter__ from "@seada.io.source/builder/service/storage/get-storage-adapter";
import * as __seada__seada_io_builder_service_storage_adapters_filesystem__ from "@seada.io/builder/service/storage/adapters/filesystem";
import * as __seada__seada_io_builder_service_storage_adapters_vercel_blob__ from "@seada.io/builder/service/storage/adapters/vercel-blob";
import { IStorageAdapter, IStorageAdapterConstructor } from "@seada.io/builder/service/interface";
import getEnvPath from "@seada.io/core/libs/get-env-path";

export default function getStorageAdapter(storageType: string, adapters?: Record<string, IStorageAdapterConstructor>): IStorageAdapter {
    const __seada__adapters = adapters ?? {'filesystem': __seada__seada_io_builder_service_storage_adapters_filesystem__.default, 'vercel-blob': __seada__seada_io_builder_service_storage_adapters_vercel_blob__.default};
    return __seada__seada_io_source_builder_service_storage_get_storage_adapter__.default(storageType, __seada__adapters);
}
