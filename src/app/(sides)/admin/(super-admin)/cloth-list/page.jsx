"use client";
import React, { useState } from "react";
import {
  useAddClothes,
  useDeleteClothes,
  useEditClothes,
  useFetchAllClothes,
  useFetchClothesAdmin,
} from "../../../../../hooks/clothesHook";
import { toast, ToastContainer } from "react-toastify";

const ClothList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [selectedCloth, setSelectedCloth] = useState(null);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  
  const [newCloth, setNewCloth] = useState({
    title: "",
    Description: "",
    Price: "",
    MaterialType: "",
    Color: "",
    DesignType: "",
    file: null,
  });
  

  

  const [imagePreview, setImagePreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const { data, refetch } = useFetchClothesAdmin(searchQuery, page, limit);
  console.log(data)
  const { mutate: addClothes } = useAddClothes();
  const { mutate: deleteClothes } = useDeleteClothes();
  const { mutate: editClothes } = useEditClothes();

  const validateForm = () => {
    const errors = {};
    if (!newCloth.Title) errors.Title = "Title is required.";
    if (!newCloth.Description) errors.Description = "Description is required.";
    if (!newCloth.MaterialType) errors.MaterialType = "Material Type is required.";
    if (!newCloth.Color) errors.Color = "Color is required.";

    if (!newCloth.DesignType) errors.DesignType = "Design Type is required.";
    if (!newCloth.Price || isNaN(newCloth.Price)) errors.Price = "Valid price is required.";
    if (!newCloth.file && !isEditing) errors.file = "Image file is required.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewCloth((prev) => ({ ...prev, file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddClothSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("Title", newCloth.Title);
    formData.append("Description", newCloth.Description);
    formData.append("Price", newCloth.Price);
    formData.append("Material", newCloth.MaterialType);
    formData.append("DesignPattern", newCloth.DesignType);
    formData.append("color", newCloth.Color);

    if (newCloth.file) formData.append("file", newCloth.file);


    if (isEditing) {
      editClothes(
        { id: selectedCloth.id,formData: formData },
        {
          onSuccess: () => {
            setAddModalOpen(false);
            setNewCloth({
             
              Title: "",
              Description: "",
              Price: "",
              MaterialType: "",
              Color:"",
              DesignPattern: "",
              file: null,
            });
            setImagePreview(null);
            setIsEditing(false);
            refetch();
            toast.success("Cloth updated successfully!");
          },
          onError: () => {
            toast.error("Failed to update cloth.");
          },
        }
      );
    } else {
      addClothes(formData, {
        onSuccess: () => {
          setAddModalOpen(false);
          setNewCloth({
            
            
            Title: "",
            Description: "",
            Price: "",
            MaterialType: "",
            Color:"",
            DesignType: "",
            file: null,
          });
          setImagePreview(null);
          refetch();
          toast.success("Cloth added successfully!");
        },
        onError: () => {
          toast.error("Failed to add cloth.");
        },
      });
    }
  };
  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setNewCloth((prev) => ({
      ...prev,
      [name]: value || "",
    }));
  };
  

  const handleEditClick = (cloth) => {
    setNewCloth({
      file: null,
      Title: cloth.title,
      Description: cloth.description,
      MaterialType: cloth.MaterialType,
      Color:cloth.Color,
      DesignType: cloth.designType,
      Price: cloth.price,
    });
    setImagePreview(cloth.imageUrl);
    setSelectedCloth(cloth);
    setAddModalOpen(true);
    setIsEditing(true);
    
  };
  

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6">
        <ToastContainer />
        <h1 className="text-3xl font-bold text-gray-700">Cloth List</h1>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search for clothes..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full p-3 pl-10 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => {
              setAddModalOpen(true);
              setIsEditing(false);
              setNewCloth({
                file: null,
                Title: "",
                Description: "",
                MaterialType: "",
                Color:"",
                DesignType: "",
                Price: "",
              });
              setImagePreview(null);
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700"
          >
            + Add New Cloth
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-black text-white text-sm uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 text-left">Cloth ID</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Image</th>
             
                <th className="px-6 py-3 text-left">Price</th>
                <th className="px-6 py-3 text-left">Material</th>
                <th className="px-6 py-3 text-center">Edit</th>
                <th className="px-6 py-3 text-center">Delete</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {data?.data?.map((cloth, index) => (
                <tr
                  key={cloth.id}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                  onClick={()=>setSelectedCloth(cloth)}
                >
                  <td className="px-6 py-3">{cloth.id}</td>
                  <td className="px-6 py-3">{cloth.title}</td>
                  <td className="px-6 py-3">
                    <img
                      src={cloth.imageUrl}
                      alt={cloth.title}
                      className="w-16 h-16 object-cover rounded-lg shadow-md"
                    />
                  </td>
                 
                  <td className="px-6 py-3">{cloth.price}</td>
                  <td className="px-6 py-3">{cloth.materialType}</td>
                  <td className="px-6 py-3 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(cloth);
                      }}
                      className="bg-yellow-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="px-6 py-3 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteClothes(cloth.id, {
                          onSuccess: () => {
                            toast.success("Cloth deleted successfully!");
                            refetch();
                          },
                          onError: () => {
                            toast.error("Failed to delete cloth.");
                          },
                        });
                      }}
                      className="bg-yellow-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        

        
        {isAddModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center overflow-auto bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-xl  shadow-sm w-[700px] max-w-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {isEditing ? "Edit Cloth" : "Add New Cloth"}
              </h2>
              <form onSubmit={handleAddClothSubmit}>
                <div className="space-y-4">
                  
                  {["Title", "Description", "Price","Material type", "Design type","color" ].map(
                    (field) => (
                      <div key={field}>
                        <label className="block text-gray-700 font-medium capitalize">
                          {field}
                        </label>
                        <input
                          type="text"
                          name={field}
                          value={newCloth[field]}
                          onChange={handleAddInputChange}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          required
                        />
                        {formErrors[field] && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors[field]}
                          </p>
                        )}
                      </div>
                    )
                  )}
                  <div>
                    <label className="block text-gray-700 font-medium">Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
                    />
                    
                  </div>
                  {formErrors.file && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.file}</p>
                    )}
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-40 object-cover mt-4 rounded-lg"
                      />
                    )}
                </div>
                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setAddModalOpen(false);
                      setIsEditing(false);
                    }}
                    className="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300"
                  >
                    {isEditing ? "Save Changes" : "Add Cloth"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {selectedCloth && !isEditing ?(
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-xl shadow-sm w-1/3 p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Cloth Details
                </h2>
                <div className="space-y-2">
                  <p>
                    <strong>ID:</strong> {selectedCloth.id}
                  </p>
                  <p>
                    <strong>Name:</strong> {selectedCloth.title}
                  </p>
                  <p>
                    <strong>Description:</strong> {selectedCloth.description}
                  </p>
                  <p>
                    <strong>Material:</strong> {selectedCloth.materialType}
                  </p>
                  <p>
                    <strong>Design :</strong> {selectedCloth.designType}
                  </p>
                  <p>
                    <strong>Price:</strong> {selectedCloth.price}
                  </p>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={()=>setSelectedCloth(null)}
                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          ):null}
      </div>
    </div>
  );
};

export default ClothList;
