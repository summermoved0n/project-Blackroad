export const ChevronRightIcon = ({
  pageLinkChevron,
}: {
  pageLinkChevron?: boolean;
}) => {
  return (
    <svg
      width={pageLinkChevron ? "6" : "20"}
      height={pageLinkChevron ? "8" : "24"}
      viewBox="0 0 8 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.500279 0C0.500279 0.636 1.12856 1.58571 1.76456 2.38286C2.58228 3.41143 3.55942 4.30886 4.67971 4.99371C5.51971 5.50714 6.53799 6 7.35742 6C6.53799 6 5.51885 6.49286 4.67971 7.00629C3.55942 7.692 2.58228 8.58943 1.76456 9.61629C1.12856 10.4143 0.500279 11.3657 0.500279 12"
        stroke="white"
        strokeOpacity={pageLinkChevron ? "0.6" : "1"}
      />
    </svg>
  );
};
