import React from 'react';
import { TypographyParagraphProps } from './iTypography';
import Base from './base';

function Paragraph(props: TypographyParagraphProps) {

    return <Base {...props} componentType="Paragraph" />;
}

Paragraph.displayName = 'Paragraph';

export default Paragraph;
