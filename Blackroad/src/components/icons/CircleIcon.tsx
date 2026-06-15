export const CircleIcon = ({ whiteCircle }: { whiteCircle?: boolean }) => {
  return (
    <svg
      width="34"
      height="40"
      viewBox="0 0 34 40"
      fill={whiteCircle ? "white" : "#171717"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32.2291 20C32.2291 30.4934 23.7225 39 13.2291 39C8.83278 39 4.78519 37.5068 1.5658 35H3.69651e-07C3.52567 38.1118 8.15689 40 13.2291 40C24.2748 40 33.2291 31.0457 33.2291 20C33.2291 8.9543 24.2748 0 13.2291 0C8.15689 0 3.52567 1.88818 0 5H1.5658C4.78519 2.49315 8.83278 1 13.2291 1C23.7225 1 32.2291 9.50659 32.2291 20Z"
        fill={whiteCircle ? "white" : "#171717"}
        fillOpacity="0.1"
      />
    </svg>
  );
};
