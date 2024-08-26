"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { backend_uri } from "./AddProducts";
import { ExtractedProductData, ICategory, ISubcategory } from "../utils/types";
import { initialCategories } from "../utils/intialCategories";
import DOMPurify from "dompurify";
import { getProductsData, updateProduct } from "../action/actions";
import SubmitButton from "./SubmitButton";

const ProductUpdateComponent = () => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setShowDropdown, setShowModal, setUpdateErrors, updateErrors } =
    useAppContext();

  const ref = useRef<HTMLFormElement>(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );
  const [selectedSubcategories, setSelectedSubcategories] = useState<
    ISubcategory[]
  >([]);

  const { data, isPending, error } = useQuery({
    queryKey: ["productsData"],
    queryFn: () => getProductsData(),
  });

  const _id = searchParams.get("_id") || "";
  const { mutate } = useMutation({
    mutationFn: async (extractedData: ExtractedProductData) => {
      const response = await fetch(`${backend_uri}/api/product/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          //   Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(extractedData),
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
        setUpdateErrors(formattedErrors); // Set the errors in the state to be displayed in the form
      }

      if (!response.ok) {
        throw data; // Throw the entire data object, which includes errors
      }

      return data;
    },
    onSuccess: (data) => {
      alert(data.message);
      setShowModal(null);
      // Remove the search param from the URL after successful deletion
      router.replace(`/admin`); // Removes all query params
      queryClient.invalidateQueries({ queryKey: ["productsData"] });
    },
    onError: (error: any) => {
      if (error.errors) {
        // Display field-specific errors
        const formattedErrors: { [key: string]: string } = {};
        error.errors.forEach((err: { field: string; message: string }) => {
          formattedErrors[err.field] = err.message;
        });
        setUpdateErrors(formattedErrors); // Set the errors in the state to be displayed in the form
      } else {
        alert(
          error.message || "Failed to update the product. Please try again."
        );
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
      setUpdateErrors({ category: "Please select a category" });
      return;
    }

    if (selectedSubcategories.length === 0) {
      setUpdateErrors({
        subcategories: "Please select at least one subcategory",
      });
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

    const response = await updateProduct(formData);

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
      setUpdateErrors(response.errors); // Set the validation errors in the state
    } else {
      alert("An unexpected error occurred.");
    }
  };

  // Use `useEffect` to handle the success case when data is fetched
  // Use `useEffect` to handle the success case when data is fetched
  useEffect(() => {
    if (data) {
      const product: ExtractedProductData = data.find(
        (prod: { _id: string }) => prod._id === _id
      );

      if (product) {
        setName(product.name);
        setDescription(product.description);

        const category =
          initialCategories.find((cat) => cat.name === product.category.name) ||
          null;
        setSelectedCategory(category);

        const subcategories =
          category?.subcategories.filter((sub) =>
            product.category.subcategories.some(
              (prodSub) => prodSub.name === sub.name
            )
          ) || [];

        setSelectedSubcategories(subcategories);
      }
    }
  }, [data, _id]);

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
        {updateErrors?.name && (
          <p className="text-red-700 py-[0.3rem]">{updateErrors.name}</p>
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
        {updateErrors?.description && (
          <p className="text-red-700 py-[0.3rem]">{updateErrors.description}</p>
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
        {updateErrors?.category && (
          <p className="text-red-700 py-[0.3rem]">{updateErrors.category}</p>
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
          {updateErrors?.subcategories && (
            <p className="text-red-700 py-[0.3rem]">
              {updateErrors.subcategories}
            </p>
          )}
        </div>
      )}

      <SubmitButton />
    </form>
  );
};

export default ProductUpdateComponent;
