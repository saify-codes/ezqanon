import styles from "./lawyer.module.css";

export default function () {
  return (
    <div className={styles.lawyer}>
      <div className={styles.avatar}>
        <img
          className="img-fluid"
          src="https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611765.jpg"
          alt="lawyer"
        />
      </div>
      <div>
        <h3 className="title">Muhammad Waqas</h3>
        <p className="qualification">BBA</p>
      </div>

      <div className={styles.action}>
        <a href="#" className="btn btn-outline-info">
            View profile
        </a>
        <a href="#" className="btn btn-warning">
            Book appointment
        </a>
      </div>
    </div>
  );
}
