import { Box, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";

interface ImageWithDeleteProps {
  src: string;
  alt: string;
  isDelete: boolean;
  onDelete: () => void;
  onAdd: () => void;
  isEditable?: boolean;
}

const ImageWithDelete = ({
  src,
  alt,
  isDelete,
  onDelete,
  onAdd,
  isEditable = true,
}: ImageWithDeleteProps) => {
  return (
    <Box position="relative">
      {isEditable && (
        <IconButton
          sx={{
            position: "absolute",
            left: "-20px",
            top: "-20px",
          }}
          onClick={isDelete ? onAdd : onDelete}
        >
          {!isDelete ? (
            <DeleteIcon color="info" />
          ) : (
            <AddCircleOutlineIcon color="info" />
          )}
        </IconButton>
      )}
      <img
        src={src}
        alt={alt}
        width="100%"
        height="200px"
        style={{
          borderRadius: "10px",
        }}
      />
    </Box>
  );
};

export default ImageWithDelete;
