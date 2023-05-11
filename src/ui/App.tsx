import { useMemo } from "react";
import styles from "@ui/styles.css?inline";
import ShadowRoot from "react-shadow";
import { Command } from "@src/types";
import { ElementIds } from "@src/constants";
import { JavisPopover } from "./components/JavisPopover";
import { JavisDialog } from "./components/JavisDialog";

type BubbleButtonProps = {
  top: number;
  left: number;
  onClick: VoidFunction;
};

export const BubbleButton = ({ top, left, onClick }: BubbleButtonProps) => {
  return (
    <ShadowRoot.div id={ElementIds.BubbleButtonContainer}>
      <div
        className="jv-absolute"
        style={
          location
            ? {
                top: `${top}px`,
                left: `${left}px`,
              }
            : { right: "20px", top: "20px" }
        }
      >
        <button className="btn-bubble" onClick={onClick}>
          <img
            src={chrome.runtime.getURL("icon-48.png")}
            className="jv-w-full jv-h-full jv-object-cover"
          />
        </button>
      </div>
      <style type="text/css">{styles}</style>
    </ShadowRoot.div>
  );
};

type JavisPopoverContanerProps = {
  commands?: Command[];
  selection?: string;
  location?: { top: number; left: number };
};

export const JavisPopoverContaner = ({
  commands = [],
  selection = "",
  location,
}: JavisPopoverContanerProps): JSX.Element => {
  const groupedCommands = useMemo(() => {
    if (selection) {
      const validCommands = commands.filter((cm) => cm.needSelection);
      let group: { group: string; commands: Command[] }[] = [];
      validCommands.forEach((command) => {
        const index = group.findIndex((g) => g.group === command.group);
        if (index >= 0) {
          group[index] = {
            group: command.group,
            commands: [command, ...group[index].commands],
          };
        } else {
          group.push({ group: command.group, commands: [command] });
        }
      });
      return group;
    } else {
      const validCommands = commands.filter((cm) => !cm.needSelection);
      return [
        {
          group: validCommands[0].group,
          commands: validCommands,
        },
      ];
    }
  }, [commands, selection]);

  return (
    <ShadowRoot.div id={ElementIds.InlinePopupContainer}>
      <JavisPopover
        commands={groupedCommands}
        selectionText={selection}
        trigger={
          <button
            className="jv-w-0 jv-h-0 jv-z-[-1] jv-select-none jv-absolute"
            style={
              location
                ? {
                    top: `${location.top}px`,
                    left: `${location.left}px`,
                  }
                : { right: "20px", top: "20px" }
            }
          >
            ⌘
          </button>
        }
      />

      <style type="text/css">{styles}</style>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
    </ShadowRoot.div>
  );
};

type JavisDialogContanerProps = {
  commands?: Command[];
  selectionText?: string;
};

export const JavisDialogContaner = ({
  commands = [],
  selectionText = "",
}: JavisDialogContanerProps): JSX.Element => {
  const groupedCommands = useMemo(() => {
    if (selectionText) {
      const validCommands = commands.filter((cm) => cm.needSelection);
      let group: { group: string; commands: Command[] }[] = [];
      validCommands.forEach((command) => {
        const index = group.findIndex((g) => g.group === command.group);
        if (index >= 0) {
          group[index] = {
            group: command.group,
            commands: [command, ...group[index].commands],
          };
        } else {
          group.push({ group: command.group, commands: [command] });
        }
      });
      return group;
    } else {
      const validCommands = commands.filter((cm) => !cm.needSelection);
      return [
        {
          group: validCommands[0].group,
          commands: validCommands,
        },
      ];
    }
  }, [commands, selectionText]);

  return (
    <ShadowRoot.div id={ElementIds.DialogContainer}>
      <JavisDialog commands={groupedCommands} selectionText={selectionText} />

      <style type="text/css">{styles}</style>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
    </ShadowRoot.div>
  );
};
