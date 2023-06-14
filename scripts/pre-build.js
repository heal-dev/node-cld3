import { execSync } from 'node:child_process';
import path from 'node:path';

const __dirname = new URL('.', import.meta.url).pathname;
const root = path.join(__dirname, '..');
const cld3Path = path.join(root, 'cld3');

execSync('rm -rf cld3', { cwd: root });
execSync('git clone https://github.com/Aschen/cld3.git', { cwd: root });
execSync('rm -rf cld3/.git', { cwd: root });
execSync('mkdir -p build', { cwd: cld3Path });
execSync('cmake -S . -B ./build', { cwd: cld3Path });
execSync('cmake --build ./build --target cld3 -j 8', { cwd: cld3Path });
