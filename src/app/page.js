"use client";
import { FiFileText } from "react-icons/fi";
import DynamicForm from "../components/DynamicForm.jsx";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-8">
      <div className="max-w-4xl mx-auto mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <FiFileText className="text-blue-500 text-4xl mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">
            Dynamic Form Application
          </h1>
        </div>
      </div>
      <DynamicForm />
    </div>
  );
}
