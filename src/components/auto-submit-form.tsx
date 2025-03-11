"use client";

import { useEffect, useRef } from "react";

interface AutoSubmitFormProps {
  children: React.ReactNode;
  action: string;
  method?: "get" | "post";
  className?: string;
}

export default function AutoSubmitForm({
  children,
  action,
  method = "get",
  className,
}: AutoSubmitFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const hasSubmitted = useRef(false);

  useEffect(() => {
    // Only submit if this is not the initial render and if there's a form element
    if (formRef.current && hasSubmitted.current) {
      formRef.current.submit();
    } else {
      hasSubmitted.current = true;
    }
  }, [children]);

  return (
    <form ref={formRef} action={action} method={method} className={className}>
      {children}
    </form>
  );
}
