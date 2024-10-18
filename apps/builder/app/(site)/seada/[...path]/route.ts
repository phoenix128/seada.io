import { NextRequest } from 'next/server';
import route from '@seada.io/builder/spi/seada-files/route';

export const GET = (request: NextRequest) => route(request);
