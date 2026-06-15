export const MinusIcon = ({ color = "black" }: { color?: string }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        y="8.5"
        width="1"
        height="16"
        transform="rotate(-90 0 8.5)"
        fill={color}
      />
    </svg>
  );
};
