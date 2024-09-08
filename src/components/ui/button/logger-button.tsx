import {
  Children,
  PropsWithChildren,
  createElement,
  isValidElement,
} from 'react';
import useLogger from '~/hooks/useLogger';

interface LoggerButtonProps {
  event: string;
  value?: any;
}

export default function LoggerButton({
  children,
  event,
  value,
}: PropsWithChildren<LoggerButtonProps>) {
  const logger = useLogger();
  if (!isValidElement(children)) return children;

  return Children.map(children, (child) =>
    createElement(
      'div',
      {
        ...child.props,
        onClick: (...args: any[]) => {
          logger.click({ event, value });
          return child.props.onClick?.(...args);
        },
      },
      child.props.children
    )
  );
}
