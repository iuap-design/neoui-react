import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import rootConfig from './test/root-config'

const testFiles = rootConfig.map((dir: string) => `${dir}/**/*.test.(ts|tsx)`)
export default defineConfig(
  {
    plugins: [ tsconfigPaths()],
    test: {
      include: testFiles,
      environment: 'jsdom',
      globals: true,
      setupFiles: 'test/setupVitest.ts',

    },


  })
