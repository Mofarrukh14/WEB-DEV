"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import './globals.css';


const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm();

  // Watch form values to display them in the final step
  const formData = watch(); // Watch all form values

  // Handle form submission
  const onSubmit = (data) => {
    console.log(data);
    // You can send this data to your backend or do further processing here
  };

  // Move to the next step
  const nextStep = () => setStep((prevStep) => prevStep + 1);

  // Move to the previous step
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  return (
    <div className="form-container">
      <div className="background-overlay"></div>
      <div className="form-content">
        <h1>Apply for DHA Membership</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className="step">
              <h2>Step 1: Personal Information</h2>
              <div>
                <label>Name</label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && <p>{errors.name.message}</p>}
              </div>
              <div>
                <label>Father's Name</label>
                <input
                  type="text"
                  {...register("fatherName", {
                    required: "Father's name is required"
                  })}
                />
                {errors.fatherName && <p>{errors.fatherName.message}</p>}
              </div>
              <div>
                <label>CNIC</label>
                <input
                  type="text"
                  {...register("cnic", {
                    required: "CNIC is required",
                    pattern: {
                      value: /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/,
                      message: "CNIC must be in the format XXXXX-XXXXXXX-X"
                    }
                  })}
                />
                {errors.cnic && <p>{errors.cnic.message}</p>}
              </div>
              <div className="step-buttons">
                <button type="button" onClick={handleSubmit(nextStep)}>
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Professional Data */}
          {step === 2 && (
            <div className="step">
              <h2>Step 2: Professional Data</h2>
              <div>
                <label>Profession</label>
                <input
                  type="text"
                  {...register("profession", {
                    required: "Profession is required"
                  })}
                />
                {errors.profession && <p>{errors.profession.message}</p>}
              </div>
              <div>
                <label>Employer</label>
                <input
                  type="text"
                  {...register("employer", { required: "Employer is required" })}
                />
                {errors.employer && <p>{errors.employer.message}</p>}
              </div>
              <div>
                <label>Job Title</label>
                <input
                  type="text"
                  {...register("jobTitle", { required: "Job title is required" })}
                />
                {errors.jobTitle && <p>{errors.jobTitle.message}</p>}
              </div>
              <div className="step-buttons">
                <button type="button" onClick={prevStep}>
                  Back
                </button>
                <button type="button" onClick={handleSubmit(nextStep)}>
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Family Information */}
          {step === 3 && (
    <div className="step">
      <h2>Step 3: Family Information</h2>
      
      <div>
        <label>Spouse's Name</label>
        <input
          type="text"
          {...register("spouseName", { required: "Spouse's name is required" })}
        />
        {errors.spouseName && <p>{errors.spouseName.message}</p>}
      </div>

      {/* Number of Children */}
      <div style={{ marginTop: "20px" }}> {/* Gap Added */}
        <label>Number of Children</label>
        <input
          type="number" /* Ensures only numbers can be typed */
          {...register("childrenCount", {
            required: "Number of children is required",
            min: { value: 0, message: "Number of children cannot be negative" },
          })}
        />
        {errors.childrenCount && <p>{errors.childrenCount.message}</p>}
      </div>

      {/* Parents' Contact Info */}
      <div style={{ marginTop: "20px" }}> {/* Gap Added */}
        <label>Parents' Contact Info</label>
        <input
          type="text"
          {...register("parentsContact", {
            required: "Parents' contact information is required",
            pattern: {
              value: /^[0-9]*$/, /* Ensures only numeric values are allowed */
              message: "Contact info must contain numeric values only",
            },
          })}
        />
        {errors.parentsContact && <p>{errors.parentsContact.message}</p>}
      </div>

      <div className="step-buttons">
        <button type="button" onClick={prevStep}>Back</button>
        <button type="button" onClick={handleSubmit(nextStep)}>Next</button>
      </div>
    </div>
  )}

          {/* Step 4: Contact Information */}
          {step === 4 && (
            <div className="step">
              <h2>Step 4: Contact Information</h2>
              <div>
                <label>Phone Number</label>
                <input
                  type="text"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]*$/,
                      message: "Phone number must be numeric only"
                    }
                  })}
                />
                {errors.phone && <p>{errors.phone.message}</p>}
              </div>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email format"
                    }
                  })}
                />
                {errors.email && <p>{errors.email.message}</p>}
              </div>
              <div>
                <label>Address</label>
                <input
                  type="text"
                  {...register("address", { required: "Address is required" })}
                />
                {errors.address && <p>{errors.address.message}</p>}
              </div>
              <div className="step-buttons">
                <button type="button" onClick={prevStep}>
                  Back
                </button>
                <button type="button" onClick={handleSubmit(nextStep)}>
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Confirmation and Display Data */}
          {step === 5 && (
            <div className="step">
              <h2>Step 5: Confirmation</h2>
              <h3>Review Your Details</h3>
              <div>
                <p>
                  <strong>Name:</strong> {formData.name}
                </p>
                <p>
                  <strong>Father's Name:</strong> {formData.fatherName}
                </p>
                <p>
                  <strong>CNIC:</strong> {formData.cnic}
                </p>
                <p>
                  <strong>Profession:</strong> {formData.profession}
                </p>
                <p>
                  <strong>Employer:</strong> {formData.employer}
                </p>
                <p>
                  <strong>Job Title:</strong> {formData.jobTitle}
                </p>
                <p>
                  <strong>Spouse's Name:</strong> {formData.spouseName}
                </p>
                <p>
                  <strong>Children Count:</strong> {formData.childrenCount}
                </p>
                <p>
                  <strong>Parents' Contact Info:</strong>{" "}
                  {formData.parentsContact}
                </p>
                <p>
                  <strong>Phone Number:</strong> {formData.phone}
                </p>
                <p>
                  <strong>Email:</strong> {formData.email}
                </p>
                <p>
                  <strong>Address:</strong> {formData.address}
                </p>
              </div>
              <div className="step-buttons">
                <button type="button" onClick={prevStep}>
                  Back
                </button>
                <button type="submit">Submit</button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default MultiStepForm;
