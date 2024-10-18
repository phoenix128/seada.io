import type { ReactElement } from 'react';
import React from 'react';
import Builder from '@seada.io/builder/components/Builder';
import getEnvPath from '@seada.io/core/libs/get-env-path';

async function BuilderPage(): Promise<ReactElement> {
    const builderTarget = getEnvPath<string>('builderTarget');

    return <Builder builderTarget={builderTarget} />;
}

export default BuilderPage;
