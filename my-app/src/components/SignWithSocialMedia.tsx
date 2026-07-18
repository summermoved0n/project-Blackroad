import { AppleIcon, FaceBookBlueIcon, GoogleIcon } from "./icons";

export default function SignWithSocialMedia() {
  return (
    <div className="flex gap-12.5 justify-center">
      <button
        className="h-12.5 w-12.5 rounded-full bg-white flex justify-center items-center transition focus:bg-accent"
        type="button"
      >
        <GoogleIcon />
      </button>

      <button
        className="h-12.5 w-12.5 rounded-full bg-white flex justify-center items-center transition focus:bg-accent"
        type="button"
      >
        <AppleIcon />
      </button>

      <button
        className="h-12.5 w-12.5 rounded-full bg-white flex justify-center items-center transition focus:bg-accent"
        type="button"
      >
        <FaceBookBlueIcon />
      </button>
    </div>
  );
}
