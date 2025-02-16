"use client";

import useAuthFetch from "@/hooks/useAuthFetch";
import Base from "@/layout/base";
import { withLoader } from "@/utils";
import { useEffect, useState } from "react";
import { LiaExternalLinkAltSolid } from "react-icons/lia";
import { toast } from "react-toastify";

export default function AppointmentsPage() {
  const api = useAuthFetch();
  const [isLoading, setIsLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const { data } = await withLoader(
        () => api.get("/appointment"),
        setIsLoading
      );
      setAppointments(data.data);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    // Fetch appointments on mount
    fetchAppointments();
  }, []);

  return (
    <Base>
      <div className="table-responsive container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Lawyer</th>
              <th scope="col">Details</th>
              <th scope="col">Date</th>
              <th scope="col">Meeting link</th>
              <th scope="col">Attachment</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center">
                  No appointments found
                </td>
              </tr>
            ) : (
              appointments.map(
                ({ lawyer, details, meeting_date, meeting_link, attachments }) => (
                  <tr key={meeting_date /* or some unique ID */}>
                    <td>{lawyer?.name}</td>
                    <td>{details}</td>
                    <td>{meeting_date}</td>
                    <td>
                      <a className="link" href={meeting_link} target="_blank">
                        google meet <LiaExternalLinkAltSolid />
                      </a>
                    </td>
                    <td>
                      {attachments?.map(({ original_name, file_path }) => (
                        <a key={file_path} className="d-block" href={file_path} target="_blank">
                          {original_name}
                        </a>
                      ))}
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </Base>
  );
}
