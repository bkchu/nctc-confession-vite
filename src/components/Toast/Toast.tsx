import { ReactNode } from 'react';
import { toast } from 'react-hot-toast';
import { Transition } from '@headlessui/react';
import Success from '~icons/heroicons-outline/check-circle';
import Warning from '~icons/heroicons-outline/exclamation';
import Error from '~icons/heroicons-outline/exclamation-circle';
import Info from '~icons/heroicons-outline/information-circle';

type ToastProps = {
  visible: boolean;
  id: string;
  variant: 'success' | 'error' | 'warning' | 'info';
  children: ReactNode;
};

export const Toast = ({ visible, id, variant, children }: ToastProps) => {
  const toastIcon: Record<ToastProps['variant'], ReactNode> = {
    success: (
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
        <Success className="w-5 h-5 text-green-500" />
      </div>
    ),
    error: (
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-red-100 rounded-lg dark:bg-green-800 dark:text-green-200">
        <Error className="w-5 h-5 text-red-500" />
      </div>
    ),
    warning: (
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-lg dark:bg-green-800 dark:text-green-200">
        <Warning className="w-5 h-5 text-yellow-500" />
      </div>
    ),
    info: (
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg dark:bg-green-800 dark:text-green-200">
        <Info className="w-5 h-5 text-blue-500" />
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
        className="flex gap-3 items-center w-full max-w-md p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
        role="alert"
      >
        {toastIcon[variant]}
        <div className="text-sm font-normal">{children}</div>
        <button
          type="button"
          className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          data-dismiss-target="#toast-success"
          aria-label="Close"
          onClick={() => toast.dismiss(id)}
        >
          <span className="sr-only">Close</span>
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </Transition>
  );
};
