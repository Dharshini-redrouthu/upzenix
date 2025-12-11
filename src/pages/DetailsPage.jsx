import { useLocation, useNavigate } from "react-router-dom";

export default function DetailsPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #c3ecf9, #ffffff)",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "12px",
          width: "400px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Submitted Details
        </h2>
        <ul>
          {Object.entries(state).map(([key, value]) => (
            <li key={key}>
              <strong>{key.replace(/([A-Z])/g, " $1")}: </strong>
              {value}
            </li>
          ))}
        </ul>
        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "12px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#007bff",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
