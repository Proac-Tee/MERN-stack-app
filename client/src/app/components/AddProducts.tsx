"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { ExtractedProductData, ICategory, ISubcategory } from "../utils/types";
import { initialCategories } from "../utils/intialCategories";
import { addProduct } from "../action/actions";
import DOMPurify from "dompurify";
import { useAppContext } from "../context/AppContext";
import SubmitButton from "./SubmitButton";
import { useMutation } from "@tanstack/react-query";

export const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URI;

const AddProductForm = () => {
  const { setShowModal, setErrors, errors } = useAppContext();

  const ref = useRef<HTMLFormElement>(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );
  const [selectedSubcategories, setSelectedSubcategories] = useState<
    ISubcategory[]
  >([]);
  const [file, setFile] = useState<File | null>(null);

  const [isDragging, setIsDragging] = useState<boolean>(false);

  const { mutate } = useMutation({
    mutationFn: async (formData: ExtractedProductData) => {
      const response = await fetch(`${backend_uri}/api/product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //   Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.status === "fail" && Array.isArray(data.data)) {
        // Format the error messages into a more usable format
        const formattedErrors: { [key: string]: string } = {};
        data.data.forEach(
          (err: { field: string | number; message: string }) => {
            formattedErrors[err.field] = err.message;
          }
        );
        setErrors(formattedErrors); // Set the errors in the state to be displayed in the form
      }

      if (!response.ok) {
        throw data; // Throw the entire data object, which includes errors
      }

      return data;
    },
    onSuccess: (data) => {
      alert(data.message);
      ref.current?.reset();
      setShowModal(null);
    },
    onError: (error: any) => {
      if (error.errors) {
        // Display field-specific errors
        const formattedErrors: { [key: string]: string } = {};
        error.errors.forEach((err: { field: string; message: string }) => {
          formattedErrors[err.field] = err.message;
        });
        setErrors(formattedErrors); // Set the errors in the state to be displayed in the form
      } else {
        alert(error.message || "Failed to add the product. Please try again.");
      }
    },
  });

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const categoryName = event.target.value;
    const category =
      initialCategories.find((cat) => cat.name === categoryName) || null;

    // Update the selected category
    setSelectedCategory(category);

    // Reset subcategories when a new category is selected
    setSelectedSubcategories([]);
  };

  const handleSubcategoryChange = (subcategory: ISubcategory) => {
    const isAlreadySelected = selectedSubcategories.some(
      (sub) => sub.name === subcategory.name
    );

    if (isAlreadySelected) {
      setSelectedSubcategories(
        selectedSubcategories.filter((sub) => sub.name !== subcategory.name)
      );
    } else {
      setSelectedSubcategories([...selectedSubcategories, subcategory]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      validateAndSetFile(selectedFile);
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

  const validateAndSetFile = (selectedFile: File) => {
    if (
      selectedFile.type === "image/png" ||
      selectedFile.type === "image/jpeg"
    ) {
      if (selectedFile.size <= 5 * 1024 * 1024) {
        // Check if the file size is within the limit (5MB)
        setFile(selectedFile);
        setErrors(null);
      } else {
        setErrors({ file: "File size exceeds 5MB" });
      }
    } else {
      setErrors({ file: "Invalid file type. Only PNG or JPG is allowed." });
    }
  };

  const formHandler = async (formData: FormData) => {
    if (!selectedCategory) {
      setErrors({ category: "Please select a category" });
      return;
    }

    if (selectedSubcategories.length === 0) {
      setErrors({ subcategories: "Please select at least one subcategory" });
      return;
    }

    if (!file) {
      setErrors({ file: "Please upload a file." });
      return;
    }

    formData.set("name", name);
    formData.set("description", description);
    formData.set("category", selectedCategory.name);
    selectedSubcategories.forEach((sub) =>
      formData.append("subcategories[]", sub.name)
    );

    // if (file) {
    //   formData.set("file", file);
    // }

    // Convert FormData to a plain object for client side validation
    const sanitizedData: { [key: string]: string } = {};
    formData.forEach((value, key) => {
      sanitizedData[key] = DOMPurify.sanitize(value as string);
    });

    const response = await addProduct(formData);

    if (response.success && response.productData) {
      // Create a new object with only the extracted fields
      const extractedData: ExtractedProductData = {
        name: name,
        description: description,
        category: {
          name: selectedCategory.name,
          subcategories: selectedSubcategories.map((sub) => ({
            name: sub.name,
          })),
        },
      };

      mutate(extractedData);
    } else if (response.errors) {
      setErrors(response.errors); // Set the validation errors in the state
    } else {
      alert("An unexpected error occurred.");
    }
  };

  return (
    <form className="w-[100%] py-[2rem] mx-auto" ref={ref} action={formHandler}>
      <div className="mb-5">
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="name"
        >
          Product Name
        </label>
        <input
          type="text"
          id="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 focus:outline-none dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={name}
          placeholder="Enter product name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        {errors?.name && (
          <p className="text-red-700 py-[0.3rem]">{errors.name}</p>
        )}
      </div>

      <div className="mb-5">
        <label
          htmlFor="description"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 focus:outline-none dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Type product description"
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        {errors?.description && (
          <p className="text-red-700 py-[0.3rem]">{errors.description}</p>
        )}
      </div>

      <div className="mb-5">
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="category"
        >
          Category
        </label>
        <select
          id="category"
          value={selectedCategory?.name || ""}
          onChange={handleCategoryChange}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 focus:outline-none dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">Select a category</option>
          {initialCategories.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        {errors?.category && (
          <p className="text-red-700 py-[0.3rem]">{errors.category}</p>
        )}
      </div>

      {selectedCategory && (
        <div className="mb-5">
          <p className="text-sm font-medium text-gray-900 dark:text-white pb-[0.5rem]">
            Select {selectedCategory.name} subcategories
          </p>
          {selectedCategory.subcategories.map((subcategory) => (
            <div key={subcategory.name}>
              <label className="cursor-pointer w-[100%]">
                <input
                  type="checkbox"
                  checked={selectedSubcategories.some(
                    (sub) => sub.name === subcategory.name
                  )}
                  onChange={() => handleSubcategoryChange(subcategory)}
                />
                <span className="ml-[0.5rem] text-gray-900">
                  {subcategory.name}
                </span>
              </label>
            </div>
          ))}
          {errors?.subcategories && (
            <p className="text-red-700 py-[0.3rem]">{errors.subcategories}</p>
          )}
        </div>
      )}

      <div className="mb-5">
        <label
          htmlFor="file"
          className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 dark:border-gray-600 
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
                  PNG or JPG (MAX. 5MB)
                </p>
              </div>
            )}
          </div>
          <input
            id="file"
            type="file"
            onChange={handleFileChange}
            required
            className="hidden"
            accept="image/png, image/jpeg"
          />
        </label>
        {errors?.file && (
          <p className="text-red-700 py-[0.3rem]">{errors.file}</p>
        )}
      </div>

      <SubmitButton />
    </form>
  );
};

export default AddProductForm;
