"use client";

import useAuthFetch from "@/hooks/useAuthFetch";
import Base from "@/layout/base";
import Avatar from "@/components/profile/avatar";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function Profile() {
  const { user } = useAuth();
  const api = useAuthFetch()

  // -------------------------------
  // Personal Information Form
  // -------------------------------
  const {
    register: registerPersonal,
    handleSubmit: handleSubmitPersonal,
    reset: resetPersonal,
    formState: { dirtyFields: dirtyFieldsPersonal, errors: errorsPersonal },
  } = useForm();

  // Check if any personal info field is dirty (edited)
  const isPersonalInfoDirty = !!dirtyFieldsPersonal.name || !!dirtyFieldsPersonal.phone;

  // Personal info submission handler
  const onSubmitPersonalInfo = async (data) => {
    try {
      await api.put('/profile', data)
      toast.success('profile updated')
    } catch (error) {
      toast.error(error.response?.message || "Something went wrong")
    }
    resetPersonal(data)
  };

  // -------------------------------
  // Password Change Form
  // -------------------------------
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    reset: resetPassword,
    watch: watchPassword,
    formState: { dirtyFields: dirtyFieldsPassword, errors: errorsPassword },
  } = useForm();

  // Watch newPassword to validate confirmPassword
  const newPasswordValue = watchPassword("password");

  // Check if any password field is dirty
  const isPasswordDirty =!!dirtyFieldsPassword.password || !!dirtyFieldsPassword.password_confirmation;

  // Password submission handler
  const onSubmitPassword = async (data) => {
    try {
      await api.put('/password', data)
      toast.success('password changed')
    } catch (error) {
      toast.error(error.response?.message || "Something went wrong")
    }
    resetPassword();
  };

  // When user data becomes available, update the default values
  useEffect(() => {
    if (user) {
      resetPersonal({
        email: user.email,
        name: user.name,
        phone: user.phone,
      });
    }
  }, [user, resetPersonal]);

  return (
    <Base>
      <section className="profile section">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 mb-5 mb-lg-0">
              <Avatar />
            </div>
            <div className="col-lg-9">
              {/* Personal Information Form */}
              <form onSubmit={handleSubmitPersonal(onSubmitPersonalInfo)}>
                <fieldset className="mb-5">
                  <legend>Personal information</legend>

                  <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      {...registerPersonal("email")}
                      readOnly
                      disabled
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      {...registerPersonal("name", {
                        required: "Name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters",
                        },
                      })}
                    />
                    {errorsPersonal.name && (
                      <small className="text-danger mt-2">
                        {errorsPersonal.name.message}
                      </small>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Contact phone</label>
                    <input
                      type="tel"
                      className="form-control"
                      {...registerPersonal("phone", {
                        required: "Phone is required",
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "Phone must contain only digits",
                        },
                      })}
                    />
                    {errorsPersonal.phone && (
                      <small className="text-danger mt-2">
                        {errorsPersonal.phone.message}
                      </small>
                    )}
                  </div>

                  {/* Render Save button only if any personal info field has been changed */}
                  {isPersonalInfoDirty && (
                    <button type="submit" className="btn btn-secondary">
                      Save
                    </button>
                  )}
                </fieldset>
              </form>

              {/* Password Change Form */}
              <form onSubmit={handleSubmitPassword(onSubmitPassword)}>
                <fieldset>
                  <legend>Change password</legend>

                  <div className="mb-3">
                    <label className="form-label">New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      {...registerPassword("password", {
                        required: "New password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                    />
                    {errorsPassword.newPassword && (
                      <small className="text-danger mt-2">
                        {errorsPassword.newPassword.message}
                      </small>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      {...registerPassword("password_confirmation", {
                        required: "Confirm password is required",
                        validate: (value) =>
                          value === newPasswordValue || "Passwords do not match",
                      })}
                    />
                    {errorsPassword.confirmPassword && (
                      <small className="text-danger mt-2">
                        {errorsPassword.confirmPassword.message}
                      </small>
                    )}
                  </div>

                  {/* Render Change Password button only if any password field has been changed */}
                  {isPasswordDirty && (
                    <button type="submit" className="btn btn-secondary">
                      Change password
                    </button>
                  )}
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
}