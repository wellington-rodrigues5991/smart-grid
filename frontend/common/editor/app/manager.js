import React from 'react';
import styled from 'styled-components';
import Tile from './tile';

export default function Manager({data, start}) {
    return <>
        {data.data.length > 0 && data.data.map((value, i) => <Tile selection={data.selection} id={i} start={start} top={data.size.height} key={i} data={value} grid={data.grid.size} />)}
    </>;
}