import { useRef } from 'react';

export const useImageUpload = (setImage) => {
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setImage(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  return {
    fileInputRef,
    handleImageChange,
    handleIconClick,
  };
};
