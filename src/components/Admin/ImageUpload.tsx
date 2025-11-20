import { useRef, useState } from "react";
import { X, Upload, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
  label: string;
  value: File | null;
  preview?: string;
  onChange: (file: File | null) => void;
  accept?: string;
  multiple?: boolean;
}

function ImageUpload({
  label,
  value,
  preview,
  onChange,
  accept = "image/*",
  multiple = false,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        onChange(file);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onChange(files[0]);
    }
  };

  const handleRemove = () => {
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getPreviewUrl = () => {
    if (value) {
      return URL.createObjectURL(value);
    }
    return preview || "";
  };

  return (
    <div className="image-upload">
      <label className="image-upload__label">{label}</label>
      <div
        className={`image-upload__dropzone ${isDragging ? "dragging" : ""} ${
          value || preview ? "has-image" : ""
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileSelect}
          className="image-upload__input"
        />

        {getPreviewUrl() ? (
          <div className="image-upload__preview">
            <img src={getPreviewUrl()} alt="Preview" />
            <button
              type="button"
              className="image-upload__remove"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
            >
              <X size={20} />
            </button>
          </div>
        ) : (
          <div className="image-upload__placeholder">
            <Upload size={40} />
            <p>Kéo thả ảnh vào đây hoặc click để chọn</p>
            <span>PNG, JPG, GIF tối đa 5MB</span>
          </div>
        )}
      </div>
    </div>
  );
}

interface MultipleImageUploadProps {
  label: string;
  values: File[];
  previews?: string[];
  onChange: (files: File[]) => void;
  onRemovePreview?: (index: number) => void;
}

export function MultipleImageUpload({
  label,
  values,
  previews = [],
  onChange,
  onRemovePreview,
}: MultipleImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );
    if (files.length > 0) {
      onChange([...values, ...files]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files).filter((file) =>
        file.type.startsWith("image/")
      );
      onChange([...values, ...newFiles]);
    }
  };

  const handleRemove = (index: number) => {
    const newFiles = values.filter((_, i) => i !== index);
    onChange(newFiles);
  };

  const getPreviewUrl = (index: number) => {
    if (values[index]) {
      return URL.createObjectURL(values[index]);
    }
    return previews[index] || "";
  };

  return (
    <div className="image-upload">
      <label className="image-upload__label">{label}</label>
      <div
        className={`image-upload__dropzone multiple ${isDragging ? "dragging" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="image-upload__input"
        />

        <div className="image-upload__placeholder">
          <ImageIcon size={40} />
          <p>Kéo thả ảnh vào đây hoặc click để chọn</p>
          <span>PNG, JPG, GIF tối đa 5MB (tối đa 10 ảnh)</span>
        </div>
      </div>

      {(values.length > 0 || previews.length > 0) && (
        <div className="image-upload__gallery">
          {/* Show existing previews (from edit mode) */}
          {previews.map((preview, index) => (
            <div key={`preview-${index}`} className="image-upload__gallery-item">
              <img src={preview} alt={`Preview ${index + 1}`} />
              <button
                type="button"
                className="image-upload__remove"
                onClick={() => {
                  if (onRemovePreview) {
                    onRemovePreview(index);
                  }
                }}
              >
                <X size={16} />
              </button>
            </div>
          ))}
          {/* Show new files */}
          {values.map((file, index) => (
            <div key={`file-${index}`} className="image-upload__gallery-item">
              <img src={URL.createObjectURL(file)} alt={`Image ${index + 1}`} />
              <button
                type="button"
                className="image-upload__remove"
                onClick={() => handleRemove(index)}
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageUpload;

