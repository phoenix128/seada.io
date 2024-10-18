export interface ISourceSetup {
    (sourceId: string): Promise<Record<string, string>>;
}

export type ISourceSetupCollection = Record<string, ISourceSetup>;
