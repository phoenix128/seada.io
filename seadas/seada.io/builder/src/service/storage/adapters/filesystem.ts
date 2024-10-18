import yaml from 'js-yaml';
import { ESeadaObjectType } from '@seada.io/core/spi/seada-pages/interface';
import path from 'node:path';
import getEnvPath from '@seada.io/core/libs/get-env-path';
import fs from 'fs';
import { mkdir } from 'fs/promises';
import { IStorageAdapter, IStorageAdapterConstructor, IStorageEntry } from '@seada.io/builder/service/interface';
import getJsonSchemaFile from '@seada.io/core-schema/spi/schema/get-json-schema-file';

class FilesystemAdapter implements IStorageAdapter {
    constructor(private storageType: string) {}

    public async readObject<TData = any>(
        basePath: string,
        objectType: ESeadaObjectType,
        fileName: string
    ): Promise<TData> {
        const filePath = this.getObjectPath(basePath, objectType, fileName) + '.yml';
        const data = await this.rawRead(filePath);
        return yaml.load(data.toString()) as TData;
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
        const filePath = this.getFullFileName(fileName);
        return fs.readFileSync(filePath);
    }

    public async rawWrite(fileName: string, data: Buffer) {
        const filePath = this.getFullFileName(fileName);
        const dirPath = path.dirname(filePath);
        await mkdir(dirPath, { recursive: true });
        fs.writeFileSync(filePath, data);
    }

    public async rawDelete(fileName: string): Promise<void> {
        const filePath = this.getFullFileName(fileName);
        fs.unlinkSync(filePath);
    }

    public async rawList(subPath: string): Promise<IStorageEntry[]> {
        const filteredSubPath = subPath.replace(/\.{2}/, '');
        const filePath = path.join(this.getBasePath(), filteredSubPath).replace(/\\/g, '/');
        const files = fs.readdirSync(filePath);

        return files.map((fileName) => {
            return {
                fileName: path.join(filteredSubPath, fileName).replace(/\\/g, '/').replace(/^\//, ''),
                url: `${this.getBaseUrl()}/${filteredSubPath}/${fileName}`,
            };
        });
    }

    public async getEntry(fileName: string): Promise<IStorageEntry> {
        const filePath = path.join(this.getBasePath(), fileName);
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${fileName}`);
        }

        return {
            fileName,
            url: `${this.getBaseUrl()}/${fileName}`,
        };
    }

    private getObjectPath(basePath: string, objectType: ESeadaObjectType, fileCode: string): string {
        return path.join(basePath, objectType, fileCode);
    }

    private getFullFileName(fileName: string): string {
        return path.join(this.getBasePath(), fileName);
    }

    private getBasePath(): string {
        const storageFilesystemPath = getEnvPath<string>(`storage.${this.storageType}.path`, 'storage');
        return path.join(process.cwd(), storageFilesystemPath);
    }

    private getBaseUrl(): string {
        return getEnvPath<string>(`storage.${this.storageType}.url`, '');
    }
}

/**
 * Filesystem adapter constructor
 * @param storageType
 */
const filesystemAdapterConstructor: IStorageAdapterConstructor = (storageType: string): IStorageAdapter => {
    return new FilesystemAdapter(storageType);
};

export default filesystemAdapterConstructor;
