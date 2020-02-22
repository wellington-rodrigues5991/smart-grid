import React, {useState} from 'react';
import styled from 'styled-components';
import Grid from './app/grid';
import Input from './app/input';

const Bar = styled.div`
    width: calc(100% - 50px);
    height: 80px;
    border-top: 1px solid var(--border-color);
    position: fixed;
    bottom: 0px;
    left: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const More = styled.div`
    width: 50px;
    height: 80px;
    position: fixed;
    bottom: 0px;
    right: 0px;
    border-top: 1px solid var(--border-color);
    border-left: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: center;

    &:before{
        content: '';
        width: 25px;
        height: 25px;
        background: ${props => 'url(data:image/svg+xml, '+encodeURIComponent('<svg version="1.1" id="Camada_1" focusable="false" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"><path fill="'+document.documentElement.style.getPropertyValue('--text-color')+'" d="M19,6.4L17.6,5L12,10.6L6.4,5L5,6.4l5.6,5.6L5,17.6L6.4,19l5.6-5.6l5.6,5.6l1.4-1.4L13.4,12L19,6.4z"/></svg>')+')'};
        background-repeat: no-repeat;
        background-size: 25px;
        background-position: center;
        transform: rotate(45deg);
    }
`;

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0px;
    left: 0px;
`;

const Context = styled.div`
    height: 50px;
    background: var(--text-color);
    border-radius: 15px;
    position: fixed;
    left: calc(50% - 125px);
    display: flex;
    overflow: hidden;
    box-sizing: border-box;
    padding: 5px;
    transition: ${props => props.selection == -1 ? 'bottom 0.1s 0.3s, opacity 0.3s' : 'bottom 0.5s, opacity 0.3s 0.35s'};
    bottom: ${props => props.selection > -1 ? '100px' : '-100vh'};
    opacity: ${props => props.selection > -1 ? '1' : '0'};
`;

const Button = styled.div`
    color: var(--color-base);
    width: ${props => props.type == 'none' ? '40px' : '120px'};
    height: 40px;
    line-height: 40px;
    padding-left: 40px;
    position: relative;
    box-sizing: border-box;
    cursor: pointer;
    border-radius: 10px;
    transition: all 0.5s;

    &:hover{background: rgba(0,0,0,0.2)}

    &:before{
        content: '';
        position: absolute;
        top: 5px;
        left: 5px;
        width: 30px;
        height: 30px;background-image: ${ props => {
            if(props.type == 'remove') return 'url(data:image/svg+xml, '+encodeURIComponent('<svg version="1.1" id="Camada_1" focusable="false" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"><path fill="'+document.documentElement.style.getPropertyValue('--color-base')+'" d="M6,19c0,1.1,0.9,2,2,2h8c1.1,0,2-0.9,2-2V7H6V19z M19,4h-3.5l-1-1h-5l-1,1H5v2h14V4z"/></svg>')+')'
            if(props.type == 'none') return 'url(data:image/svg+xml, '+encodeURIComponent('<svg version="1.1" id="Camada_1" focusable="false" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"><path fill="'+document.documentElement.style.getPropertyValue('--color-base')+'" d="M19,6.4L17.6,5L12,10.6L6.4,5L5,6.4l5.6,5.6L5,17.6L6.4,19l5.6-5.6l5.6,5.6l1.4-1.4L13.4,12L19,6.4z"/></svg>')+')'
            else return 'url(data:image/svg+xml, '+encodeURIComponent('<svg version="1.1" id="Camada_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1125 1120" style="enable-background:new 0 0 1125 1120;" xml:space="preserve"><g><polygon fill="'+document.documentElement.style.getPropertyValue('--color-base')+'" points="0,888.13 0,1120.03 245.54,1120.03 934.43,431.14 695.71,192.42 	"/><path fill="'+document.documentElement.style.getPropertyValue('--color-base')+'" d="M1105.42,151.96L973.04,19.58c-25.38-25.38-66.26-26.19-92.63-1.85l-79,72.92c-3.73,3.45-6.9,7.25-9.66,11.26l-41.47,35.94 l231.9,231.9l95.49-95.49l0,0l27.75-27.75C1131.53,220.41,1131.53,178.07,1105.42,151.96z"/></g></svg>')+')'
        }};
        background-repeat: no-repeat;
        background-size: ${ props => props.type == 'remove' ? 'auto 25px' : 'auto 20px'};
        background-position: ${ props => props.type == 'remove' ? '2.5px center' : '5px center'};
    }
`;

