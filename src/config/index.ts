import localhost from './config.localhost';

const setupConfig = (host: string) => {
  return localhost;
};

export const config = setupConfig(window.location.host);
export default {
  ...config,
  publicUrl: process.env.PUBLIC_URL,
};
