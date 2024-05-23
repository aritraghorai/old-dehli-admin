import Button from "@/component/atoms/Button";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Stack,
} from "@mui/material";
import {
  TimeSlotRequestForm,
} from "@/utils/types";
import { MuiFileInput } from 'mui-file-input'
import { useState } from "react";
import AttachFileIcon from '@mui/icons-material/AttachFile'


interface TimeSlotFormType extends Omit<DialogProps, "onSubmit"> {
  onSubmit: (data: TimeSlotRequestForm) => void;
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
          <MuiFileInput InputProps={{
            inputProps: {
              accept: ".xls, .xlsx",
            },
            startAdornment: <AttachFileIcon />
          }}
            value={file}
            onChange={(e) => {
              setFile(e)
            }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button type="submit" form="ShopForm" disabled={!!file}>
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
