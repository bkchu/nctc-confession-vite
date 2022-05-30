/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import CheckIcon from '~icons/heroicons-outline/check';
import SelectorIcon from '~icons/heroicons-outline/selector';

type SelectProps = {
  items: Array<{
    label: string;
    onClick: () => void;
  }>;
  defaultValue?: string;
};

export const Select = ({ items, defaultValue }: SelectProps): JSX.Element => {
  const [selectedOption, setSelectionOption] = useState(items[0]);

  useEffect(() => {
    const option = items.find((item) => item.label === defaultValue);
    if (option) {
      setSelectionOption(option);
    }
  }, [defaultValue]);

  const onChange = (value: { label: string; onClick: () => void }) => {
    setSelectionOption(value);
    value.onClick();
  };

  return (
    <div className="flex-1">
      <Listbox value={selectedOption} onChange={onChange}>
        <div className="relative w-full">
          <Listbox.Button className="relative w-full py-2.5 pl-5 pr-10 text-sm font-medium text-slate-900 focus:outline-none bg-white rounded-lg border border-slate-200 hover:bg-slate-100 hover:text-slate-700 focus:z-10 focus:ring-4 focus:ring-slate-200 dark:focus:ring-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-600 dark:hover:text-white dark:hover:bg-slate-700">
            <span className="block text-left truncate">
              {selectedOption.label}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="w-5 h-5 text-slate-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg dark:bg-slate-800 dark:border dark:border-slate-700 max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {items.map((item, itemIdx) => (
                <Listbox.Option
                  key={itemIdx}
                  className={({ active }) =>
                    `cursor-default select-none relative py-2 pl-10 pr-4 ${
                      active
                        ? 'text-violet-900 dark:text-violet-100 dark:bg-violet-800 bg-violet-100'
                        : 'text-slate-900 dark:text-white'
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {item.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-violet-600 dark:text-violet-300">
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};
