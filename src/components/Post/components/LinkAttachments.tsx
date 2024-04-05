import Icon from 'components/Icon';
import moment from 'moment';
import { LinkAttachment } from 'queries/post';
import React, { FC } from 'react';
import { ProductEnum } from 'utils/apiService';
import { getItem } from 'utils/persist';

interface ILinkAttachmentsProps {
  attachments: LinkAttachment[];
}

const LinkAttachments: FC<ILinkAttachmentsProps> = ({ attachments }) => {
  const firstAttachment = attachments[0];

  if (!firstAttachment) {
    return null;
  }

  const { url, title } = firstAttachment;

  const isImage = /(?:\.jpg|\.png)$/i.test(title);
  const previewUrl = `${getItem(`${ProductEnum.Learn}RegionUrl`)}/attachments/${
    url.split('/attachments/')[1].split('/')[0]
  }/preview?auth_token=${getItem('uat')}&t=${moment()}`;

  return (
    <div className="flex gap-2">
      <div
        key={firstAttachment._id}
        onClick={() => window.open(previewUrl)}
        className="flex  p-2 rounded-9xl border border-neutral-200 w-[173px] justify-center items-center gap-2 cursor-pointer hover:shadow-lg transition"
      >
        {isImage && (
          <div className="flex w-6 h-6">
            <img src={previewUrl} />
          </div>
        )}
        <Icon name={title.substring(title.lastIndexOf('.') + 1)} />
        <p className="text-xs font-medium max-w-[124px] truncate">
          {title.substring(0, title.lastIndexOf('.'))}
        </p>
      </div>
    </div>
  );
};

export default LinkAttachments;
