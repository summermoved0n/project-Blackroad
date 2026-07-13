export const EmptyHeartIcon = ({ active }: { active?: boolean }) => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 21 21"
      fill={active ? "#CB2323" : "none"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.5 11.5C18.99 10.04 20.5 8.29 20.5 6C20.5 4.54131 19.9205 3.14236 18.8891 2.11091C17.8576 1.07946 16.4587 0.5 15 0.5C13.24 0.5 12 1 10.5 2.5C9 1 7.76 0.5 6 0.5C4.54131 0.5 3.14236 1.07946 2.11091 2.11091C1.07946 3.14236 0.5 4.54131 0.5 6C0.5 8.3 2 10.05 3.5 11.5L10.5 18.5L17.5 11.5Z"
        stroke={active ? "#CB2323" : "currentColor"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
