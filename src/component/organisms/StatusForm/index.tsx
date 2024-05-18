import Button from "@/component/atoms/Button";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormType,
  Status,
  StatusFormRequest,
  statusFormSchema,
} from "@/utils/types";
import { useEffect } from "react";

interface StatusFormType extends Omit<DialogProps, "onSubmit"> {
  onSubmit: (data: StatusFormRequest) => void;
  onClose: () => void;
  formType: FormType;
  initialStatus?: Status;
}

const StatusForm: React.FC<StatusFormType> = ({
  onSubmit,
  onClose,
  formType,
  initialStatus,
  ...props
}) => {
  const {
    setValue,
    handleSubmit,
    register,
    reset,
    watch,
    formState: { isValid, errors },
  } = useForm<StatusFormRequest>({
    resolver: zodResolver(statusFormSchema),
    mode: "all",
  });

  const handleSubmitAndClose = (val: StatusFormRequest) => {
    if (isValid) {
      onSubmit(val);
      reset();
      onClose();
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };
  watch((val) => {
    console.log(val)
  });

  useEffect(() => {
    if (initialStatus) {
      setValue("name", initialStatus.name);
      setValue("description", initialStatus.description);
    }
  }, [initialStatus, setValue]);

  return (
    <Dialog onClose={handleClose} {...props}>
      <DialogTitle>{formType} Time Slot</DialogTitle>
      <DialogContent dividers>
        <Stack
          gap={3}
          width="400px"
          component="form"
          id="ShopForm"
          onSubmit={handleSubmit(handleSubmitAndClose)}
        >
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <Typography variant="body2" color="textSecondary">Video</Typography>
          <Button
            variant="contained"
            component="label"
          >
            Upload File
            <input
              type="file"
              accept="video/*"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                setValue("video", file, { shouldValidate: true });
              }}
            />
          </Button>
          {!!watch().video && <Typography>{watch("video")?.name}</Typography>}
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
          />

        </Stack>
      </DialogContent>
      <DialogActions>
        <Button type="submit" form="ShopForm" disabled={!isValid}>
          {formType}
        </Button>
        <Button color="error" onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StatusForm;
