import { clearCache, getPackManagerVersion, getTypeofLockFile, hasGlobalInstallation } from './utils'

const cache = new Map()

const getPackageManager = async ({ cwd }: { cwd?: string } = {}) => {
  const type = await getTypeofLockFile(cwd, cache)
  if (type)
    return type

  const [hasYarn, hasPnpm] = await Promise.all([
    hasGlobalInstallation('yarn', cache),
    hasGlobalInstallation('pnpm', cache),
  ])
  if (hasYarn)
    return 'yarn'

  if (hasPnpm)
    return 'pnpm'

  return 'npm'
}

export { getPackageManager, getPackManagerVersion, clearCache }
