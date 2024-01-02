import { Message } from "@/service/Types";
import { useEffect, useRef } from "react";

export const useScrollToLatestMessage = (messages: Message[], externalRef?: React.RefObject<HTMLDivElement>) => {
  const dummy = externalRef || useRef<HTMLDivElement>(null);

  useEffect(() => {
    dummy.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return dummy;
};
