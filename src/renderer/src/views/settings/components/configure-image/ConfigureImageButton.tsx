import { Box, Image, UnstyledButton } from '@mantine/core';
import { PlusSquare, Edit } from 'react-feather';
import { useEffect, useState } from 'react';
import ImagePath from '../../../../../../shared/types/ImagePath';
import fileToBase64 from '../../../../services/utils';
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
        className={`configure-img-btn configure-img--${
          imgSrc === '' ? 'add-img-btn' : 'edit-img-btn'
        }`}
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0.25rem',
        }}
      >
        <Image
          src={imgSrc}
          w="100%"
          fit="contain"
          style={{ marginRight: '0.03rem' }}
        />

        {imgSrc === '' && (
          <PlusSquare
            className={`configure-img-icon configure-img--${
              imgSrc === '' ? 'add-img-icon' : ''
            }`}
          />
        )}

        {imgSrc !== '' && (
          <Edit
            className={`configure-img-icon configure-img--${
              imgSrc === '' ? 'add-img-icon' : 'edit-img-icon'
            }`}
          />
        )}
      </UnstyledButton>
    </Box>
  );
}

export default ConfigureImageButton;
