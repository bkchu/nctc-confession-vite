import React, { cloneElement, useState } from 'react';
import {
  FloatingFocusManager,
  FloatingPortal,
  Placement,
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useId,
  useInteractions,
  useRole
} from '@floating-ui/react-dom-interactions';

interface Props {
  render: (data: {
    close: () => void;
    labelId: string;
    descriptionId: string;
  }) => React.ReactNode;
  placement?: Placement;
  children: JSX.Element;
}

export const Popover = ({ children, render, placement }: Props) => {
  const [open, setOpen] = useState(false);

  const { x, y, reference, floating, strategy, context } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [offset(5), flip(), shift()],
    placement,
    whileElementsMounted: autoUpdate
  });

  const id = useId();
  const labelId = `${id}-label`;
  const descriptionId = `${id}-description`;

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useRole(context),
    useDismiss(context)
  ]);

  return (
    <>
      {cloneElement(
        children,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        getReferenceProps({ ref: reference, ...children.props })
      )}
      <FloatingPortal>
        {open && (
          <FloatingFocusManager
            context={context}
            modal={false}
            order={['reference', 'content']}
            returnFocus={false}
          >
            <span
              {...getFloatingProps({
                className: 'z-50',
                ref: floating,
                style: {
                  position: strategy,
                  top: y ?? '',
                  left: x ?? ''
                },
                'aria-labelledby': labelId,
                'aria-describedby': descriptionId
              })}
            >
              {render({
                labelId,
                descriptionId,
                close: () => {
                  setOpen(false);
                }
              })}
            </span>
          </FloatingFocusManager>
        )}
      </FloatingPortal>
    </>
  );
};
