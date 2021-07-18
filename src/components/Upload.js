import React from "react";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";

function UploadDataForm(props){
    const addDataUrl= "http://localhost:8000/v1/upload/plain",

    const getUploadParams = ({ file, meta }) => {
        const body = new FormData();
        body.append("fileField", file);
        return {
          url: addDataUrl,
          body,
          headers: {
            // Authorization: localStorage.getItem("access_token"),
          },
        };
      };

      const handleSubmit = (files, allFiles) => {
        allFiles.forEach((f) => f.remove());
      };

    return (
        <Dropzone
        onSubmit={handleSubmit}
        getUploadParams={getUploadParams}
      />
    )

}

export default UploadDataForm
