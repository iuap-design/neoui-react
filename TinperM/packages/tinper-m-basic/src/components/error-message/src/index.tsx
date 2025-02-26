import './ErrorMessage.less'
import ErrorMessage from './ErrorMessage'
import { attachPropertiesToComponent } from '@utils/AttachPropertiesToComponent'
import { create, destroy } from './Method'

export type { ErrorMessageProps } from './iErrorMessage'

export default attachPropertiesToComponent(ErrorMessage, {
    create,
    destroy
})