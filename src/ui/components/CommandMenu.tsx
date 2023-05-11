import { Command as CommandType, CommandOption } from "@src/types";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./Command";
import { Icons } from "@ui/icons";
import { useEffect, useState, useRef } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./HoverMenu";
import { ChevronRight } from "lucide-react";

type CommandMenuProps = {
  commands: { group: string; commands: CommandType[] }[];
  selectionText?: string;
  commandListClassName?: string;
  onEnter: (text: string) => void;
  onCommand: (command: CommandType, option?: CommandOption) => void;
};

export const CommandMenu = ({
  commandListClassName,
  commands,
  selectionText,
  onEnter,
  onCommand,
}: CommandMenuProps) => {
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        onEnter(search);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [search, onEnter]);

  return (
    <Command>
      <CommandInput
        value={search}
        onValueChange={setSearch}
        placeholder="Search for commands..."
        ref={inputRef}
        selectionText={selectionText}
      />
      <CommandList className={commandListClassName}>
        {commands.map(({ group, commands: cms }) => (
          <CommandGroup key={group} heading={group}>
            {cms.map((item) => {
              const itemView = (
                <CommandItem
                  key={item.name}
                  onSelect={() => {
                    if (item.prompt) {
                      setSearch(item.prompt);
                    }
                    if (!item.options) {
                      onCommand(item);
                    }
                    setTimeout(() => {
                      if (inputRef && inputRef.current && item.prompt) {
                        inputRef.current.selectionStart = item.prompt.length;
                        inputRef?.current?.focus();
                      }
                    }, 100);
                  }}
                >
                  <span className="jv-mr-2 jv-text-gray-500 jv-h-5 jv-w-5 jv-text-xl">
                    {/* @ts-ignore */}
                    {Icons[item.icon]}
                  </span>
                  <div className="jv-flex-1">
                    <span>{item.name}</span>
                  </div>
                  {item.options && (
                    <span className="jv-ml-2 jv-text-gray-500 jv-h-5 jv-w-5 jv-text-xl">
                      <ChevronRight />
                    </span>
                  )}
                </CommandItem>
              );

              if (item.options) {
                return (
                  <HoverCard openDelay={100} closeDelay={100}>
                    <HoverCardTrigger asChild>{itemView}</HoverCardTrigger>

                    <HoverCardContent className="!jv-px-0 !jv-py-2">
                      {item.options.map((option) => (
                        <CommandItem
                          key={option.text}
                          onSelect={() => {
                            onCommand(item, option);
                          }}
                        >
                          <span>{option.text}</span>
                        </CommandItem>
                      ))}
                    </HoverCardContent>
                  </HoverCard>
                );
              }

              return itemView;
            })}
          </CommandGroup>
        ))}
      </CommandList>
    </Command>
  );
};
