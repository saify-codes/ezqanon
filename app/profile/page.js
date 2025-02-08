"use client";

import Base from "@/layout/base";
import Avatar from "@/components/profile/avatar";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";

export default function Profile() {
  const { user } = useAuth();

  // React Hook Form Setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle Profile Update (Basic Validation)
  const updateProfile = (data) => {
    if (!data.name.trim()) {
      alert("Full Name is required!");
      return;
    }

    console.log("Updating profile:", data);
    // Simulate API call
  };

  // Handle Password Change (Basic Validation)
  const changePassword = (data) => {
    if (!data.password || data.password.length < 6) {
      alert("Password must be at least 6 characters!");
      return;
    }
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Changing password...");
    // Simulate API call
  };

  return (
    <Base>
      <section className="profile section">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 mb-5 mb-lg-0">
              <Avatar/>
            </div>
            <div className="col-lg-9">
              <form>
                <fieldset className="mb-5">
                  <legend>Personal information</legend>
                  <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" value={user?.email} readOnly disabled/>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Contact phone</label>
                    <input type="tel" className="form-control" value={user?.phone}/>
                  </div>
                  <button type="submit" className="btn btn-secondary">
                    Save
                  </button>
                </fieldset>

                <fieldset>
                  <legend>Change password</legend>
                  <div className="mb-3">
                    <label className="form-label">New Password</label>
                    <input type="password" className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" />
                  </div>

                  <button type="submit" className="btn btn-secondary">
                    Change password
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
}