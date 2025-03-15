interface DataFromServer {
    success: boolean;
    firstYearProjection: number;
    totalPriceImpact: number;
    totalVolumeImpact: number;
    totalMixImpact: number;
    secondYearProjection: number;
}

let dataFromServer: DataFromServer | null = null;

export const setGlobalResponseData = (data: DataFromServer) => {
    dataFromServer = data;
};

export const getGlobalResponseData = () => {
    return dataFromServer;
};
