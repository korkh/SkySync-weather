
const LoadingComponent = ({ content = "Loading..." }) => (
  <div style={{
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999
  }}>
    <div style={{ color: "white", fontSize: "1.5rem" }}>{content}</div>
  </div>
);


export default LoadingComponent;


