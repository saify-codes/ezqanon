import { BsStar, BsStarFill } from "react-icons/bs";
import styles from "./lawyer.module.css";

export default function LawyerCard(props) {
  const { avatar, name, qualification, rating, className } = props;

  return (
    <div className={`${styles.lawyer} ${className}`}>
      <div className={styles.avatar}>
        <img className="img-fluid" src={avatar} alt="lawyer" />
      </div>
      <div>
        <h3 className={styles.title}>{name}</h3>
        <small className={styles.qualification}>{qualification}</small>
        <div className="d-flex gap-1 mt-2">
          {[...Array(5)].map((_, index) =>
            index < rating ? (
              <BsStarFill key={index} style={{color:'#FFD700'}}/>
            ) : (
              <BsStar key={index} style={{color:'#FFD700'}}/>
            )
          )}
        </div>
      </div>

      <div className={styles.action}>
        <a href="#" className="btn btn-outline-info rounded-0">
          View profile
        </a>
        <a href="#" className="btn btn-warning rounded-0 text-light">
          Book appointment
        </a>
      </div>
    </div>
  );
}
