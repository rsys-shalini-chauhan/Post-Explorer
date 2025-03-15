const SkeletonPostDetail = () => {
  return (
    <div className="post-detail skeleton">
      <div
        className="skeleton-title"
        style={{ height: "60px", width: "80%", marginBottom: "20px" }}
      ></div>
      <div className="post-content" style={{ height: "280px" }}>
        <div
          className="skeleton-body"
          style={{ height: "100%", marginBottom: "0" }}
        ></div>
      </div>
      <div className="post-meta" style={{ height: "50px" }}>
        <div
          className="skeleton-meta"
          style={{ height: "18px", width: "40%", marginBottom: "10px" }}
        ></div>
        <div
          className="skeleton-meta"
          style={{ height: "18px", width: "30%" }}
        ></div>
      </div>
    </div>
  );
};

export default SkeletonPostDetail;
