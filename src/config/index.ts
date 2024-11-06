const envConfig = {
    baseApi: process.env.NEXT_PUBLIC_BASE_API,
    siteURL: process.env.NEXT_PUBLIC_URL,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    stripe_public_key: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
    stripe_secret_key: process.env.STRIPE_SECRET_KEY,
    SSL_STORE_ID: process.env.STORE_ID,
    SSL_STORE_PASSWORD: process.env.STORE_PASSWORD,
    IS_LIVE: process.env.IS_LIVE,
  };
  
  export default envConfig;