import { dbFindUserByToken } from "@/lib/repositories/auth.repo";
import ResetForm from "./ResetForm";
import ResetFormNotFound from "./ResetFormNotFound";
type PageProps = {
  params: Promise<{
    resetToken: string;
  }>;
};

export default async function page({ params }: PageProps) {
  const { resetToken } = await params;
  const response = await dbFindUserByToken({ resetPasswordToken: resetToken });

  if (!response) {
    return <ResetFormNotFound />;
  }

  return <ResetForm resetToken={resetToken} />;
}
