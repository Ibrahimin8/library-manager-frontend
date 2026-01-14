import React, { useState } from "react";
import { toast } from "react-hot-toast";
import BorrowForm from "../components/borrow/BorrowForm";
import ReturnForm from "../components/borrow/ReturnForm";
import api from "../services/api";

const BorrowPage = () => {
  const [activeTab, setActiveTab] = useState("borrow");
  const [showBorrowForm, setShowBorrowForm] = useState(false);
  const [showReturnForm, setShowReturnForm] = useState(false);

  const handleBorrowSubmit = async (borrowData) => {
    try {
      // borrowData must be: { book_id, member_id, due_date }
      await api.post("/borrow-records/borrow", borrowData);
      toast.success("Book borrowed successfully");
      setShowBorrowForm(false);
    } catch (error) {
      const msg =
        error?.response?.data?.message?.[0] ||
        error?.response?.data?.message ||
        "Failed to borrow book";
      toast.error(msg);
    }
  };

  const handleReturnSubmit = async (returnData) => {
    try {
      // returnData must be: { borrow_record_id }
      await api.post("/borrow-records/return", returnData);
      toast.success("Book returned successfully");
      setShowReturnForm(false);
    } catch (error) {
      const msg =
        error?.response?.data?.message?.[0] ||
        error?.response?.data?.message ||
        "Failed to return book";
      toast.error(msg);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Borrow & Return</h1>
        <p className="mt-2 text-sm text-gray-700">
          Manage book borrowing and returning operations
        </p>
      </div>

      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("borrow")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "borrow"
                ? "border-primary-500 text-primary-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Borrow Book
          </button>
          <button
            onClick={() => setActiveTab("return")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "return"
                ? "border-primary-500 text-primary-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Return Book
          </button>
        </nav>
      </div>

      <div className="card">
        {activeTab === "borrow" ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Borrow a Book</h3>
            <p className="text-gray-600 mb-6">
              Process book borrowing for library members
            </p>
            <button onClick={() => setShowBorrowForm(true)} className="btn-primary">
              Start Borrow Process
            </button>
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Return a Book</h3>
            <p className="text-gray-600 mb-6">
              Process book returns and update inventory
            </p>
            <button onClick={() => setShowReturnForm(true)} className="btn-primary">
              Start Return Process
            </button>
          </div>
        )}
      </div>

      {showBorrowForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <BorrowForm
              onSubmit={handleBorrowSubmit}
              onClose={() => setShowBorrowForm(false)}
            />
          </div>
        </div>
      )}

      {showReturnForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <ReturnForm
              onSubmit={handleReturnSubmit}
              onClose={() => setShowReturnForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BorrowPage;