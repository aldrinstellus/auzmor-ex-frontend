import { getBlobUrl } from 'utils/misc';
import { IMedia } from '..';

export const extraMedia = (file: File): any => {
  return {
    ...file,
    altText: 'No image',
    blurhash: '',
    contentType: file.type,
    id: '',
    name: file.name,
    original: getBlobUrl(file),
    size: file.size.toString(),
    thumbnailUrl: '',
    small: '',
    medium: '',
    large: '',
  } as unknown as IMedia;
};
