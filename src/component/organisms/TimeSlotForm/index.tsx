import Button from "@/component/atoms/Button";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Stack,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormType,
  TimeSlotRequestForm,
  TimeSlotRequestFormSchema,
} from "@/utils/types";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";

import dayjs from "dayjs";
import { useEffect } from "react";

interface TimeSlotFormType extends Omit<DialogProps, "onSubmit"> {
  onSubmit: (data: TimeSlotRequestForm) => void;
  onClose: () => void;
  formType: FormType;
  initialTimeSlot?: TimeSlotRequestForm;
}

const TimeSlotForm: React.FC<TimeSlotFormType> = ({
  onSubmit,
  onClose,
  formType,
  initialTimeSlot,
  ...props
}) => {
  const {
    setValue,
    watch,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<TimeSlotRequestForm>({
    resolver: zodResolver(TimeSlotRequestFormSchema),
    mode: "all",
  });

  const handleSubmitAndClose = (val: TimeSlotRequestForm) => {
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
    console.log("val", val);
  });

  useEffect(() => {
    if (initialTimeSlot) {
      console.log("initialTimeSlot", initialTimeSlot);
      setValue("startTime", initialTimeSlot.startTime, {
        shouldValidate: true,
      });
      setValue("endTime", initialTimeSlot.endTime, {
        shouldValidate: true,
      });
    }
  }, [initialTimeSlot, setValue]);

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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopTimePicker
              label="Start Time"
              value={
                initialTimeSlot?.startTime
                  ? dayjs(initialTimeSlot.startTime)
                  : watch("startTime") ?? null
              }
              onChange={(val) =>
                setValue("startTime", dayjs(val).toDate(), {
                  shouldValidate: true,
                })
              }
            />
            <DesktopTimePicker
              label="End Time"
              value={
                initialTimeSlot?.endTime
                  ? dayjs(initialTimeSlot.endTime)
                  : watch("endTime") ?? null
              }
              onChange={(val) =>
                setValue("endTime", dayjs(val).toDate(), {
                  shouldValidate: true,
                })
              }
            />
          </LocalizationProvider>
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

export default TimeSlotForm;
