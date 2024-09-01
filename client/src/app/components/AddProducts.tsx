"use client";

import { ChangeEvent, useRef, useState } from "react";
import { ExtractedProductData, ICategory, ISubcategory } from "../utils/types";
import { initialCategories } from "../utils/intialCategories";
import { addProduct } from "../action/actions";
import DOMPurify from "dompurify";
import { useAppContext } from "../context/AppContext";
import SubmitButton from "./SubmitButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import ImageUploadButton from "../utils/ImageUploadButton";
import { useUploadThing } from "../utils/uploadthing";

export const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URI;

const AddProductForm = () => {
  const { isAuthenticated, user, isLoading, getAccessTokenRaw } =
    useKindeBrowserClient();

  const { file, setFile, setShowModal, setErrors, errors } = useAppContext();
  const queryClient = useQueryClient();
  const ref = useRef<HTMLFormElement>(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );
  const [selectedSubcategories, setSelectedSubcategories] = useState<
    ISubcategory[]
  >([]);

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {
      alert("Product Image Uploaded successfully!");
    },
    onUploadError: () => {
      alert("Error occurred while uploading Product Image");
    },
    onUploadBegin: () => {
      alert("Please wait Product Image Upload has begun");
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData: ExtractedProductData) => {
      const accessToken = await getAccessTokenRaw();

      const response = await fetch(`${backend_uri}/api/product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
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

      const productId = data.productId;

      // Handle file upload after product creation
      if (file && productId) {
        const renamedFile = new File(
          [file],
          `${productId}.${file.name.split(".").pop()}`,
          {
            type: file.type,
          }
        );

        startUpload([renamedFile]);
      }

      return data;
    },
    onSuccess: (data) => {
      alert(data.message);
      ref.current?.reset();
      setFile(null);
      setShowModal(null);
      queryClient.invalidateQueries({ queryKey: ["product"] });
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

    // Convert FormData to a plain object for client side validation
    const sanitizedData: { [key: string]: string } = {};
    formData.forEach((value, key) => {
      sanitizedData[key] = DOMPurify.sanitize(value as string);
    });

    // if (file) {
    //   formData.set("file", file);
    // }

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
        file: file,
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
        <ImageUploadButton />
        {errors?.file && (
          <p className="text-red-700 py-[0.3rem]">{errors.file}</p>
        )}
      </div>

      <SubmitButton text="Add Product" isPending={isPending} />
    </form>
  );
};

export default AddProductForm;
