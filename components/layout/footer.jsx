import { BsFacebook, BsInstagram, BsTwitterX } from "react-icons/bs";

export default function () {
  return (
    <footer id="footer" className="footer">
      <div className="container footer-top">
        <div className="row gy-4 justify-content-between">
          <div className="col-lg-4 col-md-6 footer-about d-flex flex-column justify-content-between">
            <a href="index.html" className="d-flex align-items-center mb-3">
              <span className="sitename">
                {process.env.NEXT_PUBLIC_APP_NAME}
              </span>
            </a>
            <div className="footer-contact pt-3">
              <p>
                Book consultations with the best Lawyers and Legal Experts such
                as Corporate Lawyers, Family Lawyers, Criminal Lawyers, Tax
                Lawyers, etc. Access legal services like case filing, document
                drafting, legal advice, etc. and Online Lawyer Consultations all
                across Pakistan conveniently.
              </p>
              <div className="footer-contact pt-3">
              <p>
                <strong>Address:</strong> <span> 32 Street 1, Sector 2,
                <p> Airport Employees CHS, Rawalpindi, Pakistan</p></span>
              </p>
              <p>
                <strong>Address:</strong> <span> 1751, Pinnacle Drive, Suite 600,
                <p>Mclean VA 22102,USA</p></span>
              </p>
              </div>
              <p className="mt-3">
                <strong>Phone:</strong> <span>+1 (703) 628-0001</span>
              </p>
            
            </div>
          </div>
          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Courts</h4>
            <ul>
              <li>
                <i className="bi bi-chevron-right"></i>{" "}
                <a href="#">Supreme Court</a>
              </li>
              <li>
                <i className="bi bi-chevron-right"></i>{" "}
                <a href="#">Lahore High Court</a>
              </li>
              <li>
                <i className="bi bi-chevron-right"></i>{" "}
                <a href="#">Sindh High Court</a>
              </li>
              <li>
                <i className="bi bi-chevron-right"></i>{" "}
                <a href="#">Islamabad High Court</a>
              </li>
              <li>
                <i className="bi bi-chevron-right"></i>{" "}
                <a href="#">Peshawar High Court</a>
              </li>
              <li>
                <i className="bi bi-chevron-right"></i>{" "}
                <a href="#">Balochistan High Court</a>
              </li>
              <li>
                <i className="bi bi-chevron-right"></i>{" "}
                <a href="#">Federal Shariat Court</a>
              </li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Cause List</h4>
            <ul>
              <li>
                <i className="bi bi-chevron-right"></i>{" "}
                <a href="#">Supreme Court</a>
              </li>
              <li>
                <i className="bi bi-chevron-right"></i>{" "}
                <a href="#">Lahore High Court</a>
              </li>
              <li>
                <i className="bi bi-chevron-right"></i>{" "}
                <a href="#">Sindh High Court</a>
              </li>
              <li>
                <i className="bi bi-chevron-right"></i>{" "}
                <a href="#">Islamabad High Court</a>
              </li>
              <li>
                <i className="bi bi-chevron-right"></i>{" "}
                <a href="#">Peshawar High Court</a>
              </li>
              <li>
                <i className="bi bi-chevron-right"></i>{" "}
                <a href="#">Balochistan High Court</a>
              </li>
              <li>
                <i className="bi bi-chevron-right"></i>{" "}
                <a href="#">Federal Shariat Court</a>
              </li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-3 footer-links">
            <h4>District Judiciary</h4>
            <ul>
              <li>
                <i className="bi bi-chevron-right"></i> <a href="#">Punjab</a>
              </li>
              <li>
                <i className="bi bi-chevron-right"></i>{" "}
                <a href="#">Balochistan</a>
              </li>
              <li>
                <i className="bi bi-chevron-right"></i> <a href="#">Sindh</a>
              </li>
              <li>
                <i className="bi bi-chevron-right"></i> <a href="#">KPK</a>
              </li>
              <li>
                <i className="bi bi-chevron-right"></i> <a href="#">AJK</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        className="container copyright mt-4"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          paddingTop: "20px",
        }}
      >
        {/* Left Side - Copyright */}
        <p style={{ margin: 0 }}>
          © <span>Copyright</span>{" "}
          <strong className="px-1 sitename">
            {process.env.NEXT_PUBLIC_APP_NAME}
          </strong>{" "}
          <span>All Rights Reserved</span>
        </p>

        {/* Right Side - Social Links */}
        <div
          className="social-links"
          style={{
            display: "flex",
            gap: "10px",
            marginLeft: "auto",
          }}
        >
          <a
            href=""
            style={{
              fontSize: "18px",
              padding: "8px",
              borderRadius: "50%",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BsTwitterX />
          </a>
          <a
            href=""
            style={{
              fontSize: "18px",
              padding: "8px",
              borderRadius: "50%",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BsFacebook />
          </a>
          <a
            href=""
            style={{
              fontSize: "18px",
              padding: "8px",
              borderRadius: "50%",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BsInstagram />
          </a>
        </div>

        <div className="credits"></div>
      </div>
    </footer>
  );
}
