import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RegistrationForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    country: "",
    city: "",
    phone: "",
    pan: "",
    aadhaar: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const countries = ["India", "USA", "UK", "Australia"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const newErrors = {};

    Object.entries(form).forEach(([key, value]) => {
      if (!value.trim()) newErrors[key] = "Required";
    });

    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (form.phone && !/^\+?\d{10,14}$/.test(form.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    if (form.pan && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(form.pan.toUpperCase())) {
      newErrors.pan = "Invalid PAN format";
    }
// Password validation
if (form.password && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(form.password)) {
  newErrors.password = "Password must be 8+ chars, include upper, lower, digit & special char";
}

    if (form.aadhaar && !/^\d{12}$/.test(form.aadhaar)) {
      newErrors.aadhaar = "Invalid Aadhaar format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    setIsValid(validate());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate("/details", { state: form });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="registration-form">
      <h2>User Registration</h2>

      {[
        { label: "First Name", name: "firstName", type: "text" },
        { label: "Last Name", name: "lastName", type: "text" },
        { label: "Username", name: "username", type: "text" },
        { label: "Email", name: "email", type: "email" },
        { label: "City", name: "city", type: "text" },
        { label: "PAN", name: "pan", type: "text" },
        { label: "Aadhaar", name: "aadhaar", type: "text" },
      ].map((field) => (
        <div key={field.name} className="input-container">
          <label>
            {field.label} <span className="required">*</span>
          </label>
          <input
            type={field.type}
            name={field.name}
            value={form[field.name]}
            onChange={handleChange}
            onBlur={() => setTouched({ ...touched, [field.name]: true })}
            className={errors[field.name] && touched[field.name] ? "error" : ""}
          />
          {errors[field.name] && touched[field.name] && (
            <p className="error-text">{errors[field.name]}</p>
          )}
        </div>
      ))}

      {/* Password */}
      <div className="input-container password-container">
        <label>
          Password <span className="required">*</span>
        </label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={form.password}
          onChange={handleChange}
          onBlur={() => setTouched({ ...touched, password: true })}
          className={errors.password && touched.password ? "error" : ""}
        />
        <button
          type="button"
          className="show-btn"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
        {errors.password && touched.password && (
          <p className="error-text">{errors.password}</p>
        )}
      </div>

      {/* Country */}
      <div className="input-container">
        <label>
          Country <span className="required">*</span>
        </label>
        <select
          name="country"
          value={form.country}
          onChange={handleChange}
          onBlur={() => setTouched({ ...touched, country: true })}
          className={errors.country && touched.country ? "error" : ""}
        >
          <option value="">Select Country</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {errors.country && touched.country && (
          <p className="error-text">{errors.country}</p>
        )}
      </div>

      {/* Phone */}
      <div className="input-container">
        <label>
          Phone Number <span className="required">*</span>
        </label>
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          onBlur={() => setTouched({ ...touched, phone: true })}
          placeholder="+91"
          className={errors.phone && touched.phone ? "error" : ""}
        />
        {errors.phone && touched.phone && (
          <p className="error-text">{errors.phone}</p>
        )}
      </div>

      <button type="submit" disabled={!isValid} className="submit-btn">
        Submit
      </button>
    </form>
  );
}
