import { statSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

import { spawn } from 'cross-spawn';
import { globSync } from 'tinyglobby';
import { request } from 'undici';

import { PublishedResult, UserConfig } from './types';

interface PkgInfo {
  name: string;
  dir: string;
  version: string;
  latestVersion: string | null;
}

function log(name, ...args: any[]) {
  // eslint-disable-next-line no-console
  console.log(`[${name}] -`, ...args);
}

async function getLatestVersion(pkgName: string): Promise<string | null> {
  const { body } = await request(`https://registry.npmjs.org/${pkgName}`);

  const pkg = await body.json() as Record<string, any>;
  if (pkg.error) {
    return null;
  }
  const { latest } = pkg['dist-tags'];
  return latest;
}

async function checkVersion(dir: string): Promise<PkgInfo> {
  const pkgPath = join(dir, 'package.json');
  const { name: pkgName, version } = JSON.parse(await readFile(pkgPath, 'utf-8'));

  const latestVersion = await getLatestVersion(pkgName);
  if (latestVersion === null) {
    log(pkgName, `Package '${pkgName}' not found!`);
  }
  else {
    log(pkgName, `Latest version is '${latestVersion}'.`);
  }

  return { name: pkgName, dir, version, latestVersion };
}

function publish(client: string, pkgName: string, currentDir: string, newArgs?: any[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const tag = /\d+\.\d+\.\d+-([a-z]+)\.\d+/.exec(pkgName);
    const args = [
      'publish',
      '--tag',
      tag ? tag[1] : 'latest'
    ].concat(newArgs || []);
    const child = spawn(client, args, { cwd: currentDir, stdio: 'inherit' });
    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      }
      else {
        reject(new Error(`'${pkgName}' publish failed! ${code}`));
      }
    });
  });
}
export async function publishPackages({ packages, client, sort, args }: UserConfig): Promise<PublishedResult[]> {
  if (typeof packages === 'string') {
    packages = [packages];
  }
  let dirs = packages.reduce<string[]>((acc, pkg) => {
    pkg = resolve(pkg);
    try {
      const state = statSync(pkg);
      if (state.isDirectory()) {
        acc.push(pkg);
      }
    }
    catch (e) {
      const arr = globSync(pkg, {
        onlyDirectories: true,
        onlyFiles: false,
        expandDirectories: false
      });
      if (arr.length) {
        acc.push(...arr);
      }
    }
    return acc;
  }, []);
  if (typeof sort === 'function') {
    dirs = sort(dirs);
  }
  const pkgInfos = await Promise.all(dirs.map(checkVersion));
  const results: PublishedResult[] = [];

  for (const { name, dir, version, latestVersion } of pkgInfos) {
    const result: PublishedResult = { name, version, code: -1 };
    if (version !== latestVersion) {
      log(name, 'Start to release ...');
      await publish(client, name, dir, args);
      result.code = 1;
    }
    else {
      result.code = 0;
    }
    results.push(result);
  }

  return results;
}
