import { NextRequest, NextResponse } from 'next/server';
import { ESeadaObjectType } from '@seada.io/core/spi/seada-pages/interface';
import { profilerWrapperAsync } from '@seada.io/core/libs/profile';
import getStorageAdapter from '@seada.io/builder/service/storage/get-storage-adapter';

const route = async (request: NextRequest) =>
    profilerWrapperAsync(`route:seada[${request.nextUrl.pathname}]`, async () => {
        const pathParts = request.nextUrl.pathname.split('/').splice(2);

        if (pathParts.length < 3) {
            return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
        }

        const [basePath, fileType, ...fileName] = pathParts;

        if (!Object.values(ESeadaObjectType).includes(fileType as ESeadaObjectType)) {
            return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
        }

        const adapter = getStorageAdapter('objects');
        const data = await adapter.readObject(basePath, fileType as ESeadaObjectType, fileName.join('/'));

        return NextResponse.json(data);
    });

export default route;
