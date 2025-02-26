/** Hyperlinks.tsx */
import React from "react"
import {render, renderHook, screen} from "@testing-library/react";
import {Hyperlinks} from "@tinper/m";
import {HyperlinksProps} from "@components/hyperlinks/src/iHyperlinks";
import userEvent from "@testing-library/user-event";
import {useId} from "react";

describe('Hyperlinks Components', () => {
  const link = {linkAddress: 'baidu.com',linkText: "baidu"} as const
  const url = link.linkAddress
  const linkAddressPlaceholder = 'linkAddressPlaceholder';
  const linkTextPlaceholder = 'linkTextPlaceholder';
  const renderHyperlinks = (props: HyperlinksProps = {}) => {
    const user = userEvent.setup()
    const onChange = jest.fn()
    const {result: {current: fieldid}} = renderHook(useId)
    const {container, baseElement} = render(<Hyperlinks linkAddressPlaceholder={linkAddressPlaceholder} linkTextPlaceholder={linkTextPlaceholder} onChange={onChange} fieldid={fieldid}
                                                        defaultValue={link} {...props} />);
    return {
      container,
      element: container.firstElementChild,
      user,
      fieldid,
      onChange,
      getLinkAddress: () => screen.getByPlaceholderText(linkAddressPlaceholder),
      getLinkText:  () => screen.getByPlaceholderText(linkTextPlaceholder),
      getProtocol: () => screen.getByText(/(https|http):/)
    }
  }

  describe('props', () => {
    describe('<test prop:: linkTextPlaceholder>', () => {
      it('should render correct placeholder', () => {
        const linkTextPlaceholder = 'linkTextPlaceholder';
        renderHyperlinks({linkTextPlaceholder})
        expect(screen.getByPlaceholderText(linkTextPlaceholder)).toBeInTheDocument();
      });
    });

    describe('<test prop:: linkAddressPlaceholder>', () => {
      it('should render correct placeholder', () => {
        const linkAddressPlaceholder = 'linkAddressPlaceholder';
        renderHyperlinks({linkAddressPlaceholder})
        expect(screen.getByPlaceholderText(linkAddressPlaceholder)).toBeInTheDocument();
      });
    });

    describe('<test prop:: disabled>', () => {
      it('should render disabled', () => {
        const {element} = renderHyperlinks({disabled: true});

        expect(element).toHaveClass(/disabled/i)
      });
    });

    describe('<test prop:: readOnly>', () => {
      it('should render correct text and state', () => {
        renderHyperlinks({readOnly: true});

        expect(screen.getByText(link.linkText)).toBeInTheDocument();
        expect(screen.queryAllByRole('textbox')).toHaveLength(0)
      });

      it('should jump to url when link is clicked', async () => {
        const {element, user} = renderHyperlinks({readOnly: true});
        await user.click(element!.firstElementChild!)

        expect(window.location.origin).toBe('http://localhost')
      });
    });

    describe('<test prop:: defaultValue>', () => {
      it.each([
        {linkAddress: 'https://baidu.com',  linkText: "baidu", expectAddress: 'baidu.com'} as const,
        {linkAddress: 'http://baidu.com', linkText: "baidu", expectAddress: 'baidu.com'} as const,
        {linkAddress: 'baidu.com', linkText: "baidu", expectAddress: 'baidu.com'} as const,
      ])('should render  $linkText linkText and $expectAddress linkAddress when linkAddress is $linkAddress', (link) => {
        renderHyperlinks({defaultValue: link});

        expect(screen.getByDisplayValue(link.expectAddress)).toBeInTheDocument();
        expect(screen.getByDisplayValue(link.linkText)).toBeInTheDocument();
      })

    });

    describe('<test prop:: value>', () => {
      it.each([
        {linkAddress: 'https://baidu.com',  linkText: "baidu", expectAddress: 'baidu.com'} as const,
        {linkAddress: 'http://baidu.com', linkText: "baidu", expectAddress: 'baidu.com'} as const,
        {linkAddress: 'baidu.com', linkText: "baidu", expectAddress: 'baidu.com'} as const,
      ])(
        'should render  $linkText linkText and $expectAddress linkAddress when linkAddress is $linkAddress',
        (link) => {
          renderHyperlinks({ value: link });

          expect(
            screen.getByDisplayValue(link.expectAddress)
          ).toBeInTheDocument();
          expect(screen.getByDisplayValue(link.linkText)).toBeInTheDocument();
        }
      );

    });

    describe('<test prop:: visible>', () => {
      it('should not render when visible is false', () => {
        const {container} = renderHyperlinks({visible: false});

        expect(container).toBeEmptyDOMElement()
      });
    });

    describe('<test prop:: fieldid>', () => {
      it('should render fieldid for normal', () => {
        const {element, fieldid} = renderHyperlinks();

        expect(element).toHaveAttribute('fieldid', fieldid)
      });

      it('should render fieldid for readOnly', () => {
        const {element, fieldid} = renderHyperlinks({readOnly: true});

        expect(element).toHaveAttribute('fieldid', fieldid)
      });

      describe('<test prop:: clsPrefix>', () => {
        it('should contain mui clsPrefix default', () => {
          const { element} = renderHyperlinks()

          expect(element).toHaveClass(/^mui/)
        });
        it('should contain provided clsPrefix',  () => {
          const { element } = renderHyperlinks({clsPrefix: 'clsPrefix'})


          expect(element).toHaveClass(/^clsPrefix/)
        });
      })
    });

  });

  describe('event', () => {
    describe('<test prop:: onChange>', () => {
      it('should call onChange with protocol, linkText, linkAddress and linkValue', async () => {
        const {onChange,user, getLinkAddress, getLinkText, getProtocol} = renderHyperlinks({defaultValue: {}});
        const linkAddress = 'yonyou.com'
        const linkText = 'yonyou'
        const protocol = 'http:'
        const linkValue = JSON.stringify({linkText,linkAddress: `${protocol}//${linkAddress}`})
        await user.type(getLinkAddress(), linkAddress)
        await user.type(getLinkText(), linkText)
        await user.click(getProtocol())
        await user.click(screen.getByText(protocol,{exact: false} ))


        expect(onChange.mock.lastCall).toContainEqual(linkValue)


      });
    });
  });
});
