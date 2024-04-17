import Icon from 'components/Icon';
import React, { FC, useState } from 'react';
import { getIconName } from './Doc';

type Appprops = {
  data?: any;
  fileThumbnailUrl?: string;
  fileUrl?: string;
  id?: string;
  name?: string;
  mimeType?: string;
  size?: string;
};

const DocSearchRow: FC<Appprops> = ({ data }) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>(
    data?.fileThumbnailUrl,
  );
  const iconName = getIconName(data?.raw?.mimeType);
  const onError = () => setImgSrc('');

  return (
    <div
      className=" flex items-center hover:bg-primary-50 w-full h-12  cursor-pointer gap-4"
      onClick={() => {
        window.open(data?.raw?.fileUrl, '_blank');
      }}
    >
      {imgSrc ? (
        <>
          <img src={imgSrc} onError={onError} />
          <div className="text-sm bold text-neutral-950 ">
            {data?.raw?.name}
          </div>
        </>
      ) : (
        <div className="flex gap-2">
          <Icon name={iconName || 'doc'} size={20} />
          <div className="text-sm bold text-neutral-950 ">
            {data?.raw?.name}
          </div>
        </div>
      )}
    </div>
  );
};

export default DocSearchRow;
