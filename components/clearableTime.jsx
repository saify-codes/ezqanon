import { BsX } from "react-icons/bs";

export default function ClearableTime({ value, onChange, ...props }) {
  return (
    <div className="time-wrapper d-flex align-items-center gap-2">
      <input
        {...props}
        type="time"
        className="form-control m-0"
        value={value}
        onChange={onChange}
      />

      {value && (
        <button
          type="button"
          className="btn btn-sm btn-outline-danger rounded-0"
          onClick={() => onChange({ target: { value: "" } })}
          aria-label="Clear time"
        >
          <BsX size={25} />
        </button>
      )}
    </div>
  );
}
