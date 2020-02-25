import React, {useRef} from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 40%;
    height: 50px;   
    max-width: 150px;
    position: relative;

    &:before{
        content: '${props => props.label}';
        position: absolute;
        top: 3px;
        left: 5px;
        font-size: 10pt;
    }

    & input {
        -webkit-appearance: none;
        appearance: none;
        width: 100%;
        height: 100%;
        text-align: left;
        border: none;
        padding: 0px 8px;
        padding-top: 15px;
        box-sizing: border-box;
        background: var(--color-primary);
        box-shadow: 0px 0px 0px 1px var(--border-color) inset;
    }
`;

export default function Input({style, label, change, value, data}) {
    const target = useRef();
    const Edit = e => {
        const d = Object.assign({}, data);
        let value = parseInt(e)
        if(value < 1 || isNaN(value)) {
            value = 1;
            target.current.value = 1;
        }

        d[label] = value;
        change('size', d)
    }

    return <>
        <Wrapper style={style} label={label}>
            <input type="number" defaultValue={value} ref={target} onBlur={e => Edit(e.target.value)}/>
        </Wrapper>
    </>;
}