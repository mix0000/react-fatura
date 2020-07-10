import React, {useEffect, useRef, useState} from 'react';
import { autorun, toJS, reaction,  } from 'mobx'
import { observer, inject } from 'mobx-react'
import store from '../../store'
import { Textfit } from 'react-textfit';



export const CompanyName = observer(({ elemKey }) => {
    const [fontSize, setFontSize] = useState(16);
    const textRef = useRef(null);
    const { elems, container, scale } = store
    const elem = elems[elemKey]
    const { layout, name } = elem
    const { width, height } = layout


    useEffect(() => {
        const textW = textRef.current.getBoundingClientRect().width;
        const newFz = Math.floor(fontSize * ((width * scale) / textW));
        setFontSize(newFz)
    }, [width, fontSize]);


    return (
            <span
            ref={textRef}
            style={{
                textAlign: 'center',
                whiteSpace: 'nowrap',
                fontSize
            }}>
                {name ? name : 'My Company Name'}
            </span>

        // <svg viewBox={`0 0 ${width} ${height}`} style={{width: '100%'}}>
        //     <text x="0" y="50%" 
        //     textLength={'100%'}
        //     lengthAdjust="spacingAndGlyphs"
        //     dominantBaseline="middle"
        //     fontSize={height/2}
        //     >{name ? name : 'My Company Name'}</text>
        // </svg>
    )
});
