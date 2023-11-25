import React, { useState, ChangeEvent } from 'react';

interface ImageComparisonToolProps {}

const ImageComparisonTool: React.FC<ImageComparisonToolProps> = () => {
  const [beforeImageFile, setBeforeImageFile] = useState<File | undefined>(undefined);
  const [afterImageFile, setAfterImageFile] = useState<File | undefined>(undefined);
  const [compareVisible, setCompareVisible] = useState<boolean>(false);

  const handleBeforeImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      setBeforeImageFile(file);
      setCompareVisible(!!afterImageFile);
    } else {
      setBeforeImageFile(undefined);
    }
  };

  const handleAfterImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      setAfterImageFile(file);
      setCompareVisible(!!beforeImageFile);
    } else {
      setAfterImageFile(undefined);
    }
  };

  const handleCompareClick = async () => {
    if (beforeImageFile && afterImageFile) {
      const formData = new FormData();
      formData.append('beforeImage', beforeImageFile);
      formData.append('afterImage', afterImageFile);

      try {
        const response = await fetch('http://localhost:5000/upload', {
          method: 'POST',
          body: formData,
          credentials: 'include',
          headers: {
            'Accept': 'multipart/form-data'
          },
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Server response:', result);
        } else {
          console.error('Failed to upload images:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error uploading images:', error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="beforeImage" className="form-label">
            Before Image:
          </label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            id="beforeImage"
            onChange={handleBeforeImageChange}
          />
          <input
            type="text"
            className="form-control mt-2"
            placeholder="or enter URL"
            value={beforeImageFile ? beforeImageFile.name : ''}
            onChange={() => {}}
          />
        </div>
        <div className="col">
          <label htmlFor="afterImage" className="form-label">
            After Image:
          </label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            id="afterImage"
            onChange={handleAfterImageChange}
          />
          <input
            type="text"
            className="form-control mt-2"
            placeholder="or enter URL"
            value={afterImageFile ? afterImageFile.name : ''}
            onChange={() => {}}
          />
        </div>
      </div>

      {compareVisible && (
        <button
          type="button"
          className="btn btn-primary mt-2 mb-2"
          onClick={handleCompareClick}
        >
          Compare
        </button>
      )}

      <div className="row">
        <div className="col">
          {beforeImageFile && (
            <img
              className="img-fluid rounded"
              src={URL.createObjectURL(beforeImageFile)}
              alt="Before"
            />
          )}
        </div>
        <div className="col">
          {afterImageFile && (
            <img
              className="img-fluid rounded"
              src={URL.createObjectURL(afterImageFile)}
              alt="After"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageComparisonTool;
