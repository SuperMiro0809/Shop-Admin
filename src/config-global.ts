import packageJson from '../package.json';

// ----------------------------------------------------------------------

export type ConfigValue = {
  appName: string;
  appVersion: string;
  site: {
    serverUrl: string,
    assetUrl: string,
    basePath: string
  }
};

// ----------------------------------------------------------------------

export const CONFIG: ConfigValue = {
  appName: 'Minimal UI',
  appVersion: packageJson.version,
  site: {
    serverUrl: '',
    assetUrl: '',
    basePath: ''
  },
};
