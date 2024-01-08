import { Box, Image, UnstyledButton } from '@mantine/core';
import { IconPhotoEdit, IconPhotoPlus } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import ImagePath from '../../../shared/types/ImagePath';
import fileToBase64 from '../services/utils';
import '../styles/configureImageButton.css';

type ConfigureImageButtonProps = {
  imagePath: ImagePath | undefined;
  onClick: () => void;
};
function ConfigureImageButton({
  imagePath,
  onClick,
}: ConfigureImageButtonProps) {
  const [imgSrc, setImgSrc] = useState('');

  useEffect(() => {
    async function setImageSrcFromImagePath() {
      if (imagePath) {
        setImgSrc(await fileToBase64(imagePath.path, imagePath.type));
      }
    }
    if (imagePath && imagePath.type !== 'url') {
      setImageSrcFromImagePath();
    } else {
      setImgSrc(imagePath?.path ?? '');
    }
  }, [imagePath]);

  return (
    <Box>
      <UnstyledButton
        aria-label="Configure Image"
        onClick={onClick}
        className={`btn${imgSrc === '' ? ' add-img-btn' : ' edit-img-btn'}`}
        style={{ position: 'relative' }}
      >
        <Image src={imgSrc} fit="contain" />

        {imgSrc === '' && (
          <IconPhotoPlus
            className={`icon${imgSrc === '' ? ' add-img-icon' : ''}`}
          />
        )}

        {imgSrc !== '' && (
          <IconPhotoEdit
            className={`icon${
              imgSrc === '' ? ' add-img-icon' : ' edit-img-icon'
            }`}
          />
        )}
      </UnstyledButton>
    </Box>
  );
}

export default ConfigureImageButton;
