import Button, { Size, Variant } from "components/Button";
import Icon from "components/Icon";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface AddLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (linkText: string, url: string) => void;
  selectedText: () => string;
}

const AddLinkModal: React.FC<AddLinkModalProps> = ({ isOpen, onClose, onSave, selectedText }) => {
  const { t } = useTranslation('postBuilder');
  const [url, setUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [isValid, setIsValid] = useState(false);

  const isValidUrl = (url: string) => {
    try {
      new URL(url.startsWith('http') ? url : `https://${url}`);
      return url.trim().length > 0 && (url.includes('.') || url.startsWith('http'));
    } catch {
      return false;
    }
  };

  useEffect(() => {
  if (isOpen) {
    const text = selectedText();
    setLinkText(text);
  }
}, [isOpen]); 


  useEffect(() => {
    if (!url) {
      setIsValid(false);
      return;
    }
    setIsValid(isValidUrl(url));
  }, [url]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pt-[250px]">
      <div className="bg-white rounded-9xl shadow-xl border border-neutral-100 w-[460px] h-[300px]">
        <div className="flex justify-between items-center p-4 border-b-2 border-neutral-100">
          <h2 className="text-lg font-bold">{t('hyperlink.modalTitle')}</h2>
          <Icon name="close" size={20} onClick={() => onClose()} />
        </div>
        <div className="flex flex-col px-4 pt-2 h-[56%] gap-3">
          <div className="flex flex-col gap-1">
            <p className="font-semibold">{t('hyperlink.linkTextLabel')}</p>
            <input
              type="text"
              placeholder={t('hyperlink.textPlaceholder')}
              className="w-full h-10 border rounded-19xl px-3 py-2"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-semibold">{t('hyperlink.pasteUrl')}</p>
            <input
              type="url"
              placeholder={t('hyperlink.placeholder')}
              className="w-full h-10 border rounded-19xl px-3 py-2"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            {(!isValid && url.length > 0) && (
              <p className="text-xxs text-red-500 pl-2 mt-[-7px]">{t('hyperlink.invalidUrlMsg')}</p>
            )}
          </div>
        </div>
        <div className="flex justify-end items-center px-4 h-[24%] gap-2 bg-blue-50 rounded-b-9xl">
          <Button
            variant={Variant.Secondary}
            size={Size.Small}
            className = 'h-[36px]'
            label={t('hyperlink.cancelLabel')}
            onClick={() => onClose()}
          />
          <Button
            size={Size.Small}
            label={t('hyperlink.saveLabel')}
            className = 'h-[36px]'
            disabled={(!url || !isValid || !linkText)}
            onClick={() => {
              onSave(linkText, url.trim());
              setUrl('');
              setLinkText('');
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default AddLinkModal;