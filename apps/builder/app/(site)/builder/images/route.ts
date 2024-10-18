import { NextRequest } from 'next/server';
import uploadImage from '@seada.io/builder/spi/images/upload-image';

export const POST = (request: NextRequest) => uploadImage(request);
