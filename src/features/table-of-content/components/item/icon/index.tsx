type Props = {
  className: string;
};

export const Icon: React.FC<Props> = ({ className }) => {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6.00259 12.6666L11.3359 7.99998L6.00259 3.33331V12.6666Z" />
    </svg>
  );
};
