declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV: 'dev' | 'test' | 'prod';
        PORT?: string;
        MONGODB_URI_TEST: string,
        MONGODB_URI_DEV: string,
        MONGODB_URI_PROD: string,
      }
    }
  }
  
  // If this file has no import/export statements (i.e. is a script)
  // convert it into a module by adding an empty export statement.
  export {}