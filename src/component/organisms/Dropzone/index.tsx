/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

interface DropzoneProps {
  onChange: (files: File[]) => void;
  error?: string;
}

function Dropzone({ onChange, error }: DropzoneProps) {
  const [files, setFiles] = useState<File[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      //check file size
      const maxSize = 5 * 1024 * 1024; // 5MB
      const isOverSize = acceptedFiles.some((file) => file.size > maxSize);
      if (isOverSize) {
        toast.error("File size is over 5MB");
        return;
      }
      onChange(acceptedFiles);
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });

  const thumbs = files.map((file: any) => (
    <div
      style={{
        display: "inline-flex",
        borderRadius: 2,
        border: "1px solid #eaeaea",
        marginBottom: 8,
        marginRight: 8,
        width: 100,
        height: 100,
        padding: 4,
        boxSizing: "border-box",
      }}
      key={file.name}
    >
      <div style={thumbInner}>
        <img
          src={file.preview as string}
          style={img}
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    return () =>
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <section className="container">
      <Box
        {...getRootProps({ className: "dropzone" })}
        sx={{
          padding: "20px",
          textAlign: "center",
          borderRadius: "10px",
          border: "1px dashed gray",
        }}
      >
        <input {...getInputProps()} />
        <Typography variant="body2">
          Drag 'n' drop some files here, or click to select files
        </Typography>
        {!!error && (
          <Typography variant="body2" color="red">
            {error}
          </Typography>
        )}
      </Box>
      <aside
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          marginTop: 16,
        }}
      >
        {thumbs}
      </aside>
    </section>
  );
}
export default Dropzone;
