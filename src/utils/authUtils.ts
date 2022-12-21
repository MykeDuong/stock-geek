import bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, saltRounds).then((result) => { return result })
  return hashedPassword;
}

export const comparePassword = async (password: string, dbPassword: string) => {
  const match = await bcrypt.compare(password, dbPassword);
  return match;
}