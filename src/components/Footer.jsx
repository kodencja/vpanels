import React from "react";
import("../css/footer.css");

function Footer({ onModalOpen }) {
  console.log("Footer Fn");
  return (
    <footer className="down-buttons text-center">
      <button type="link" className="btn-down home-page-link shadow-mid-dark">
        <a
          href="https://codencja.herokuapp.com/"
          target="_blank"
          rel="noreferrer"
        >
          Back to Home Page
        </a>
      </button>

      <div>
        {" "}
        &copy; 2021<i>&#160;by&#160;</i> Codencja
      </div>
      <button type="link" className="btn-down home-page-link shadow-mid-dark">
        <a
          href="https://codencja.herokuapp.com/"
          target="_blank"
          rel="noreferrer"
        >
          See the code
        </a>
      </button>
    </footer>
  );
}

export default React.memo(Footer);
