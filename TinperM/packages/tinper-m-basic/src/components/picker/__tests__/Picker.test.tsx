/** Picker.tsx */
import React, { useState } from 'react'
import { render, screen } from '@testing-library/react'
import { PickerProps } from '../src'
import { Picker } from '@tinper/m'
import { basicColumns } from '../demos/columns-data'
import userEvent from '@testing-library/user-event'

describe('Picker Component <test prop:: value> <test prop:: closeOnMaskClick>', () => {
  const PickerElement = (props: Partial<PickerProps> = {}) => {
    const [visible, setVisible] = useState(true)
    const [loading, setLoading] = useState(props.loading ?? false)
    return (
      <Picker visible={visible} loading={loading} onClose={() => {
        setVisible(false)

      }} columns={basicColumns} {...props} />)

  }
  const renderPicker = (props: Partial<PickerProps> = {}) => {


    const { container, baseElement } = render(<PickerElement {...props} />)
    const user = userEvent.setup()

    return {
      container,
      baseElement,
      user
    }
  }




  describe('<test prop:: title>', () => {
    it('should render title', () => {
      renderPicker({
        title: 'title'
      })

      expect(screen.getByText('title')).toBeInTheDocument()
    })
  })



  describe('<test prop:: confirmText>', () => {
    it('should render confirmText', () => {
      renderPicker({
        confirmText: 'confirmText'
      })
      expect(screen.getByText('confirmText')).toBeInTheDocument()
    });
  })

  describe('<test prop:: cancelText>', () => {
    it('should render cancelText', () => {
      renderPicker({
        cancelText: 'cancelText'
      })
      expect(screen.getByText('cancelText')).toBeInTheDocument()
    });
  })


  describe('<test prop:: clearAndReturnText	>', () => {
    it('should render clearAndReturnText	', () => {
      renderPicker({
        showClear: true,
        clearAndReturnText	: 'clearAndReturnText'
      })
      expect(screen.getByText('clearAndReturnText')).toBeInTheDocument()
    });
  })





  describe('<test prop:: loading> <test prop:: loadingContent>', () => {
    it('should render loadingContent', () => {
      renderPicker({ loading: true, loadingContent: 'loading...' })

      expect(screen.getByText('loading...')).toBeInTheDocument()
    })
  })

  describe('<test prop:: popupClassName>', () => {
    it('should render custom popup style', () => {

      renderPicker({ popupStyle: { background: 'red' } })

      expect(screen.getByRole('tooltip')).toHaveStyle('background-color: red')

    });
  })
  describe('<test prop:: popupClassName>', () => {
    it('should render custom popup lassName', () => {

      renderPicker({ popupClassName: 'popupClassName' })

      expect(screen.getByRole('tooltip')).toHaveClass('popupClassName')
    });
  })

  describe('<test prop:: onSelect>', () => {
    it('should called onSelect', async () => {
      const onSelect = jest.fn()
      const { user } = renderPicker({ onSelect })
      await user.click(screen.getByText('周二'))

    });
  })

  describe('<test prop:: onConfirm>', () => {
    it('should called onConfirm', async () => {
      const onConfirm = jest.fn()
      const { user, baseElement } = renderPicker({ onConfirm })
      await user.click(screen.getByText('周二'))
      await user.click(screen.getByText('下午'))
      await user.click(screen.getByRole('button', { name: '确定' }))
      screen.debug(baseElement)

    });
  })

  describe('<test prop:: onCancel>', () => {
    it('should called onCancel', async () => {
      const onCancel = jest.fn()
      const { user } = renderPicker({ onCancel })
      await user.click(screen.getByRole('button', { name: '取消' }))


    });
  })





  describe('<test prop:: renderLabel> <test prop:: mouseWheel> <test prop:: popupStyle> <test prop:: onDismiss> <test prop:: fieldid> <test prop:: clsPrefix><test prop:: visible> <test prop:: onClose> <test prop:: columns> <test prop:: defaultValue> <test prop:: showClear>', () => {
    it('should render correctly', () => {
      const { baseElement } = renderPicker({ visible: true, columns: basicColumns, defaultValue: ['Wed', 'pm'], showClear: true })
    });
  })

})
