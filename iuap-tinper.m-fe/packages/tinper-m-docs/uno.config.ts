import { defineConfig } from 'unocss'

export default defineConfig({
  shortcuts: {
    block: 'bg-[var(--mui-color-background)] px-1 py-[6px] flex items-center gap-2',
    item: 'bg-[var(--mui-color-background)] py-[6px] px-1',
    space: 'w-20%',
    heading: 'text-black font-normal pl-1 text-[0.28rem]'
  },
  cli: {
    entry: {
      patterns: [
        '../../packages/tinper-m-basic/src/components/**/{docs,demos}/**/*.tsx'
      ],
      outFile: '.dumi/uno.css'
    }, // CliEntryItem | CliEntryItem[]
  },
  // ...
})

interface CliEntryItem {
  /**
   * Glob patterns to match files
   */
  patterns: string[]
  /**
   * The output filename for the generated UnoCSS file
   */
  outFile: string
}
