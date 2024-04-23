import Button from "@/component/atoms/Button";
import {
  Autocomplete,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { ProductTag } from "@/utils/types";
import { useState } from "react";

interface AddProductTagModalProps extends Omit<DialogProps, "onSubmit"> {
  onSubmit: (tag: ProductTag) => void;
  onClose: () => void;
  tags: ProductTag[];
}

const AddProductTagModal: React.FC<AddProductTagModalProps> = ({
  onSubmit,
  onClose,
  tags,
  ...props
}) => {
  const [val, setValue] = useState<ProductTag | null>();

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
      <DialogTitle>Create New Product</DialogTitle>
      <DialogContent dividers>
        <Stack
          gap={3}
          width="400px"
          component="form"
          id="AddNewTag"
          onSubmit={handleSubmitAndClose}
        >
          <Autocomplete
            id="tags-standard"
            options={tags}
            getOptionLabel={(data) => data.name}
            onChange={(_, value) => setValue(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Tags"
                placeholder="Tags"
              />
            )}
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

export default AddProductTagModal;
