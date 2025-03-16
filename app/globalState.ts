interface DataFromServer {
    success: boolean;
    firstYearProjection: number;
    totalPriceImpact: number;
    totalVolumeImpact: number;
    totalMixImpact: number;
    secondYearProjection: number;
}

// For PVA results
let dataFromServer: DataFromServer | null = null;

// For file handling
let globalFile: File | null = null;

// For schema generation
let globalSchema: string | null = null;

export const setGlobalResponseData = (data: DataFromServer) => {
    dataFromServer = data;
};

export const getGlobalResponseData = () => {
    return dataFromServer;
};

export const setGlobalFile = (file: File) => {
    globalFile = file;
};

export const getGlobalFile = () => {
    return globalFile;
};

export const setGlobalSchema = (schema: string) => {
    globalSchema = schema;
};

export const getGlobalSchema = () => {
    return globalSchema;
};