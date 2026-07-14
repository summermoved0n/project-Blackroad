export const ArrowDownIcon = ({ isBig }: { isBig?: boolean }) => {
  return (
    <svg
      width={isBig ? "24" : "14"}
      height={isBig ? "20" : "9"}
      viewBox="0 0 14 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 0.5C13.258 0.5 12.15 1.233 11.22 1.975C10.02 2.929 8.973 4.069 8.174 5.376C7.575 6.356 7 7.544 7 8.5C7 7.544 6.425 6.355 5.826 5.376C5.026 4.069 3.979 2.929 2.781 1.975C1.85 1.233 0.74 0.5 0 0.5"
        stroke="currentColor"
      />
    </svg>
  );
};
