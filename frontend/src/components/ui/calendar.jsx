import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import TextField from "@mui/material/TextField"
import { cn } from "../../lib/utils"
import { buttonVariants } from "../../components/ui/button"

function Calendar({ className, value, onChange, ...props }) {
  return (
    <DatePicker
      {...props}
      value={value}
      onChange={onChange}
      components={{
        LeftArrowIcon: (props) => <ChevronLeft {...props} />,
        RightArrowIcon: (props) => <ChevronRight {...props} />,
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          className={cn(buttonVariants({ variant: "outline" }), className)}
          size="small"
          sx={{
            // Customize MUI TextField styles here if you want
            '& .MuiInputBase-root': {
              padding: '0.25rem 0.5rem',
            },
          }}
        />
      )}
    />
  )
}

Calendar.displayName = "Calendar"

export { Calendar }
