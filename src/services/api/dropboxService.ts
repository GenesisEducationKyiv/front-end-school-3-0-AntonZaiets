import { Dropbox } from 'dropbox';
import { env } from '../../../config/config.ts';

const dbx = new Dropbox({ accessToken: env.ACCESS_TOKEN });

export const uploadFile = async (file: File, path: string) => {
  const contents = await file.arrayBuffer();
  const res = await dbx.filesUpload({
    path: `/${path}`,
    contents,
    mode: 'overwrite',
  });
  return res;
};

export const deleteFile = async (path: string) => {
  return await dbx.filesDeleteV2({ path: `/${path}` });
};

export const getTemporaryLink = async (path: string) => {
  const res = await dbx.filesGetTemporaryLink({ path: `/${path}` });
  return res.result.link;
};
