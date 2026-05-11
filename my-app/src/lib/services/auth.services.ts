import {
  dbCreateUser,
  dbFindUser,
  validatePassword,
} from "../repositories/auth.repo";

type SignUpUserProps = {
  email: string;
  password: string;
};

type LogInUserProps = {
  email: string;
  password: string;
};

export const signUpUser = async ({ email, password }: SignUpUserProps) => {
  const existedUser = await dbFindUser({ filter: email });

  if (existedUser) {
    throw new Error("Email in use");
  }

  await dbCreateUser({ email, password });
};

export const logInUser = async ({ email, password }: LogInUserProps) => {
  const existedUser = await dbFindUser({ filter: email });

  if (!existedUser) {
    throw new Error("Email or password not valid");
  }

  const comparePassword = await validatePassword(
    password,
    existedUser.password,
  );

    if (!comparePassword) {
      throw new Error("Email or password not valid");
    }
};
