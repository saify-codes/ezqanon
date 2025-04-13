"use client"

import { useForm, Controller } from "react-hook-form"
import { useAuth } from "@/hooks/useAuth"
import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { flashMessage, withLoader } from "@/utils"
import { FaArrowLeftLong } from "react-icons/fa6"
import Link from "next/link"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"


export default function SignUp() {
  const [state, setState] = useState({
    alert: { type: "", message: "" },
    countryCode: "",
    otp: "",
    isOtpVerified: false,
    showOtpField: false,
    isValidPhone: false,
    isLoading: false
  })
  
  const { register, handleSubmit, control, watch, formState: { errors } } = useForm()
  const auth    = useAuth()
  const router  = useRouter()
  const refs    = {sendOtp: useRef(null), verifyOtp: useRef(null)}
  const FORM_VALIDATION = {
    name: { required: "Name is required" },
    email: {
      required: "Email is required",
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        message: "Enter a valid email"
      }
    },
    phone: {
      required: "Phone number is required",
      minLength: { value: 10, message: "Phone number must be at least 10 digits" },
      pattern: { value: /^[0-9]{10,15}$/, message: "Enter a valid phone number" }
    },
    password: {
      required: "Password is required",
      minLength: { value: 6, message: "Password must be at least 6 characters" }
    },
    password_confirmation: {
      required: "Confirm password is required",
      validate: value => value === watch("password") || "Passwords do not match"
    }
    
  }

  const handleOtpOperation = async (operation, btnRef) => {
    try {
      const actions = {
        send: () => auth.sendOtp(`+${watch('phone')}`, state.countryCode),
        verify: () => auth.verifyOtp(state.otp, watch('phone'))
      }

      await withLoader(actions[operation], isLoading => {
        btnRef.current.disabled = isLoading
        btnRef.current.innerText = isLoading ? `${operation}ing...` : `${operation} otp`
      })

      setState(prev => ({
        ...prev,
        showOtpField: operation === 'send' ? true : prev.showOtpField,
        isOtpVerified: operation === 'verify' ? true : prev.isOtpVerified
      }))
    } catch (error) {
      console.error(error.response?.data.message || "Operation failed")
    }
  }

  const onSubmit = async (data) => {
    if (!state.isOtpVerified) {
      alert('Please verify your phone number first')
      return
    }

    try {
      await withLoader(
        () => auth.signup({ ...data, country_code: state.countryCode }), 
        isLoading => setState(prev => ({ ...prev, isLoading }))
      )
      flashMessage("success", `Verification link sent to ${data.email}`)
      router.replace("/signin")
    } catch (error) {
      setState(prev => ({
        ...prev,
        alert: {
          type: "danger",
          message: error.response?.data.message || "Signup failed"
        }
      }))
    }
  }

  const renderFormField = (title, name, type = "text", placeholder, props = {}) => (
    <div className="mb-3">
      <label className="form-label">{title}</label>
      <input
        type={type}
        className="form-control"
        placeholder={placeholder || `enter ${title}`}
        {...register(name, FORM_VALIDATION[name])}
        {...props}
      />
      {errors[name] && (
        <small className="text-danger d-block mt-2">{errors[name].message}</small>
      )}
    </div>
  )

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="login-card col-12 col-md-6 col-lg-4">
        <header className="text-center mb-4">
          <img src="/assets/img/logo.png" alt="Logo" className="mb-3" width="80" />
          <h3 className="fw-bold">Client Portal</h3>
          <p className="text-muted">Secure access for legal professionals</p>
        </header>

        {state.alert.message && (
          <div className={`alert alert-${state.alert.type}`} role="alert"
            dangerouslySetInnerHTML={{ __html: state.alert.message }} />
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {renderFormField("Name", "name", "text", "enter name")}
          {renderFormField("Email", "email", "email", "enter email")}

          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <div className="d-flex gap-2">
              <Controller
                name="phone"
                control={control}
                defaultValue=""
                rules={FORM_VALIDATION.phone}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <div className="flex-grow-1">
                    <PhoneInput
                      country="pk"
                      inputClass="form-control w-100"
                      onChange={(phone, country) => {
                        setState(prev => ({
                          ...prev,
                          countryCode: country.dialCode,
                          isValidPhone: phone.length >= 10
                        }))
                        onChange(phone)
                      }}
                      value={value}
                      disabled={state.showOtpField}
                    />
                    {error && <small className="text-danger d-block mt-2">{error.message}</small>}
                  </div>
                )}
              />
              <button 
                ref={refs.sendOtp}
                type="button"
                className="btn btn-sm btn-primary"
                disabled={state.showOtpField || !state.isValidPhone}
                onClick={() => handleOtpOperation('send', refs.sendOtp)}
              >
                send otp
              </button>
            </div>
          </div>

          {state.showOtpField && (
            <div className="mb-3">
              <label className="form-label">OTP</label>
              <div className="d-flex gap-2">
                <input
                  type="text"
                  className="form-control w-auto flex-grow-1"
                  placeholder="enter otp"
                  maxLength="6"
                  value={state.otp}
                  onChange={e => setState(prev => ({ ...prev, otp: e.target.value.replace(/\D/g, '') }))}
                />
                <button 
                  ref={refs.verifyOtp}
                  type="button"
                  className="btn btn-sm btn-success"
                  onClick={() => handleOtpOperation('verify', refs.verifyOtp)}
                >
                  verify otp
                </button>
              </div>
            </div>
          )}

          {renderFormField("Password", "password", "password", "enter password")}
          {renderFormField("Confirm password", "password_confirmation", "password", "confirm password")}
          
          <button
            type="submit"
            className="btn btn-primary w-100 py-2"
            disabled={state.isLoading}
          >
            {state.isLoading ? (
              <span className="spinner-border spinner-border-sm" />
            ) : "Create account"}
          </button>
        </form>

        <footer className="text-center mt-3">
          <div>
            Already have an account? Login <Link href="/signin" className="text-decoration-underline">here</Link>
          </div>
          <Link className="nav-link mt-3" href="/">
            <FaArrowLeftLong /> Back to home
          </Link>
        </footer>
      </div>
    </div>
  )
}
