import { useState, useCallback } from 'react';

interface ToastProps {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const toast = useCallback(({ title, description, variant }: ToastProps) => {
    console.log(`Toast: ${title} - ${description} [${variant}]`);
  }, []);

  return { toast };
}
