import React,{useRef} from 'react';
import styled from 'styled-components';

const Content = styled.div`
    width: ${props => props.grid * props.data.width}px;
    height: ${props => props.grid * props.data.height}px;
    min-width: ${props => props.grid/2}px;
    min-height: ${props => props.grid/2}px;     
    top: ${props => props.grid * props.data.y}px;
    left: ${props => props.grid * props.data.x}px;
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