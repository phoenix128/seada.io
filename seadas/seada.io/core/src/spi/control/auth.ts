import { NextRequest, NextResponse } from 'next/server';
import getEnvPath from '@seada.io/core/libs/get-env-path';

const auth = (request: NextRequest): NextResponse => {
    const { headers } = request;

    const seadaControlAuth = headers.get('X-Seada-Control-Auth');

    // TODO: Make this more secure
    if (seadaControlAuth === getEnvPath('controlSharedSecret')) {
        return NextResponse.next();
    }

    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
};

export default auth;
