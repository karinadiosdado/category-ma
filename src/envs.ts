import 'dotenv/config';
import joi from 'joi';

interface EnVars {
  PORT: number;
}

const envsSchema = joi
  .object<EnVars>({
    PORT: joi.number().integer().min(1).max(65535).required(),
  })
  .unknown(true);

const result = envsSchema.validate(process.env, { abortEarly: false });

if (result.error) {
  throw new Error(`Config validation error: ${result.error.message}`);
}
const envVars = result.value;

export const envs = {
  port: envVars.PORT,
} as const;
