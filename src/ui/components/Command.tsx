import * as React from "react";
import { DialogProps } from "@radix-ui/react-dialog";
import { Command as CommandPrimitive } from "cmdk";
import { Dialog, DialogContent } from "./Dialog";
import { cn } from "@ui/utils";

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "jv-flex jv-h-full jv-w-full jv-flex-col jv-overflow-hidden jv-rounded-md",
      "[&_[cmdk-group-heading]]:jv-px-2 [&_[cmdk-group-heading]]:jv-mb-1 [&_[cmdk-group-heading]]:jv-font-medium [&_[cmdk-group-heading]]:jv-gray-900 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:jv-pt-0 [&_[cmdk-input-wrapper]_svg]:jv-h-5 [&_[cmdk-input-wrapper]_svg]:jv-w-5 [&_[cmdk-input]]:jv-h-6 [&_[cmdk-item]]:jv-px-2 [&_[cmdk-item]]:jv-py-3 [&_[cmdk-item]_svg]:jv-h-5 [&_[cmdk-item]_svg]:jv-w-5",
      className
    )}
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

interface CommandDialogProps extends DialogProps {}

const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="jv-overflow-hidden !jv-p-0 jv-shadow-2xl">
        <Command className="[&_[cmdk-group-heading]]:jv-px-2 [&_[cmdk-group-heading]]:jv-mb-1 [&_[cmdk-group-heading]]:jv-font-medium [&_[cmdk-group-heading]]:jv-gray-900 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:jv-pt-0 [&_[cmdk-input-wrapper]_svg]:jv-h-5 [&_[cmdk-input-wrapper]_svg]:jv-w-5 [&_[cmdk-input]]:jv-h-6 [&_[cmdk-item]]:jv-px-2 [&_[cmdk-item]]:jv-py-3 [&_[cmdk-item]_svg]:jv-h-5 [&_[cmdk-item]_svg]:jv-w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input> & {
    selectionText?: string;
  }
>(({ className, selectionText = "", ...props }, ref) => (
  <div
    className="jv-border-b jv-border-gray-500/24 jv-p-4"
    cmdk-input-wrapper=""
  >
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "placeholder:jv-text-gray-500 jv-text-gray-800 jv-border-none jv-p-0 jv-flex jv-w-full jv-rounded-md jv-bg-transparent jv-text-base jv-outline-none disabled:jv-cursor-not-allowed disabled:jv-opacity-50",
        className
      )}
      {...props}
    />
    {selectionText && (
      <p className="jv-text-xs jv-text-amber-500 jv-italic jv-font-medium jv-truncate jv-mt-2">
        {`Selected text: "${selectionText}"`}
      </p>
    )}
  </div>
));

CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("jv-overflow-y-auto jv-overflow-x-hidden", className)}
    {...props}
  />
));

CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="jv-py-6 jv-text-center jv-text-sm"
    {...props}
  />
));

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "jv-overflow-hidden jv-my-4 [&_[cmdk-group-heading]]:jv-px-4 [&_[cmdk-group-heading]]:jv-text-sm [&_[cmdk-group-heading]]:jv-font-medium [&_[cmdk-group-heading]]:jv-text-gray-800",
      className
    )}
    {...props}
  />
));

CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn(
      "-jv-mx-1 jv-h-px jv-mb-4 jv-bg-border jv-bg-red-500/24",
      className
    )}
    {...props}
  />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "jv-relative jv-flex jv-h-10 jv-cursor-default jv-select-none jv-items-center jv-rounded-lg jv-mx-2 jv-px-2 jv-text-sm jv-text-gray-800 jv-outline-none aria-selected:jv-bg-gray-500/[0.08] data-[disabled]:jv-pointer-events-none data-[disabled]:jv-opacity-50",
      className
    )}
    {...props}
  />
));

CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "jv-ml-auto jv-rounded jv-px-1 jv-py-0.5 jv-text-sm jv-tracking-widest jv-bg-gray-50 jv-mix-blend-multiply jv-border jv-border-gray-100 jv-text-gray-600",
        className
      )}
      {...props}
    />
  );
};
CommandShortcut.displayName = "CommandShortcut";

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
