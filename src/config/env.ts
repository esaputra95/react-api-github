function requireEnv(env: unknown) {
    if (typeof window === 'undefined' && !env) {
      throw new Error(
        '[MISSING ENV VARIABLE] - please check your .env.local or .env file!',
      )
    }
  
    return env as string
}

// make env variables to be "Fail Fast!" on server with requireEnv
const env = {
    apiBaseURL: requireEnv(import.meta.env.VITE_BASE_URL_API),
    token: requireEnv(import.meta.env.VITE_ACCESS_TOKEN)
}
  
export default env