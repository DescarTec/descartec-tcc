import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.descartec',
  appName: 'webapp',
  webDir: 'dist/webapp',
  server: {
    androidScheme: 'https'
  }
};

export default config;
