import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { StateProvider } from '../../dist/state-provider'

Enzyme.configure({ adapter: new Adapter() });

let statesRoot,
  actionsRoot,
  productActions;
const products = [
  { title: 'Circle', price: 30 },
  { title: 'Square', price: 50 }
]

beforeEach(() => {
  productActions = ({ state, dispatch, update }) => ({
    'FETCH_PRODUCTS': payload => {
      dispatch({
        type: 'ADD_PRODUCTS',
        payload: products
      })
    },
    'ADD_PRODUCTS': payload => {
      update('items', state.items.concat(payload))
    }
  })
  statesRoot = {
    items: []
  }
  actionsRoot = ({ state, dispatch, update }) => ({
    ...productActions({ state, dispatch, update })
  })
})

describe('<StateProvider />', () => {
  it('render StateProvider component', () => {
    const wrapper = mount(
      <StateProvider
        combineInitialState={statesRoot}
        combineActions={actionsRoot}
      >
        {
          (state, dispatch) => (
            <div>
              TEST
            </div>
          )
        }
      </StateProvider>
    )
    expect(wrapper.find('div').text()).toEqual('TEST')
  });
  it('can dispatch action to change state', () => {
    const wrapper = mount(
      <StateProvider
        combineInitialState={statesRoot}
        combineActions={actionsRoot}
      >
        {
          (state, dispatch) => (
            <div>
              TEST
              <button onClick={() => dispatch({ type: 'FETCH_PRODUCTS' })}></button>
            </div>
          )
        }
      </StateProvider>
    )
    wrapper.find('button').simulate('click')
    expect(wrapper.state('items')).toEqual(products)
  })
});
