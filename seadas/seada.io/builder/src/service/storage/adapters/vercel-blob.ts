import yaml from 'js-yaml';
import { ESeadaObjectType } from '@seada.io/core/spi/seada-pages/interface';
import path from 'node:path';
import getEnvPath from '@seada.io/core/libs/get-env-path';
import { IStorageAdapter, IStorageAdapterConstructor, IStorageEntry } from '@seada.io/builder/service/interface';
import getJsonSchemaFile from '@seada.io/core-schema/spi/schema/get-json-schema-file';
import { del, list, ListBlobResultBlob, put } from '@vercel/blob';
import { profilerWrapperAsync } from '@seada.io/core/libs/profile';
import { revalidateTag } from 'next/cache';

class VercelBlobAdapter implements IStorageAdapter {
    constructor(private storageType: string) {}

    public async readObject<TData = any>(
        basePath: string,
        objectType: ESeadaObjectType,
        fileName: string
    ): Promise<TData> {
        return profilerWrapperAsync(`readObject:${basePath}:${objectType}:${fileName}`, async () => {
            const filePath = this.getObjectPath(basePath, objectType, fileName) + '.yml';
            const data = await this.rawRead(filePath);
            return yaml.load(data.toString()) as TData;
        });
    }

    public async writeObject<TData = any>(
        basePath: string,
        objectType: ESeadaObjectType,
        fileName: string,
        obj: TData
    ) {
        const filePath = this.getObjectPath(basePath, objectType, fileName) + '.yml';
        const schemaPrefix = `# yaml-language-server: $schema=${getJsonSchemaFile(filePath, objectType)}\n\n`;

        const data = yaml.dump(obj, { indent: 2 });
        await this.rawWrite(filePath, Buffer.from(schemaPrefix + data));
    }

    public async deleteObject(basePath: string, objectType: ESeadaObjectType, fileName: string): Promise<void> {
        const filePath = this.getObjectPath(basePath, objectType, fileName) + '.yml';
        await this.rawDelete(filePath);
    }

    public async rawRead(fileName: string): Promise<Buffer> {
        return profilerWrapperAsync(`rawRead:${fileName}`, async () => {
            const filePath = this.getFullFileName(fileName);
            const blob = await this.getBlobByPath(filePath);
            if (!blob) return Buffer.from('');

            const { url } = blob;
            const response = await fetch(url, {
                cache: 'force-cache',
                next: {
                    tags: [`vercel-blob:${fileName}`],
                },
            } as RequestInit);
            return Buffer.from(await response.arrayBuffer());
        });
    }

    public async rawWrite(fileName: string, data: Buffer) {
        const filePath = this.getFullFileName(fileName);
        await put(filePath, data, {
            access: 'public',
            cacheControlMaxAge: 0,
            addRandomSuffix: false,
        });
        revalidateTag(`vercel-blob:${fileName}`);
    }

    public async rawDelete(fileName: string): Promise<void> {
        const filePath = this.getFullFileName(fileName);
        const blob = await this.getBlobByPath(filePath);
        await del(blob.url);
        revalidateTag(`vercel-blob:${fileName}`);
    }

    public async rawList(subPath: string): Promise<IStorageEntry[]> {
        const searchPath = path.join(this.getBasePath(), subPath).replace(/\\/g, '/');
        const { blobs } = await list({ mode: 'expanded', prefix: searchPath });

        return blobs.map((blob) => ({
            fileName: blob.pathname.slice(searchPath.length),
            url: blob.url,
        }));
    }

    public async getEntry(fileName: string): Promise<IStorageEntry> {
        const filePath = this.getFullFileName(fileName);
        const blob = await this.getBlobByPath(filePath);
        if (!blob) {
            throw new Error(`File not found: ${fileName}`);
        }

        return {
            fileName: blob.pathname,
            url: blob.url,
        };
    }

    private async getBlobByPath(filePath: string): Promise<ListBlobResultBlob | null> {
        const searchPath = filePath.replace(/\\/g, '/');
        const searchPrefix = path.dirname(searchPath);
        const { blobs } = await list({ mode: 'expanded', prefix: searchPrefix });
        const blob = blobs.find((blob) => blob.pathname === searchPath);

        return blob || null;
    }

    private getObjectPath(basePath: string, objectType: ESeadaObjectType, fileCode: string): string {
        return `${basePath}/${objectType}/${fileCode}`;
    }

    private getFullFileName(fileName: string): string {
        return path.join(this.getBasePath(), fileName).replace(/\\/g, '/');
    }

    private getBasePath(): string {
        return getEnvPath<string>(`storage.${this.storageType}.path`, 'storage');
    }
}

/**
 * Filesystem adapter constructor
 * @param storageType
 */
const vercelBlobAdapterConstructor: IStorageAdapterConstructor = (storageType: string): IStorageAdapter => {
    return new VercelBlobAdapter(storageType);
};

export default vercelBlobAdapterConstructor;
