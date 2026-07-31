import toast from 'react-hot-toast';

export function useToast() {
  const showSuccess = (message: string, txHash?: string) => {
    toast.success(message, {
      duration: 5000,
      style: {
        background: 'rgba(15, 23, 42, 0.95)',
        color: '#00F59B',
        border: '1px solid rgba(0, 245, 155, 0.4)',
        boxShadow: '0 0 20px rgba(0, 245, 155, 0.3)',
        borderRadius: '12px',
        padding: '16px',
      },
      iconTheme: {
        primary: '#00F59B',
        secondary: '#07090E',
      },
    });
  };

  const showError = (message: string) => {
    toast.error(message, {
      duration: 4000,
      style: {
        background: 'rgba(15, 23, 42, 0.95)',
        color: '#FF2A6D',
        border: '1px solid rgba(255, 42, 109, 0.4)',
        boxShadow: '0 0 20px rgba(255, 42, 109, 0.3)',
        borderRadius: '12px',
        padding: '16px',
      },
      iconTheme: {
        primary: '#FF2A6D',
        secondary: '#07090E',
      },
    });
  };

  const showLoading = (message: string) => {
    return toast.loading(message, {
      style: {
        background: 'rgba(15, 23, 42, 0.95)',
        color: '#00E5FF',
        border: '1px solid rgba(0, 229, 255, 0.4)',
        boxShadow: '0 0 20px rgba(0, 229, 255, 0.3)',
        borderRadius: '12px',
        padding: '16px',
      },
    });
  };

  const dismissToast = (toastId: string) => {
    toast.dismiss(toastId);
  };

  return {
    showSuccess,
    showError,
    showLoading,
    dismissToast,
  };
}
