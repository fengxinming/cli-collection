export interface UserConfig {
  packages: string | string[];
  client: string;
  sort?: (dirs: string[]) => string[];
  args?: any[];
}

export interface PublishedResult {
  name: string;
  version: string;
  code: number;
}
