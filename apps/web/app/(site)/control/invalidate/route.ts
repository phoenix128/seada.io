import { NextRequest, NextResponse } from 'next/server';
import invalidateCacheKey from '@seada.io/core/spi/cache/invalidate-cache-key';

export const POST = async (request: NextRequest) => {
    const { keys } = (await request.json()) as { keys: string[] };

    if (!keys || !Array.isArray(keys)) {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    await invalidateCacheKey(keys);

    return NextResponse.json({
        invalidated: keys,
    });
};
