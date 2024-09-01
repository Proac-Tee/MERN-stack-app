import React, { useCallback, useState, DragEvent } from "react";
import { useDropzone } from "@uploadthing/react";
import { useAppContext } from "../context/AppContext";

const ImageUploadButton: React.FC = () => {
  const { setErrors } = useAppContext();
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const { file, setFile } = useAppContext();

  const validateAndSetFile = (selectedFile: File) => {
    if (
      selectedFile.type === "image/png" ||
      selectedFile.type === "image/jpeg"
    ) {
      if (selectedFile.size <= 4 * 1024 * 1024) {
        setFile(selectedFile);
        setErrors(null);
      } else {
        setErrors({ file: "File size exceeds 4MB" });
      }
    } else {
      setErrors({ file: "Invalid file type. Only PNG or JPG is allowed." });
    }
  };

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      validateAndSetFile(droppedFile);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      validateAndSetFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <label
        className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 dark:border-gray-600 
              ${
                isDragging
                  ? "bg-gray-100 dark:bg-gray-600 border-blue-500"
                  : "border-gray-300"
              }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center text-center pt-5 pb-6 px-[0.4rem]">
          <svg
            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          {file ? (
            <p className="text-green-700 py-[0.3rem]">
              Selected file: {file.name}
            </p>
          ) : (
            <div>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Images (MAX. 4MB)
              </p>
            </div>
          )}
        </div>
      </label>
    </div>
  );
};

export default ImageUploadButton;
