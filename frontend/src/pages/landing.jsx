import { Link, useNavigate } from "react-router-dom";

function LandingPage() {
  const router = useNavigate();
  return (
    <div className="landingpageContainer">
      <nav>
        <div className="nav-heading">
          <h2>ZoomX</h2>
        </div>
        <div className="nav-list">
          <p
            onClick={() => {
              router("/guest");
            }}
          >
            Join as guest
          </p>
          <p
            onClick={() => {
              router("/auth");
            }}
          >
            Register
          </p>
          <div role="button">
            <p
              onClick={() => {
                router("/auth");
              }}
            >
              Login
            </p>
          </div>
        </div>
      </nav>

      <div className="landingMainContainer">
        <div>
          <h1>
            <span style={{ color: "#FF9839" }}>Connect</span> With your <br />{" "}
            Loved Ones
          </h1>
          <p>Cover a distance by ZoomX</p>
          <div role="button">
            <Link to={"/auth"}>Get started</Link>
          </div>
        </div>

        <div>
          <img src="/mobile.png" />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
