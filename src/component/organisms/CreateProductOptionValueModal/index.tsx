import Button from "@/component/atoms/Button";
import { Option } from "@/utils/types";
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

interface CreateProductOptionValueModalProps extends Omit<DialogProps, "onSubmit"> {
  onSubmit: (val: string) => void;
  onClose: () => void;
  option: Option | null;
}

const CrateProductOptionValueModal: React.FC<CreateProductOptionValueModalProps> = ({
  onSubmit,
  onClose,
  option,
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
      <DialogTitle>Create Product {option?.value} value</DialogTitle>
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

export default CrateProductOptionValueModal;
