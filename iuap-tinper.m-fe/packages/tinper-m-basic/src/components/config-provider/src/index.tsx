import { MyConfigProvider } from './ConfigProvider'
import { attachPropertiesToComponent } from '@utils/AttachPropertiesToComponent'
import { getTinpermLocaleConfig, setTinpermLocaleConfig, useConfig, registerLang, hasRegisterLang } from './ConfigProvider'
export { getTinpermLocaleConfig, setTinpermLocaleConfig, useConfig, registerLang, hasRegisterLang } from './ConfigProvider'
export default attachPropertiesToComponent(MyConfigProvider, {
  getTinpermLocaleConfig,
  setTinpermLocaleConfig,
  useConfig,
  registerLang,
  hasRegisterLang
})
