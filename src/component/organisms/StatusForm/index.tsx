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
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormType,
  Status,
  StatusFormRequest,
  TimeSlotRequestForm,
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
    watch,
    handleSubmit,
    register,
    reset,
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

  useEffect(() => {
    if (initialStatus) {
      setValue("name", initialStatus.name);
      setValue("video_url", initialStatus.video_url);
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
          <TextField
            label="Video URL"
            variant="outlined"
            fullWidth
            {...register("video_url")}
            error={!!errors.video_url}
            helperText={errors.video_url?.message}
          />
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
