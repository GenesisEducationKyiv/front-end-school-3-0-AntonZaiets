export const convertGrpcGenresToStrings = (grpcResponse: any): string[] => {
  return grpcResponse.genres || [];
}; 