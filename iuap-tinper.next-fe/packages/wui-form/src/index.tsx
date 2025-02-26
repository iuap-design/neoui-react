import {createForm, createFormField, formShape} from 'rc-form';
import createDOMForm from 'rc-form/lib/createDOMForm';
import {FormProvider} from './context';
import ErrorList from './ErrorList';
import InternalForm, {useForm} from './Form';
import Item from './FormItem';
import List from './FormList';

type InternalFormType = typeof InternalForm;

interface FormInterface extends InternalFormType {
  useForm: typeof useForm;
  Item: typeof Item;
  FormItem: typeof Item;
  createForm: typeof createForm;
  createFormField: typeof createFormField;
  formShape: typeof formShape;
  List: typeof List;
  ErrorList: typeof ErrorList;
  Provider: typeof FormProvider;

  /** @deprecated Only for warning usage. Do not use. */
  create: (option?: any) => void;
}

const FIELD_META_PROP = 'data-__meta';
const FIELD_DATA_PROP = 'data-__field';
const Form = InternalForm as FormInterface;
Form.Item = Item;
Form.FormItem = Item;
Form.createForm = createForm;
Form.createFormField = createFormField;
Form.formShape = formShape;
Form.create = createForm;
Form.List = List;
Form.ErrorList = ErrorList;
Form.useForm = useForm;
Form.Provider = FormProvider;
Form.create = function create(options) {
    return createDOMForm({
        fieldNameProp: 'id',
        ...options,
        fieldMetaProp: FIELD_META_PROP,
        fieldDataProp: FIELD_DATA_PROP
    });
};

export default Form;
