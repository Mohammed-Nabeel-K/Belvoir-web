"use client";
import React, { useState, useEffect } from "react";
import axiosInstance from "../../../../../../axios/axiosinstance/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Page() {
  const [designs, setDesigns] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [newDesign, setNewDesign] = useState({
    Id: "",
    Name: "",
    Description: "",
    Category: "",
    Price: 0,
    Available: true,
    NewImages: [],
    RemoveImageIds: [],
    CreatedBy: "",
    ImageFiles: [],
  });

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const response = await axiosInstance.get("/Design", {
          params: { searchQuery },
        });
        setDesigns(response.data?.data);
      } catch (error) {
        toast.error("Error fetching designs");
      }
    };
    fetchDesigns();
  }, [searchQuery]);

  const handleAddEditSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axiosInstance.put(`/Design/update`, newDesign);
        toast.success("Design updated successfully");
      } else {
        await axiosInstance.post("/Design/add", newDesign);
        toast.success("Design added successfully");
      }
      setIsFormModalOpen(false);
    } catch (error) {
      toast.error("Error saving design");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/Design/${id}`);
      toast.success("Design deleted successfully");
      setDesigns(designs.filter((d) => d.Id !== id));
    } catch (error) {
      toast.error("Error deleting design");
    }
  };

  const handleRowClick = (design) => {
    setSelectedDesign(design);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <ToastContainer />
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6">
        <h1 className="text-3xl font-bold text-gray-700">Design List</h1>
        
        <input
          type="text"
          placeholder="Search for designs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-[500px] p-3 rounded-full border border-gray-300"
        />
      
        <button
          onClick={() => {
            setNewDesign({ Name: "", Description: "", Category: "", Price: 0, Available: true, CreatedBy: "", ImageFiles: [] });
            setIsEditing(false);
            setIsFormModalOpen(true);
          }}
          className="bg-blue-600 text-white ml-[400px] px-6 py-2 rounded-lg"
        >
          + Add New Design
        </button>
        <table className="w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {designs.map((design) => (
              <tr key={design.Id} onClick={() => handleRowClick(design)} className="cursor-pointer hover:bg-gray-100">
                <td>
                  <img
                    src={design.images.find((img) => img.isPrimary)?.imageUrl || design.images[0]?.imageUrl}
                    alt={design.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                </td>
                <td>{design.name}</td>
                <td>{design.description}</td>
                <td>{design.category}</td>
                <td>{design.price}</td>
                <td>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setNewDesign(design);
                      setIsEditing(true);
                      setIsFormModalOpen(true);
                    }}
                    className="bg-yellow-600 text-white px-4 py-2 rounded-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(design.Id);
                    }}
                    className="bg-red-600 text-white px-4 py-2 ml-2 rounded-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedDesign && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold">Design Details</h2>
            <p>
              <strong>Name:</strong> {selectedDesign.name}
            </p>
            <p>
              <strong>Description:</strong> {selectedDesign.description}
            </p>
            <p>
              <strong>Category:</strong> {selectedDesign.category}
            </p>
            <p>
              <strong>Price:</strong> {selectedDesign.price}
            </p>
            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-black text-white rounded">
              Close
            </button>
          </div>
        </div>
      )}

      {isFormModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold">{isEditing ? "Edit Design" : "Add New Design"}</h2>
            <form onSubmit={handleAddEditSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={newDesign.Name}
                onChange={(e) => setNewDesign({ ...newDesign, Name: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <textarea
                placeholder="Description"
                value={newDesign.Description}
                onChange={(e) => setNewDesign({ ...newDesign, Description: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Category"
                value={newDesign.Category}
                onChange={(e) => setNewDesign({ ...newDesign, Category: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Price"
                value={newDesign.Price}
                onChange={(e) => setNewDesign({ ...newDesign, Price: parseFloat(e.target.value) })}
                className="w-full p-2 border rounded"
              />
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={newDesign.Available}
                  onChange={(e) => setNewDesign({ ...newDesign, Available: e.target.checked })}
                  className="mr-2"
                />
                <label>Available</label>
              </div>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                {isEditing ? "Update" : "Add"}
              </button>
              <button onClick={() => setIsFormModalOpen(false)} className="ml-2 px-4 py-2 bg-red-600 text-white rounded">
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
