"use client";
import { useEffect, useState } from "react";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiEdit,
  FiFileText,
  FiList,
  FiPlus,
  FiSend,
  FiTrash2,
  FiUser,
} from "react-icons/fi";
import { IoMdOptions } from "react-icons/io";

const DynamicForm = () => {
  // Initial form field structure
  const initialField = { input: "", select: "" };

  // State for form fields, errors, and submission status
  const [formFields, setFormFields] = useState([initialField]);
  const [errors, setErrors] = useState([{ input: "", select: "" }]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedFields, setSubmittedFields] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  // Options for select dropdown
  const options = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"];

  // Use useEffect to handle client-side initialization
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle input change
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFields = [...formFields];
    updatedFields[index][name] = value;
    setFormFields(updatedFields);

    // Clear error when user types
    if (isSubmitted) {
      const updatedErrors = [...errors];
      updatedErrors[index][name] = "";
      setErrors(updatedErrors);
    }
  };

  // Add new field row
  const addField = () => {
    setFormFields([...formFields, initialField]);
    setErrors([...errors, { input: "", select: "" }]);
  };

  // Delete field row
  const deleteField = (index) => {
    // Prevent deleting the last field
    if (formFields.length === 1) return;

    const updatedFields = formFields.filter((_, i) => i !== index);
    const updatedErrors = errors.filter((_, i) => i !== index);

    setFormFields(updatedFields);
    setErrors(updatedErrors);
  };

  // Validate form
  const validateForm = () => {
    let isValid = true;
    const newErrors = formFields.map((field) => {
      const fieldErrors = { input: "", select: "" };

      if (!field.input.trim()) {
        fieldErrors.input = "Input field is required";
        isValid = false;
      }

      if (!field.select) {
        fieldErrors.select = "Select option is required";
        isValid = false;
      }

      return fieldErrors;
    });

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (validateForm()) {
      console.log("Form submitted successfully:", formFields);
      // Save the current form fields to display in the table
      setSubmittedFields([...formFields]);
    } else {
      console.log("Form has errors");
    }
  };

  // Return loading state during server-side rendering or before client-side hydration
  if (!isMounted) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md flex flex-col lg:flex-row items-center justify-center h-auto lg:h-64">

        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading form...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg border border-gray-100">
      <div className="flex items-center mb-8">
        <FiFileText className="text-blue-500 text-3xl mr-3" />
        <h2 className="text-2xl font-bold text-gray-800">Dynamic Form</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {formFields.map((field, index) => (
          <div
            key={index}
            className="p-5 bg-gray-50 rounded-lg border border-gray-100 transition-all hover:shadow-md"
          >
            <div className="flex items-center mb-3">
              <FiUser className="text-blue-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">
                Field {index + 1}
              </span>
            </div>

            <div className="flex flex-col lg:flex-row items-start gap-4">

              <div className="flex-1">
                <div className="relative">
                  <div className="flex items-center mb-2">
                    <FiEdit className="text-gray-500 mr-2" />
                    <label className="text-sm font-medium text-gray-700">
                      Text Input
                    </label>
                  </div>
                  <input
                    type="text"
                    name="input"
                    value={field.input}
                    onChange={(e) => handleInputChange(index, e)}
                    placeholder="Enter text"
                    className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all ${
                      errors[index].input ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors[index].input && (
                    <p className="flex items-center text-red-500 text-sm mt-1">
                      <FiAlertCircle className="mr-1" />
                      {errors[index].input}
                    </p>
                  )}
                </div>
              </div>

             <div className="flex-1">
                <div className="relative">
                  <div className="flex items-center mb-2">
                    <IoMdOptions className="text-gray-500 mr-2" />
                    <label className="text-sm font-medium text-gray-700">
                      Select Option
                    </label>
                  </div>
                  <select
                    name="select"
                    value={field.select}
                    onChange={(e) => handleInputChange(index, e)}
                    className={`lg:w-full w-[212px] p-3 border rounded-md appearance-none focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all ${
                      errors[index].select
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Select an option</option>
                    {options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors[index].select && (
                    <p className="flex items-center text-red-500 text-sm mt-1">
                      <FiAlertCircle className="mr-1" />
                      {errors[index].select}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => deleteField(index)}
                className="p-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all hover:shadow-md flex items-center lg:mt-8"
                disabled={formFields.length === 1}
              >
                <FiTrash2 className="mr-1" />
                Delete
              </button>
            </div>
          </div>
        ))}

        <div className="flex gap-2 lg:gap-4 mt-6">
          <button
            type="button"
            onClick={addField}
            className="p-1 lg:p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all hover:shadow-md flex items-center"
          >
            <FiPlus className="mr-2 " />
            Add Field
          </button>

          <button
            type="submit"
            className="p-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all hover:shadow-md flex items-center"
          >
            <FiSend className="mr-2" />
            Submit Form
          </button>
        </div>
      </form>

      {isSubmitted && submittedFields.length > 0 && (
        <div className="mt-12 bg-gray-50 p-6 rounded-lg border border-gray-100">
          <div className="flex items-center mb-6">
            <FiCheckCircle className="text-green-500 text-2xl mr-3" />
            <h3 className="text-xl font-bold text-gray-800">
              Submitted Form Values:
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      <FiList className="text-gray-400 mr-2" />
                      Index
                    </div>
                  </th>
                  <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      <FiEdit className="text-gray-400 mr-2" />
                      Input Value
                    </div>
                  </th>
                  <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      <IoMdOptions className="text-gray-400 mr-2" />
                      Select Value
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {submittedFields.map((field, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          {index + 1}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <FiFileText className="text-gray-400 mr-2" />
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          {field.input || "(empty)"}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <IoMdOptions className="text-gray-400 mr-2" />
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          {field.select || "(empty)"}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicForm;



// -----------------------------
