import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import DisplayInput from './DisplayInput';

configure({adapter: new Adapter()});

describe('<DisplayInput />', () => {
    let wrapper;

    const props = {
        inputValues: { numbers: null, letters: '' },
        currentMessage: '',
        submitMessage: jest.fn()
    }

    beforeEach(() => {
        wrapper = shallow(<DisplayInput {...props} />);
    });

    it('renders a div element', () => {
        expect(wrapper.find('div').length).toBeGreaterThan(0);
    });
    
    it('button onClick calls props.submitMessage', () => {
        wrapper.find('button').simulate('click');
        expect(props.submitMessage).toHaveBeenCalled();
    })
})