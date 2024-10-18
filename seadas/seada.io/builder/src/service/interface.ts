import { ESeadaObjectType } from '@seada.io/core/spi/seada-pages/interface';

export interface IStorageReadAdapter {
    <TData = any>(basePath: string, fileType: ESeadaObjectType, fileName: string): Promise<TData>;
}

export interface IStorageWriteAdapter {
    <TData = any>(basePath: string, fileType: ESeadaObjectType, fileName: string, content: TData): Promise<void>;
}

export interface IStorageDeleteAdapter {
    (basePath: string, fileType: ESeadaObjectType, fileName: string): Promise<void>;
}

export interface IStorageRawReadAdapter {
    (fileName: string): Promise<Buffer>;
}

export interface IStorageRawWriteAdapter {
    (fileName: string, content: Buffer): Promise<void>;
}

export interface IStorageRawDeleteAdapter {
    (fileName: string): Promise<void>;
}

export interface IStorageGetEntryAdapter {
    (subPath: string): Promise<IStorageEntry>;
}

export interface IStorageRawListAdapter {
    (subPath: string): Promise<IStorageEntry[]>;
}

export interface IStorageEntry {
    fileName: string;
    url: string;
}

export interface IStorageAdapter {
    readObject: IStorageReadAdapter;
    writeObject: IStorageWriteAdapter;
    deleteObject: IStorageDeleteAdapter;

    getEntry: IStorageGetEntryAdapter;
    rawRead: IStorageRawReadAdapter;
    rawWrite: IStorageRawWriteAdapter;
    rawDelete: IStorageRawDeleteAdapter;

    rawList: IStorageRawListAdapter;
}

export interface IStorageAdapterConstructor {
    (storageType: string): IStorageAdapter;
}
