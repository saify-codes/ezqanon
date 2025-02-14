import useAuthFetch from "@/hooks/useAuthFetch";
import styled from "styled-components";
import styles from "./avatar.module.css";
import { useState } from "react";
import { BsPencil } from "react-icons/bs";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-toastify";
import { withLoader } from "@/utils";

export default function Avatar() {
  const { user, updateUserSessionData } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const api = useAuthFetch();
  const maxFileSize = 2 * 1024 * 1024; // 2MB limit

  // Function to Upload Image to Server
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);
    try {
      const { data } = await withLoader(
        () =>
          api.post("/upload/avatar", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }),
        setIsUploading
      );

      toast.success(data.message);
      updateUserSessionData({ avatar: data.url });
    } catch (error) {
      toast.error(error.response?.data.message || "something went wrong");
    }
  };

  // Function to Open File Dialog
  const openFilePicker = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/jpeg, image/png"; // Only allow image files

    // Handle File Selection
    fileInput.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        if (file.size > maxFileSize) {
          toast.error("File size exceeds 2MB. Please select a smaller file.");
          return;
        }
        uploadImage(file); // Send image to server
      } else {
        fileInput.remove();
      }
    };

    fileInput.click(); // Programmatically trigger file selection
  };

  return (
    <div className={styles.avatar}>
      {/* Avatar Image */}
      <img
        className="img-fluid rounded-circle border"
        src={user?.avatar}
        alt="User Avatar"
      />

      {/* Clickable Pencil Icon to Change Avatar */}
      <button onClick={openFilePicker}>
        <BsPencil size={25} color="#FFF" />
      </button>

      {isUploading && (
        <Loader>
          <div className="spinner-border"></div>
        </Loader>
      )}
    </div>
  );
}

const Loader = styled.div`
  position: absolute;
  inset: 0;
  background: #0003;
  display: grid;
  place-content: center;
  z-index: 999;
`;
