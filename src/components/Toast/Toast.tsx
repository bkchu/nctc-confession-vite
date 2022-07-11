import { ReactNode } from 'react';
import { toast } from 'react-hot-toast';
import { Transition } from '@headlessui/react';
import Success from '~icons/heroicons-outline/check-circle';
import Warning from '~icons/heroicons-outline/exclamation';
import Error from '~icons/heroicons-outline/exclamation-circle';
import Info from '~icons/heroicons-outline/information-circle';
import X from '~icons/heroicons-outline/x';

type ToastProps = {
  visible: boolean;
  id: string;
  variant: 'success' | 'error' | 'warning' | 'info';
  children: ReactNode;
};

export const Toast = ({ visible, id, variant, children }: ToastProps) => {
  const toastIcon: Record<ToastProps['variant'], ReactNode> = {
    success: (
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg dark:bg-green-800">
        <Success className="w-5 h-5 text-green-500 dark:text-green-300" />
      </div>
    ),
    error: (
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-red-100 rounded-lg dark:bg-red-800">
        <Error className="w-5 h-5 text-red-500 dark:text-red-300" />
      </div>
    ),
    warning: (
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-lg dark:bg-yellow-800">
        <Warning className="w-5 h-5 text-yellow-500 dark:text-yellow-300" />
      </div>
    ),
    info: (
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg dark:bg-blue-800">
        <Info className="w-5 h-5 text-blue-500 dark:text-blue-300" />
      </div>
    )
  };

  return (
    <Transition
      appear
      show={visible}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        id="toast-success"
        className="flex gap-3 items-center w-full max-w-md p-4 mb-4 text-slate-500 bg-white rounded-lg shadow-md dark:text-slate-400 dark:bg-slate-800 dark:shadow-none dark:border dark:border-slate-700"
        role="alert"
      >
        {toastIcon[variant]}
        <div className="text-sm font-normal">{children}</div>
        <button
          type="button"
          className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 ring-expand"
          data-dismiss-target="#toast-success"
          aria-label="Close"
          onClick={() => toast.dismiss(id)}
        >
          <span className="sr-only">Close</span>
          <X className="w-5 h-5 text-slate-800 dark:text-white" />
        </button>
      </div>
    </Transition>
  );
};
