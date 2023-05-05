import apiService from 'utils/apiService';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

export interface IFile {
  name: string;
  contentType: string;
  type: 'IMAGE' | 'VIDEO';
  altText: 'no image';
  size: string;
  audience: {
    users: [];
    teams: [];
    channels: [];
  };
}

export enum EntityType {
  Post = 'POST',
  Comment = 'COMMENT',
  UserProfileImage = 'USER_PROFILE_IMAGE',
  UserCoverImage = 'USER_COVER_IMAGE',
  OrgLogo = 'ORG_LOGO',
  OrgBanner = 'ORG_BANNER',
  OrgFavicon = 'ORG_FAVICON',
  OrgLoginVideo = 'ORG_LOGIN_VIDEO',
}

interface ICreateFileResponse {
  accessToken: string;
  altText: string;
  audience: Record<string, any>;
  blurhash: string;
  contentType: string;
  createdAt: string;
  createdBy: string;
  entityId: string;
  entityType: string;
  flatpath: string;
  id: string;
  isPublic: boolean;
  name: string;
  size: string;
  type: string;
  uploadId: string;
  uploadUrl: string;
}

export enum UploadStatus {
  YetToStart = 'YET_TO_START',
  Uploading = 'UPLOADING',
  Finished = 'FINISHED',
}

export const useUpload = () => {
  const uploadedMediaListRef = useRef<any[]>([]);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>(
    UploadStatus.YetToStart,
  );
  const [totalMedia, setTotalMedia] = useState<number>(0);
  const chunksize = 1048576 * 8; // 8 MB

  useEffect(() => {
    console.log(uploadedMediaListRef.current.length);
    if (totalMedia === uploadedMediaListRef.current.length) {
      setUploadStatus(UploadStatus.Finished);
    }
  }, [totalMedia, uploadedMediaListRef, setUploadStatus]);

  const createFile = async (
    payload: IFile,
    entityType: EntityType,
    onSuccess: (data: { result: { data: ICreateFileResponse } }) => void,
  ) => {
    const data = await apiService.post(
      `/files?entityType=${entityType}`,
      payload,
    );
    onSuccess(data);
  };

  const uploadToGCP = async (res: ICreateFileResponse, file: any) => {
    const promises = [];
    const totalPartsCount =
      parseInt(res.size) % chunksize === 0
        ? parseInt(res.size) / chunksize
        : Math.floor(parseInt(res.size) / chunksize) + 1;
    const remainingparts = [1];
    for (let i = 0; i < remainingparts.length; i++) {
      const partnumber = remainingparts[i];
      promises.push(
        axios.put(
          `${res.uploadUrl}?partNumber=${partnumber}&uploadId=${res.uploadId}`,
          { data: getChunk(partnumber, file) },
          { headers: { authorization: `Bearer ${res.accessToken}` } },
        ),
      );
    }
    if (promises.length > 0) {
      const promiseResponse = await Promise.allSettled(promises);
      const eTags: { partnumber: any; etag: any }[] = [];
      promiseResponse.forEach((eachPromise) => {
        if (eachPromise.status === 'fulfilled') {
          const partnumber = parseInt(
            (
              new URL((eachPromise as any).value.config.url) as any
            ).searchParams.get('partNumber'),
          ) as any;
          const etag = (eachPromise as any).value.headers.etag;
          eTags.push({ partnumber, etag: etag.replaceAll('"', '').toString() });
        }
      });
      postETags(res.id, { etags: eTags });
    }
  };

  const postETags = async (id: string, etags: any) => {
    const data: any = await apiService.patch(`/files/${id}`, etags);
    uploadedMediaListRef.current.push(data.result.data);
  };

  function getChunk(partNumber: number, file: any) {
    const beginchunk = (partNumber - 1) * chunksize;
    let endchunk = partNumber * chunksize;

    if (endchunk > file.size) {
      endchunk = file.size;
    }

    return file.slice(beginchunk, endchunk);
  }

  const uploadMedia = (fileList: File[], entityType: EntityType) => {
    setUploadStatus(UploadStatus.Uploading);
    const files: IFile[] = [];
    fileList.forEach((file: File) => {
      files.push({
        name: file?.name,
        contentType: file?.type,
        type: 'IMAGE',
        size: file?.size.toString(),
        altText: 'no image',
        audience: {
          users: [],
          teams: [],
          channels: [],
        },
      });
    });
    setTotalMedia(files.length);
    files.forEach((file: IFile, index: number) => {
      createFile(file, entityType, (data) => {
        uploadToGCP(data.result.data, fileList[index]);
      });
    });
  };

  const getUploadedMediaList = () => uploadedMediaListRef.current;

  return { uploadMedia, getUploadedMediaList, uploadStatus };
};
