import { NextRequest, NextResponse } from 'next/server';
import auth from '@seada.io/core/spi/control/auth';

const middleware = (request: NextRequest): NextResponse => {
    const { nextUrl } = request;

    if (nextUrl.pathname.startsWith('/control/')) {
        return auth(request);
    }

    return NextResponse.next();
};

export default middleware;
