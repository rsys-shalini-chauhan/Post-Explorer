import styles from "./SkeletonPostDetail.module.css";
import detailStyles from "./PostDetail.module.css";

const SkeletonPostDetail = () => {
  return (
    <div className={`${detailStyles.postDetail} ${styles.skeleton}`}>
      <div
        className={styles.skeletonTitle}
        style={{ height: "60px", width: "80%", marginBottom: "20px" }}
      ></div>
      <div className={detailStyles.content} style={{ height: "280px" }}>
        <div
          className={styles.skeletonBody}
          style={{ height: "100%", marginBottom: "0" }}
        ></div>
      </div>
      <div className={detailStyles.meta} style={{ height: "50px" }}>
        <div
          className={styles.skeletonMeta}
          style={{ height: "18px", width: "40%", marginBottom: "10px" }}
        ></div>
        <div
          className={styles.skeletonMeta}
          style={{ height: "18px", width: "30%" }}
        ></div>
      </div>
    </div>
  );
};

export default SkeletonPostDetail;
