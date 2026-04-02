import bcrypt from "bcrypt";

const hashPassword = async (plainPassword) => {
  const saltRounds = 10; // 10 is recommended
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
  return hashedPassword;
};

const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export { hashPassword, comparePassword };