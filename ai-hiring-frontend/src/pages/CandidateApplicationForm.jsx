import React, { useEffect, useState } from 'react';
import { useUser } from '../context/userContext';
import { useNavigate } from 'react-router';
import axios from 'axios';

const CandidateApplicationForm = () => {
  const {user} = useUser()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    name: '',
    email: '',
    phone: '',
    github: '',
    linkedin: '',
    portfolio: '',
    location: '',

    // Professional Information
    current_job_title: '',
    experience: '',
    skills: [],
    industry: '',
    preferred_role: '',

    // Qualifications
    education: '',
    university: '',
    graduation_year: '',
    expected_salary: '',
    preferred_location: '',
    resume_file: ''
  });

  console.log(formData)



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFormData({
        ...formData,
        resume_file: e.target.files[0]
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();

      // Append all text fields
      Object.keys(formData).forEach((key) => {
        if (key !== 'resume_file') {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Append the file
      if (formData.resume_file) {
        formDataToSend.append('resume_file', formData.resume_file);
      }

      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/resume/resume_upload`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      })
      console.log(data)
    } catch (error) {
      console.log(error)
    }

    console.log('Form submitted:', formData);
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow">
        <div className="px-4 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Candidate Application Form</h3>
          <p className="mt-1 text-sm text-gray-500">Please complete all three steps to submit your application.</p>
        </div>

        {/* Progress Bar */}
        <div className="px-4 py-5">
          <div className="relative">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
              <div
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              ></div>
            </div>
            <div className="flex text-xs justify-between">
              <div className={`${currentStep >= 1 ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>Personal</div>
              <div className={`${currentStep >= 2 ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>Professional</div>
              <div className={`${currentStep >= 3 ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>Qualifications</div>
            </div>
          </div>
        </div>

        <form>
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="px-4 py-5">
              <h4 className="text-base font-medium text-gray-900 mb-4">Personal Information</h4>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">Current Location</label>
                    <input
                      type="text"
                      name="location"
                      id="location"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      value={formData.location}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label htmlFor="github" className="block text-sm font-medium text-gray-700">GitHub URL</label>
                    <input
                      type="text"
                      name="github"
                      id="github"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      value={formData.github}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">LinkedIn URL</label>
                    <input
                      type="text"
                      name="linkedin"
                      id="linkedin"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700">Portfolio URL</label>
                    <input
                      type="text"
                      name="portfolio"
                      id="portfolio"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      value={formData.portfolio}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Professional Information */}
          {currentStep === 2 && (
            <div className="px-4 py-5">
              <h4 className="text-base font-medium text-gray-900 mb-4">Professional Information</h4>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">Current Job Title</label>
                    <input
                      type="text"
                      name="jobTitle"
                      id="jobTitle"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Years of Experience</label>
                    <input
                      type="number"
                      name="experience"
                      id="experience"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      value={formData.experience}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Skills (comma separated)</label>
                  <input
                    type="text"
                    name="skills"
                    id="skills"
                    placeholder='comma seperated value e.g. Frontend, Backend, AI'
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={formData.skills}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="industry" className="block text-sm font-medium text-gray-700">Current Industry</label>
                    <input
                      type="text"
                      name="industry"
                      id="industry"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      value={formData.industry}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="preferred_role" className="block text-sm font-medium text-gray-700">Preferred Role</label>
                    <input
                      type="text"
                      name="preferred_role"
                      id="preferred_role"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      value={formData.preferred_role}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Qualifications */}
          {currentStep === 3 && (
            <div className="px-4 py-5">
              <h4 className="text-base font-medium text-gray-900 mb-4">Qualifications & Preferences</h4>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="education" className="block text-sm font-medium text-gray-700">Highest Education</label>
                    <select
                      id="education"
                      name="education"
                      className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm p-2"
                      value={formData.education}
                      onChange={handleInputChange}
                    >
                      <option value="">Select education level</option>
                      <option value="High School">High School</option>
                      <option value="Associate's Degree">Associate's Degree</option>
                      <option value="Bachelor's Degree">Bachelor's Degree</option>
                      <option value="Master's Degree">Master's Degree</option>
                      <option value="Doctorate">Doctorate</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="university" className="block text-sm font-medium text-gray-700">University/Institution</label>
                    <input
                      type="text"
                      name="university"
                      id="university"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      value={formData.university}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label htmlFor="graduation_year" className="block text-sm font-medium text-gray-700">Graduation Year</label>
                    <input
                      type="number"
                      name="graduation_year"
                      id="graduation_year"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      value={formData.graduation_year}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="expected_salary" className="block text-sm font-medium text-gray-700">Expected Salary</label>
                    <input
                      type="number"
                      name="expected_salary"
                      id="expected_salary"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      value={formData.expected_salary}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="preferred_location" className="block text-sm font-medium text-gray-700">Preferred Location</label>
                    <input
                      type="text"
                      name="preferred_location"
                      id="preferred_location"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      value={formData.preferred_location}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Resume (PDF only)</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H8m36-12h-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            accept=".pdf"
                            onChange={handleFileChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        {/* Display selected file name */}
                      {formData.resume_file ? `Selected File: ${formData.resume_file.name}` : "PDF up to 10MB" }


                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="px-4 py-3 bg-gray-50 text-right flex justify-between border-t border-gray-200">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Previous
              </button>
            ) : (
              <div></div>
            )}

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Next
              </button>
            ) : (
              <button
                onClick={(e) => handleSubmit(e)}
                type="button"
                className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
              >
                Submit Application
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CandidateApplicationForm;
