'use server';

import mime from 'mime';
import { v4 as uuidv4 } from 'uuid';
import getStorageAdapter from '@seada.io/builder/service/storage/get-storage-adapter';
import { NextRequest, NextResponse } from 'next/server';

const uploadImage = async (req: NextRequest) => {
    const formData = await req.formData();
    const files = formData.getAll('image');
    const fileNames: string[] = [];

    for (const file of files) {
        if (!file || !(file instanceof Blob)) {
            continue;
        }

        try {
            const storageAdapter = getStorageAdapter('images');
            const buffer = Buffer.from(await file.arrayBuffer());

            const uniqueSuffix = uuidv4();
            const filename = `${file.name.replace(/\.[^/.]+$/, '')}-${uniqueSuffix}.${mime.getExtension(file.type)}`;

            await storageAdapter.rawWrite(filename, buffer);
            fileNames.push(filename);
        } catch (e) {
            console.error(e);
        }
    }

    return NextResponse.json({
        fileNames,
    });
};

export default uploadImage;