export default function App({data, setData, open}) {
    window.temp = {start: null, target: null, data: null, id: null};

    const Add = () => {
        open(url => {
            const d = data.data.slice();

            d.push({width: 1, height: 1, x: 0, y: 0, image: url});
            Update('data', d)
        });
    }

    const Edit = () => {
        open( url => {
            const d = data.data.slice();

            d[data.selection].image = url;
            Update('data', d)
        });
    }

    const Delete = () => {
        const d = [];

        for(let i = 0; i < data.data.length; i++){
            if(i != data.selection) d.push(data.data[i]);
        }
        Update('data', d, -1)
    }

    const Update = (key, value, id) => {
        const d = Object.assign({}, data);

        d[key] = value;
        if(id != undefined) d.selection = id;
        
        if(key == 'size') Tile.resize(d);
        else setData(d);
    }

    const Tile = {
        Start: (e, id) => {
            let pos = {x: e.clientX, y: e.clientY};
            let d = e.target.getBoundingClientRect();
            const min = {
                x: (window.innerWidth - e.target.parentNode.getBoundingClientRect().width) / 2, 
                y: (window.innerHeight - 80 - e.target.parentNode.getBoundingClientRect().height) / 2
            };
    
            if(e.clientX == undefined) pos = {x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY};
            if(e.target.parentNode.getBoundingClientRect().height > window.innerHeight - 80) min.y = min.x;
    
            e.target.parentNode.parentNode.style.overflow = 'hidden';
            e.target.style.transition = 'none';
            if(data.selection > -1) e.target.parentNode.children[data.selection].style.boxShadow = 'none'
            e.target.style.boxShadow = '0px 0px 0px 3px var(--color-secundary) inset';
            
            window.temp = {
                start: pos, 
                pos: e.target.getBoundingClientRect(),
                target: e.target, 
                data: data.data.slice(), 
                parent: e.target.parentNode,
                min: min,
                id: id,
                size: {width: e.target.getBoundingClientRect().width, height: e.target.getBoundingClientRect().height},
                type: d.width + d.x-(d.width * 0.3 > 15 ? 15 : d.width * 0.3) <= pos.x && d.width + d.x >= pos.x ? 'size' : 'pos'
            }
        },
        Move: e => {
            if(window.temp.id != null){
                let pos = {x: e.clientX, y: e.clientY};

                if(e.clientX == undefined) pos = {x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY}
    
                let x = (pos.x - window.temp.start.x);
                let y = (pos.y - window.temp.start.y);

                if(window.temp.type == 'size'){
                    window.temp.target.style.width = x + window.temp.size.width +'px';
                    window.temp.target.style.height = y + window.temp.size.height +'px';
                }
                else {
                    window.temp.target.style.left = x + (window.temp.pos.x - window.temp.min.x) +'px';
                    window.temp.target.style.top = y + (window.temp.pos.y - window.temp.min.y + window.temp.parent.parentNode.scrollTop) +'px';
                }
            }
        },
        End: d => {
            if(window.temp.id != null){
                let x =  parseFloat(window.temp.target.getBoundingClientRect().x) - window.temp.min.x;
                x = x / data.grid.size;
                
                let y =  parseFloat(window.temp.target.getBoundingClientRect().y) + window.temp.parent.parentNode.scrollTop - window.temp.min.y;
                y = y / data.grid.size;

                console.log( parseFloat(window.temp.target.getBoundingClientRect().y), window.temp.parent.parentNode.scrollTop, window.temp.min.y, y, data.grid.size)

                let w =  window.temp.target.getBoundingClientRect().width;
                w = w / data.grid.size;
                
                let h =  window.temp.target.getBoundingClientRect().height;
                h = h / data.grid.size;

                window.temp.data = Tile.set(x, y, w, h, window.temp.id, window.temp.data, data.size);
                
                window.temp.target.style.removeProperty('left');
                window.temp.target.style.removeProperty('top');
                window.temp.target.style.removeProperty('width');
                window.temp.target.style.removeProperty('height');
                window.temp.target.style.removeProperty('transition');
                window.temp.target.style.removeProperty('box-shadow');
                window.temp.parent.parentNode.style.removeProperty('overflow');
                if(data.selection > -1) window.temp.target.parentNode.children[data.selection].style.removeProperty('box-shadow');
            }
            
            Update('data', window.temp.data == null ? data.data : window.temp.data , window.temp.id);
            window.temp = {start: null, target: null, data: null, id: null};
        },
        resize: parent => {
            if(parent == undefined) parent = data.data;
            let d = parent.data.slice();

            for(let i = 0; i < data.data.length; i++){
                const target = data.data[i];
                d = Tile.set(
                    target.x, 
                    target.y, 
                    target.width, 
                    target.height, 
                    i, 
                    d,
                    parent.size
                )
            }

            parent.data = d;
            setData(parent);
        },
        set: (x, y, w, h, id, parent, size) => {
            const d = parent.slice();

            if(x < 0) x = 0;
            if(x > size.width-1) x = size.width-1;
            
            if(y < 0) y = 0;
            if(y > size.height-1) y = size.height-1;

            if(w < 1) w = 1;
            if(w+x > size.width) w = size.width-x;
            
            if(h < 1) h = 1;
            if(h+y > size.height) h = size.height-y;
            
            d[id].width = w;
            d[id].height = h;                  
            d[id].x = x;
            d[id].y = y;

            return d;
        }
    }

    return <Wrapper 
        onMouseUp={Tile.End} onTouchEnd={Tile.End}
        onMouseMove={e => Tile.Move(e)} onTouchMove={e => Tile.Move(e)}
    >
        <Grid mailer={data} setMailer={setData} start={Tile.Start} />
        <Bar>
            <Input label="width" value={data.size.width} change={Update} data={data.size} />
            <Input label="height" value={data.size.height} change={Update} data={data.size} style={{marginLeft: '20px'}} />
        </Bar>
        <More onClick={Add} />
        <Context selection={data.selection}>
            <Button onClick={Edit}>Change</Button>
            <Button type="remove" onClick={Delete}>Delete</Button>
            <Button type="none" onClick={() => Update('data', data.data, -1)} />
        </Context>
    </Wrapper>;
}