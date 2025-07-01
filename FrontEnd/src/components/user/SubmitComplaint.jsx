import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SubmitComplaint() {
  const navigate = useNavigate();
  const formRef = useRef();
  const [attachments, setAttachments] = useState([]);
  const [errors, setErrors] = useState({});
  const API_URL = import.meta.env.VITE_API_URL;

  const validate = (data) => {
    const newErrors = {};

    if (!data.name.trim()) newErrors.name = "Name is required.";
    if (!data.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(data.email)) newErrors.email = "Invalid email format.";

    if (!data.phone.trim()) newErrors.phone = "Phone number is required.";
    else if (!/^\d{10}$/.test(data.phone)) newErrors.phone = "Phone must be 10 digits.";

    if (!data.address.trim()) newErrors.address = "Address is required.";
    if (!data.title.trim()) newErrors.title = "Complaint title is required.";
    if (!data.description.trim()) newErrors.description = "Description is required.";

    return newErrors;
  };

  const handleSubmitComplaint = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    const user = JSON.parse(localStorage.getItem("userData"));
    // console.log(user);
    const loggedInUserId = user?._id;
    const formData = new FormData();
      formData.append("userId",loggedInUserId),
      formData.append("name",form.name.value),
      formData.append("email", form.email.value),
      formData.append("phone",form.phone.value),
      formData.append("address",form.address.value),
      formData.append("title",form.title.value),
      formData.append("description",form.description.value)

      const files = form.querySelector('input[type="file"]').files;
      for(let i=0;i<files.length;i++){
        formData.append("attachments",files[i]);
      }

    const formObject = Object.fromEntries(formData.entries());
    const validationErrors = validate(formObject);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try{
      const res = await fetch(`${API_URL}/complaints`,{
        method:"POST",
        body:formData
      }); 
      const data = await res.json();
      if(res.ok){
        alert("Complaint submitted successfully!");
        navigate("/user/complaints");
      }else{
        alert("submission failed");
      }
    }catch(err){
      console.log(err);
      alert("Error while submitting complaint");
    }
    
    
  };

  return (
    <div className="w-full px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center sm:text-left">
          Submit a Complaint
        </h2>

        <div className="bg-[#1F2937] rounded-xl shadow-md p-6 sm:p-8 border-t-4 border-[#06B6D4]">
          <form ref={formRef} onSubmit={handleSubmitComplaint} className="space-y-6">
            {/* Personal Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {["name", "email", "phone", "address"].map((field) => (
                <div key={field}>
                  <label
                    className="block text-[#06B6D4] font-medium mb-2"
                    htmlFor={field}
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                    id={field}
                    name={field}
                    className="w-full border border-[#06B6D4] rounded-lg px-4 py-2 bg-[#1F2937] text-white focus:outline-none focus:border-[#06B6D4]"
                  />
                  {errors[field] && (
                    <p className="text-sm text-red-500 mt-1">{errors[field]}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Complaint Title */}
            <div>
              <label className="block text-[#06B6D4] font-medium mb-2" htmlFor="title">
                Complaint Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="w-full border border-[#06B6D4] rounded-lg px-4 py-2 bg-[#1F2937] text-white focus:outline-none focus:border-[#06B6D4]"
              />
              {errors.title && (
                <p className="text-sm text-red-500 mt-1">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label
                className="block text-[#06B6D4] font-medium mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                className="w-full border border-[#06B6D4] rounded-lg px-4 py-2 bg-[#1F2937] text-white focus:outline-none focus:border-[#06B6D4]"
              ></textarea>
              {errors.description && (
                <p className="text-sm text-red-500 mt-1">{errors.description}</p>
              )}
            </div>

            {/* Attachments */}
            <div>
              <label className="block text-[#06B6D4] font-medium mb-2">
                Attachments (optional)
              </label>
              <input
                type="file"
                multiple
                onChange={(e) => setAttachments([...e.target.files])}
                className="block w-full text-white bg-[#1F2937] border border-[#06B6D4] rounded-lg px-4 py-2"
              />
              {attachments.length > 0 && (
                <p className="text-sm text-gray-400 mt-1">
                  {attachments.length} file(s) selected
                </p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                className="mr-2 accent-[#06B6D4]"
                required
              />
              <label htmlFor="terms" className="text-sm text-gray-200">
                I agree to the terms and conditions and privacy policy
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[#06B6D4] text-[#1F2937] px-6 py-3 rounded-lg font-medium hover:bg-[#0891B2] transition"
              >
                Submit Complaint
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
