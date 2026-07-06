"use client";
import { useChat } from "@ai-sdk/react";
import { useEffect } from "react";
export default function Test() {
  const chat = useChat();
  useEffect(() => { console.log(Object.keys(chat)) }, []);
  return null;
}
