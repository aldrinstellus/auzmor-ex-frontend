import React, { FC } from 'react';
import { LinkAttachment } from 'queries/post';
import { ProductEnum } from 'utils/apiService';
import { getItem } from 'utils/persist';
import Icon from 'components/Icon';
import moment from 'moment';

interface ILinkAttachmentsProps {
  attachments: LinkAttachment[];
}

const learnBaseUrl =
  getItem(`${ProductEnum.Learn}RegionUrl`) ||
  process.env.REACT_APP_LEARN_BACKEND_BASE_URL;

export const downloadAttachment = (
  attachmentId: string,
  name = 'excel',
  onlyTargetBlank = false,
) => {
  const downloadUrl = `${learnBaseUrl}/attachments/${attachmentId}/download?auth_token=${getItem(
    'uat',
  )}`;
  //@ts-ignore
  if (!window.navigator.msSaveOrOpenBlob && !onlyTargetBlank) {
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', name);
    document.body.appendChild(link);
    link.click();
  } else {
    window.open(downloadUrl, '_blank');
  }
};

const getAuthLearnUrl = (attachmentId: string) =>
  `${learnBaseUrl}/attachments/${attachmentId}/preview?auth_token=${getItem(
    'uat',
  )}&t=${moment()}`;

const isImageRegex = /\.(jpg|png|gif|jpeg)$/i;
const isVideoRegex = /\.(avi|mp4|mov|wmv|mpg|m4v)$/i;
const isExcelRegex = /\.(xlsx|xlsb|xlsm|xls)$/i;
// Regular expression for file documents like ppt, pdf, etc.
const isDocumentRegex = /\.(pdf|doc|docx|ppt|pptx)$/i;

const LinkAttachments: FC<ILinkAttachmentsProps> = ({ attachments }) => {
  const handleAttachmentClick = (each: LinkAttachment) => {
    const attachmentId = each.url.split('/attachments/')[1].split('/')[0];
    const previewUrl = getAuthLearnUrl(attachmentId);

    if (isExcelRegex.test(each.title)) {
      downloadAttachment(
        attachmentId,
        each.title.substring(0, each.title.lastIndexOf('.')),
      );
    } else if (isImageRegex.test(each.title) || isVideoRegex.test(each.title)) {
      window.open(previewUrl, '_blank');
    } else {
      let targetUrl = previewUrl;
      if (isDocumentRegex.test(each.title)) {
        targetUrl =
          'https://docs.google.com/viewer?url=' +
          encodeURIComponent(previewUrl);
      }
      window.open(targetUrl, '_blank'); // others file extension
    }
  };

  return (
    <div className="flex gap-2">
      {attachments.map((each) => (
        <div
          key={each._id}
          onClick={() => handleAttachmentClick(each)}
          className="flex p-2 rounded-9xl border border-neutral-200 w-[173px] items-center gap-2 cursor-pointer hover:shadow-lg transition"
        >
          {(isImageRegex.test(each.title) || isVideoRegex.test(each.title)) && (
            <div className="flex w-6 h-6">
              {isImageRegex.test(each.title) ? (
                <img
                  src={getAuthLearnUrl(each?._id)}
                  alt="attachment preview"
                />
              ) : (
                <video src={getAuthLearnUrl(each?._id)} controls={false} />
              )}
            </div>
          )}
          <Icon
            defaultIcon="defaultDoc"
            name={each.title.substring(each.title.lastIndexOf('.') + 1)}
          />
          <p className="text-xs font-medium max-w-[124px] truncate">
            {each.title.substring(0, each.title.lastIndexOf('.'))}
          </p>
        </div>
      ))}
    </div>
  );
};

export default LinkAttachments;
