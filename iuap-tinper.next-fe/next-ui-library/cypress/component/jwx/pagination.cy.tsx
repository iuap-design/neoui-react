import React from 'react';
import {Pagination} from '../../../../packages';

const BaseDemo = (props: any) => {
    const {current = 1, defaultPageSize = 10, total = 200} = props;
    return <Pagination total={total} defaultPageSize={defaultPageSize} current={current} {...props} />;
};

const sizeArr: any = ['xs', 'sm', 'md', 'nm', 'lg', 'default', 'small', 'middle', 'large'];
const PaginationSizeDemo = (props: any) => {
    let comps: JSX.Element[] = [];
    sizeArr.forEach((size: any) => {
        comps.push(
            <>
                <Pagination size={size} showSizeChanger {...props} />
                <Pagination size={size} showSizeChanger {...props} disabled />
            </>
        );
    });
    return <>{comps}</>;
};

describe('pagination.cy.tsx', () => {
    const apiObj = {
        ellipsis: false,
        showQuickJumper: false,
        showSizeChanger: true,
        prev: false,
        next: false,
        first: false,
        last: false,
        disabled: true,
        gap: false,
        simple: true
    };
    const apiKeys = Object.keys(apiObj);
    it(`test ${apiKeys.join(' ')}`, () => {
        cy.mount(
            <>
                <p style={{textAlign: 'right', marginRight: '20px'}}>baseDemo</p>
                <BaseDemo />
                {apiKeys.map(api => (
                    <>
                        <p style={{textAlign: 'right'}}>{api}</p>
                        <BaseDemo {...{[api]: apiObj[api]}} />
                        <BaseDemo noBorder={false} {...{[api]: apiObj[api]}} />
                        <BaseDemo size='lg' {...{[api]: apiObj[api]}} />
                    </>
                ))}
            </>
        );
        cy.viewport(800, 1600);
        cy.compareSnapshot('boolean-api');
    });

    it('test size', () => {
        cy.mount(<PaginationSizeDemo total={200} defaultPageSize={10} current={1} />);
        cy.compareSnapshot('basic_pagination_size');
    });

    it('test dropdownAlign', () => {
        cy.mount(
            <>
                <BaseDemo showSizeChanger />
                <BaseDemo
                    showSizeChanger
                    dropdownAlign={{
                        points: ['tl', 'tr'],
                        offset: [10, 20]
                    }}
                />
            </>
        );
        cy.viewport(600, 600);
        cy.get('.wui-select-selector').eq(0).click({force: true});
        cy.compareSnapshot('dropdownAlign-default');
        cy.get('.wui-select-selector').eq(1).click({force: true});
        cy.compareSnapshot('dropdownAlign');
    });

    it('test locale', () => {
        cy.mount(
            <>
                {['zh-cn', 'en-us', 'zh-tw'].map(local => (
                    <BaseDemo style={{marginBottom: '20px'}} locale={local} showSizeChanger />
                ))}
            </>
        );
        cy.viewport(800, 400);
        cy.compareSnapshot('locale');
    });
});
