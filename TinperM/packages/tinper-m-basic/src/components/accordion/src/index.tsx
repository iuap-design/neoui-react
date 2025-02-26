import './Accordion.less'
import { attachPropertiesToComponent } from '@utils/AttachPropertiesToComponent'
import Accordion, { AccordionPanel } from './Accordion'

export type { AccordionProps, AccordionPanelProps } from './iAccordion'

export default attachPropertiesToComponent(Accordion, { Panel: AccordionPanel })
