import {
  GetAllGenresRequest,
  GetAllGenresResponse,
  GetAllTracksRequest,
  GetAllTracksResponse,
  GetTrackBySlugRequest,
  GetTrackBySlugResponse,
  CreateTrackRequest,
  CreateTrackResponse,
  UpdateTrackRequest,
  UpdateTrackResponse,
  DeleteTrackRequest,
  DeleteTrackResponse,
  DeleteMultipleTracksRequest,
  DeleteMultipleTracksResponse,
  UploadTrackFileRequest,
  UploadTrackFileResponse,
  DeleteTrackFileRequest,
  DeleteTrackFileResponse,
} from '../types';
import {
  GRPC_SERVICES,
  GRPC_METHODS,
  DEFAULT_GRPC_HOST,
  GRPC_HEADERS,
} from '../constants';

export class MusicServiceClient {
  private host: string;

  constructor(host: string = DEFAULT_GRPC_HOST) {
    this.host = host;
  }

  private async makeGrpcWebRequest<T>(
    service: string,
    method: string,
    request: any
  ): Promise<T> {
    const url = `${this.host}/${service}/${method}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: GRPC_HEADERS,
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`gRPC request failed: ${response.statusText}`);
    }

    return response.json();
  }

  async getAllGenres(
    request: GetAllGenresRequest
  ): Promise<GetAllGenresResponse> {
    return this.makeGrpcWebRequest<GetAllGenresResponse>(
      GRPC_SERVICES.GENRE_SERVICE,
      GRPC_METHODS.GENRE.GET_ALL_GENRES,
      request
    );
  }

  async getAllTracks(
    request: GetAllTracksRequest
  ): Promise<GetAllTracksResponse> {
    return this.makeGrpcWebRequest<GetAllTracksResponse>(
      GRPC_SERVICES.TRACK_SERVICE,
      GRPC_METHODS.TRACK.GET_ALL_TRACKS,
      request
    );
  }

  async getTrackBySlug(
    request: GetTrackBySlugRequest
  ): Promise<GetTrackBySlugResponse> {
    return this.makeGrpcWebRequest<GetTrackBySlugResponse>(
      GRPC_SERVICES.TRACK_SERVICE,
      GRPC_METHODS.TRACK.GET_TRACK_BY_SLUG,
      request
    );
  }

  async createTrack(request: CreateTrackRequest): Promise<CreateTrackResponse> {
    return this.makeGrpcWebRequest<CreateTrackResponse>(
      GRPC_SERVICES.TRACK_SERVICE,
      GRPC_METHODS.TRACK.CREATE_TRACK,
      request
    );
  }

  async updateTrack(request: UpdateTrackRequest): Promise<UpdateTrackResponse> {
    return this.makeGrpcWebRequest<UpdateTrackResponse>(
      GRPC_SERVICES.TRACK_SERVICE,
      GRPC_METHODS.TRACK.UPDATE_TRACK,
      request
    );
  }

  async deleteTrack(request: DeleteTrackRequest): Promise<DeleteTrackResponse> {
    return this.makeGrpcWebRequest<DeleteTrackResponse>(
      GRPC_SERVICES.TRACK_SERVICE,
      GRPC_METHODS.TRACK.DELETE_TRACK,
      request
    );
  }

  async deleteMultipleTracks(
    request: DeleteMultipleTracksRequest
  ): Promise<DeleteMultipleTracksResponse> {
    return this.makeGrpcWebRequest<DeleteMultipleTracksResponse>(
      GRPC_SERVICES.TRACK_SERVICE,
      GRPC_METHODS.TRACK.DELETE_MULTIPLE_TRACKS,
      request
    );
  }

  async uploadTrackFile(
    request: UploadTrackFileRequest
  ): Promise<UploadTrackFileResponse> {
    return this.makeGrpcWebRequest<UploadTrackFileResponse>(
      GRPC_SERVICES.TRACK_SERVICE,
      GRPC_METHODS.TRACK.UPLOAD_TRACK_FILE,
      request
    );
  }

  async deleteTrackFile(
    request: DeleteTrackFileRequest
  ): Promise<DeleteTrackFileResponse> {
    return this.makeGrpcWebRequest<DeleteTrackFileResponse>(
      GRPC_SERVICES.TRACK_SERVICE,
      GRPC_METHODS.TRACK.DELETE_TRACK_FILE,
      request
    );
  }
}
