/** Rate.tsx */
import React from "react"
import {act, fireEvent, render, renderHook, screen,} from "@testing-library/react";
import {Rate} from "@tinper/m";
import {RateProps} from "@components/rate/src/iRate";
import userEvent from "@testing-library/user-event";
import {useId} from "react";

describe('Rate Component', () => {


  const renderRate = (props: RateProps = {}) => {
    const onChange = jest.fn()
    const user = userEvent.setup()
    const {result: {current: fieldid}} = renderHook(useId)
    const { container } = render(<Rate onChange={onChange} fieldid={fieldid} {...props} />);


    const drag = async (x: number) => {
      const rate = screen.getByRole('radiogroup');

      await user.pointer([
        {keys: '[TouchA>]', target: rate},
        {pointerName: 'TouchA', coords: {clientX: x, clientY: 50}},
        '[/TouchA]',

      ])
    }

    return {
      user,
      onChange,
      drag,
      fieldid,
      element: container.firstElementChild,
      getActiveStars: () => screen.queryAllByRole('radio', {checked: true}),
      getStars: () => screen.getAllByRole('radio'),
      getStar: (index: number) => screen.queryByRole('radio', {name: index.toString()})

    }
  }
  describe('attribute', () => {

    describe('<test prop:: allowClear>', () => {

      it('should not allow clear by default', async () => {
        const {drag, getActiveStars} = renderRate({defaultValue: 5, readOnly: true})
        await drag(5)
        expect(getActiveStars()).toHaveLength(5)
      });

      it('should  allow clear when allowClear is true', async () => {
        const {drag, getActiveStars} = renderRate({defaultValue: 5, allowClear: true})

        expect(getActiveStars()).toHaveLength(5)

        await drag(5)

        expect(getActiveStars()).toHaveLength(0)
      });
    })

    describe('<test prop:: allowHalf>', () => {
      it('should render whole star by default', () => {
        const {getStar} = renderRate({defaultValue: 3.5})

        expect(getStar(3.5)).not.toBeInTheDocument()
        expect(getStar(3)).toBeInTheDocument()

      });

      it('should render half star', () => {
        const {drag, getStar} = renderRate({defaultValue: 3.5, allowHalf: true})

        expect(getStar(3.5)).toBeInTheDocument()

      });
    });

    describe('<test prop:: character>', () => {
      it.each([
        {character: "Y", type: 'english'},
        {character: "友", type: 'chinese'},
      ])('should render $character $type character', ({character}) => {
        const {getActiveStars} = renderRate({defaultValue: 3, character})

        const stars = getActiveStars()

        stars.forEach(star =>
          expect(star).toHaveTextContent(character)
        )

      });

    })

    describe('<test prop:: count>', () => {
      it('should render 5 stars by default', () => {
        const {getStars} = renderRate();

        expect(getStars()).toHaveLength(5)


      });

      it('should render count stars', () => {
        const count = 3
        const {getStars} = renderRate({count});

        expect(getStars()).toHaveLength(count)


      });
    });

    describe('<test prop:: defaultValue>', () => {
      it.each([
        {
          defaultValue: -4,
          expectValue: 0,
        },
        {
          defaultValue: 0,
          expectValue: 0,
        },
        {
          defaultValue: 3,
          expectValue: 3
        },
        {
          defaultValue: 10,
          expectValue: 5
        }
      ])('should render $expectValue active star when defaultValue is $defaultValue', ({defaultValue, expectValue}) => {
        const {getActiveStars} = renderRate({defaultValue})

        expect(getActiveStars()).toHaveLength(expectValue)


      })
    });

    describe('<test prop:: readOnly>', () => {
      it('should render constant activated stars', async () => {
        const {drag, getActiveStars} = renderRate({defaultValue: 3, readOnly: true});
        await drag(200)
        expect(getActiveStars()).toHaveLength(3)
      });

    })

    describe('<test prop:: value>', () => {
      it('should render active star controlled by value', async () => {
        const {drag, getActiveStars} = renderRate({value: 0});

        await drag(200)
        expect(getActiveStars()).toHaveLength(0)
      });


    })

    describe('<test prop:: fieldid>', () => {
      it('should contain fieldid', () => {
        const {fieldid, element} = renderRate()

        expect(element).toHaveAttribute('fieldid', fieldid)
      });
    })

    describe('<test prop:: clsPrefix>', () => {
      it('should contain mui clsPrefix default', () => {
        const { element} = renderRate()

        expect(element).toHaveClass(/^mui/)
      });
      it('should contain provided clsPrefix', () => {
        const { element } = renderRate({clsPrefix: 'clsPrefix'})

        expect(element).toHaveClass(/^clsPrefix/)
      });
    })

  });

  describe('events', () => {
    describe('<test prop:: onChange>', () => {
      it('should call onChange with active star count', async () => {
        const {drag, getActiveStars} = renderRate({defaultValue: 5});

        expect(getActiveStars()).toHaveLength(5)

        await drag(5)

        expect(getActiveStars()).toHaveLength(0)
      });
    })
  })
})
