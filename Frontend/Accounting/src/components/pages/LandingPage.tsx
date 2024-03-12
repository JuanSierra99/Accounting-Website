import { useNavigate } from "react-router-dom";

// Landing page with links to login and register page
const LandingPage = () => {
  const navigate = useNavigate();

  const handleLoginButtonClick = () => {
    navigate("/login");
  };

  const handleRegisterButtonClick = () => {
    navigate("/register");
  };

  return (
    <>
      <h1>Here is my landing page doing landing page stuff</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button onClick={handleLoginButtonClick}>Login</button>
        <button onClick={handleRegisterButtonClick}>Register</button>
      </div>
    </>
  );
};

export default LandingPage;
