import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "20vh",
        maxHeight: "30vh",
        marginTop: 60,
      }}
    >
      <p style={{ fontSize: "30px", textAlign: "center", padding: "20px" }}>
        Build with ❤️ by{""}
        <span>
          <Link
            style={{ color: "white" }}
            className="nav-link"
            to={"https://youtube.com"}
          >
            Rishi
          </Link>
        </span>
      </p>
    </div>
  );
};

export default Footer;
