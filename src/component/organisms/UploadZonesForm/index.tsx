import Button from "@/component/atoms/Button";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Stack,
} from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import { useState } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { UploadZoneFormType } from "@/utils/types";

interface TimeSlotFormType extends Omit<DialogProps, "onSubmit"> {
  onSubmit: (data: UploadZoneFormType) => void;
  onClose: () => void;
}

const UploadZonesForm: React.FC<TimeSlotFormType> = ({
  onSubmit,
  onClose,
  ...props
}) => {
  const [file, setFile] = useState<File | null>(null);

  const handleSubmitAndClose = (e: any) => {
    e.preventDefault();
    if (file) {
      onSubmit({ file });
      onClose();
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} {...props}>
      <DialogTitle>Upload Zones With PinCode</DialogTitle>
      <DialogContent dividers>
        <Stack
          gap={3}
          width="400px"
          component="form"
          id="ShopForm"
          onSubmit={handleSubmitAndClose}
        >
          <MuiFileInput
            InputProps={{
              inputProps: {
                accept: ".xls, .xlsx",
              },
              startAdornment: <AttachFileIcon />,
            }}
            value={file}
            onChange={(e) => {
              setFile(e);
            }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button type="submit" form="ShopForm" disabled={file === null}>
          Upload
        </Button>
        <Button color="error" onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadZonesForm;
