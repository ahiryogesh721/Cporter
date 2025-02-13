import React from "react";

const page: React.FC = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Facebook Authentication with MERN (TypeScript)</h1>
      <a href="http://localhost:5000/auth/facebook">
        <button>Login with Facebook</button>
      </a>
    </div>
  );
};

export default page;
