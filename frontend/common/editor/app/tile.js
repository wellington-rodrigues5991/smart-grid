import React,{useRef} from 'react';
import styled from 'styled-components';

const Content = styled.div`
    width: ${props => props.grid * props.data.width - props.grid * 0.2}px;
    height: ${props => props.grid * props.data.height - props.grid * 0.2}px;
    min-width: ${props => props.grid/2}px;
    min-height: ${props => props.grid/2}px;     
    top: ${props => props.grid * props.data.y + props.grid * 0.1}px;
    left: ${props => props.grid * props.data.x + props.grid * 0.1}px;
    background: url(${props => props.data.image});
    box-shadow: ${props => props.select ? '0px 0px 0px 3px var(--color-secundary) inset' : 'none'};
    transition: all 0.3s;   
    position: absolute;
    background-size: contain;
    background-repeat: no-repeat;
`;

export default function Tile({id, top, data, grid, start, selection}){
    return <Content
        top={top} 
        data={data} 
        grid={grid}
        onMouseDown={e => start(e, id)}
        onTouchStart={e => start(e, id)}
        select={selection == id}
    />;
}