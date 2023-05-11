import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@ui/utils";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, children, align = "start", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      "!jv-z-[9999] jv-w-72 jv-rounded-xl jv-bg-white jv-p-4 jv-shadow-dropdown jv-outline-none jv-animate-in data-[side=bottom]:jv-slide-in-from-top-2 data-[side=left]:jv-slide-in-from-right-2 data-[side=right]:jv-slide-in-from-left-2 data-[side=top]:jv-slide-in-from-bottom-2",
      className
    )}
    {...props}
  >
    {children}
    <PopoverPrimitive.Arrow className="jv-fill-white" />
  </PopoverPrimitive.Content>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };
