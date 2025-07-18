type GrpcGenresResponse = {
  genres?: string[];
};

export const convertGrpcGenresToStrings = (
  grpcResponse: GrpcGenresResponse
): string[] => {
  return grpcResponse.genres ?? [];
};
