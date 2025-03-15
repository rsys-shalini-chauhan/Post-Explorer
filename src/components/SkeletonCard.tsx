import styles from "./SkeletonCard.module.css";
import cardStyles from "./PostCard.module.css";

const SkeletonCard = () => {
  return (
    <div className={`${cardStyles.postCard} ${styles.skeleton}`}>
      <div className={styles.skeletonTitle}></div>
      <div className={styles.skeletonBody}></div>
      <div className={styles.skeletonButton}></div>
    </div>
  );
};

export default SkeletonCard;
