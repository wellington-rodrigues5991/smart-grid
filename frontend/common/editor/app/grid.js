import React,{useRef} from 'react';
import styled from 'styled-components';
import Manager from './manager';

const Wrapper = styled.div`
    width: 100vw;
    height: calc(100% - 80px);
    position: fixed;
    top: 0px;
    left: 0px;
    overflow: auto;
    display: flex;
    justify-content: center;
`;

const Content = styled.div`
    background: url(data:image/svg+xml, ${props => encodeURIComponent('<svg version="1.1" id="Camada_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 1133.86 1133.86" style="enable-background:new 0 0 1133.86 1133.86;" xml:space="preserve"><path style="fill-opacity: .05;" fill="'+document.documentElement.style.getPropertyValue('--text-color')+'" d="M810.56,1077.17H323.3c-147.24,0-266.61-119.36-266.61-266.61V323.3c0-147.24,119.36-266.61,266.61-266.61h487.26	c147.24,0,266.61,119.36,266.61,266.61v487.26C1077.17,957.8,957.8,1077.17,810.56,1077.17z"/></svg>')});
    background-size: ${props => props.data.grid.size}px;
    width: ${props => props.data.grid.size * props.data.size.width}px;
    height: ${props => props.data.grid.size * props.data.size.height}px;
    margin: ${props => (props.data.grid.size * props.data.size.height) > window.innerHeight ? (window.innerWidth * 0.1)+'px 0' : 'auto 0' };
    transition: all 0.5s;
    position: relative;
`;

export default function Grid({mailer, setMailer, start}){
    const gridContainer = useRef();
    const resizeMailer = () => {
        let data = Object.assign({}, mailer);
        let res = window.innerWidth * 0.8;

        if(data.grid == undefined) data.grid = {};
        data.grid.old = data.grid.divisions;
        data.grid.divisions = mailer.size.width;
        data.grid.size = res/data.grid.divisions;
        data.grid.w = data.grid.w == undefined ? res : data.grid.w < gridContainer.current.scrollWidth ? gridContainer.current.scrollWidth : data.grid.w;
        data.grid.h = data.grid.h == undefined ? res : (data.grid.h < gridContainer.current.scrollHeight ? gridContainer.current.scrollHeight : data.grid.h);
        setMailer(data);
    }

    if(mailer.grid.divisions != mailer.size.width) setTimeout(() => resizeMailer(), 10);
    window.resize[0] = resizeMailer;
    
    return <Wrapper style={{overflow: 'auto'}}>
        <Content 
            data={mailer} 
            color={document.documentElement.style.getPropertyValue('--text-color')}
            ref={gridContainer}
        >
            <Manager data={mailer} start={start} />
        </Content>
    </Wrapper>;
}

window.resize = [() => {}];
window.addEventListener("resize", () => {
    for(let i = 0; i < window.resize.length; i++){
        if(window.resize[i] != undefined)window.resize[i]();
    }
});