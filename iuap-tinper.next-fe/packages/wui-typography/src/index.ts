
import OriginTypography from './base';
import Paragraph from './paragraph';

const Typography = OriginTypography as typeof OriginTypography & {
    Paragraph: typeof Paragraph;
};

Typography.Paragraph = Paragraph;

export default Typography;

