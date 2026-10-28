export interface UserConfig {
  packages: string | string[];
  client?: string;
  sort?: (dirs: string[]) => string[];
  args?: any[];
}

export interface PublishedResult {
  name: string;
  version: string;
  code: number;
}

export interface PkgInfo {
  name: string;
  dir: string;
  version: string;
  latestVersion: string | null;
}
