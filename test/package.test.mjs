import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { promisify } from 'node:util';
import test from 'node:test';
import packageJson from '../package.json' with { type: 'json' };

const execFileAsync = promisify(execFile);

test('package metadata declares the migration requirements', () => {
  assert.equal(packageJson.engines.node, '>=22.0.0');
  assert.equal(packageJson.dependencies['eslint-plugin-react'], undefined);
  assert.equal(packageJson.dependencies['@eslint-react/eslint-plugin'], '^5.18.4');
  assert.equal(packageJson.dependencies['@stylistic/eslint-plugin'], '^5.10.0');
});

test('packed artifact contains all public entry points', async () => {
  const destination = await mkdtemp(`${tmpdir()}/jmrp-lint-config-`);

  try {
    const { stdout } = await execFileAsync('pnpm', ['pack', '--pack-destination', destination], {
      cwd: new URL('..', import.meta.url),
    });
    const tarball = stdout.trim().split('\n').at(-1);
    assert.ok(tarball);

    const { stdout: contents } = await execFileAsync('tar', ['-tzf', tarball]);
    assert.match(contents, /package\/dist\/react\.js/);
    assert.match(contents, /package\/dist\/react-native\.js/);
    assert.match(contents, /package\/dist\/index\.d\.ts/);

    const packedPackageJson = JSON.parse(
      await new Promise((resolve, reject) => {
        execFile('tar', ['-xOf', tarball, 'package/package.json'], (error, stdout) => {
          if (error) reject(error);
          else resolve(stdout);
        });
      }),
    );
    assert.equal(packedPackageJson.dependencies['eslint-plugin-react'], undefined);
  } finally {
    await rm(destination, { recursive: true, force: true });
  }
});
