"use client";

import Base from "@/layout/base";
import { useParams } from "next/navigation";

export default function () {
  const { id } = useParams();

  return <Base>
  <div className="container my-5">
    {/*  Profile Card  */}
    <div className="profile-card p-4">
        <div className="row align-items-center">
            <div className="col-md-3 text-center">
                <img src="https://via.placeholder.com/150" className="rounded-circle img-fluid" alt="Lawyer Image"/>
            </div>
            <div className="col-md-9">
                <h2 id="lawyerName">John Doe</h2>
                <p><strong>Email:</strong> <span id="lawyerEmail">johndoe@example.com</span></p>
                <p><strong>Qualification:</strong> <span id="lawyerQualification">LLB, Harvard University</span></p>
            </div>
        </div>
    </div>

    {/*  Tab Menu  */}
    <ul className="nav nav-tabs mt-4" id="profileTab" role="tablist">
        <li className="nav-item">
            <button className="nav-link active" id="desc-tab" data-bs-toggle="tab" data-bs-target="#desc" type="button" role="tab">Description</button>
        </li>
        <li className="nav-item">
            <button className="nav-link" id="ratings-tab" data-bs-toggle="tab" data-bs-target="#ratings" type="button" role="tab">Ratings</button>
        </li>
        <li className="nav-item">
            <button className="nav-link" id="faqs-tab" data-bs-toggle="tab" data-bs-target="#faqs" type="button" role="tab">FAQs</button>
        </li>
    </ul>

    {/*  Tab Content  */}
    <div className="tab-content p-3 border bg-white">
        {/*  Description Tab  */}
        <div className="tab-pane fade show active" id="desc" role="tabpanel">
            <p>John Doe is a highly experienced lawyer with 15+ years of experience in corporate law, civil rights, and criminal defense.</p>
        </div>

        {/*  Ratings Tab  */}
        <div className="tab-pane fade" id="ratings" role="tabpanel">
            <p>⭐ ⭐ ⭐ ⭐ ⭐ (4.8/5)</p>
            <p>Based on 120 client reviews.</p>
        </div>

        {/*  FAQs Tab  */}
        <div className="tab-pane fade" id="faqs" role="tabpanel">
            <p><strong>Q: What are your practice areas?</strong></p>
            <p>A: Corporate law, civil rights, and criminal defense.</p>

            <p><strong>Q: How can I schedule a consultation?</strong></p>
            <p>A: You can schedule a consultation via email or phone.</p>
        </div>
    </div>
</div>
  </Base>
}



