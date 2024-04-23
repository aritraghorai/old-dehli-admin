import Button from "@/component/atoms/Button";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";

interface CreateProductOptionModalProps extends Omit<DialogProps, "onSubmit"> {
  onSubmit: (val: string) => void;
  onClose: () => void;
}

const CrateProductOptionModal: React.FC<CreateProductOptionModalProps> = ({
  onSubmit,
  onClose,
  ...props
}) => {
  const [val, setValue] = useState<string | null>();

  const handleSubmitAndClose = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (val) onSubmit(val);
    setValue(null);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} {...props}>
      <DialogTitle>Create Product Option</DialogTitle>
      <DialogContent dividers>
        <Stack
          gap={3}
          width="400px"
          component="form"
          id="AddNewTag"
          onSubmit={handleSubmitAndClose}
        >
          <TextField
            variant="outlined"
            label="Value"
            placeholder="Value"
            value={val}
            onChange={(e) => setValue(e.target.value)}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button type="submit" form="AddNewTag" disabled={val === null}>
          Create
        </Button>
        <Button color="error" onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CrateProductOptionModal;
