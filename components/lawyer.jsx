import { BsStar, BsStarFill } from "react-icons/bs";
import styles from "./lawyer.module.css";

export default function LawyerCard({ avatar, name, qualification, rating, className }) {
  return (
    <div className={`${styles.lawyer} ${className}`}>
      <div className={styles.avatar}>
        <img className="img-fluid" src={avatar} alt={`${name}'s profile`} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{name}</h3>
        <small className={styles.qualification}>{qualification}</small>
        <div className="d-flex gap-1 mt-2">
          {Array(5)
            .fill()
            .map((_, index) =>
              index < rating ? (
                <BsStarFill key={index} className={styles.star} />
              ) : (
                <BsStar key={index} className={styles.star} />
              )
            )}
        </div>
      </div>
      <div className={styles.action}>
        <a href="#" className="btn btn-outline-info">
          View Profile
        </a>
        <a href="#" className="btn btn-warning text-light">
          Book Appointment
        </a>
      </div>
    </div>
  );
}
