
import React from 'react';
import QRCode from "react-qr-code";


export default function PoiEntry({ name, tags, latitude, longitude }) {

    const qrcodeStyles = {
        width: "70px",
        height: "70px",
    };

    return (
        <div className='h-30 w-full my-5 card rounded-xl p-5 flex flex-row'>
            <div className='flex flex-col w-full'>
                <ul className='flex flex-row'>
                    {   
                        tags?.slice(0, 2).map((tag, index) => (
                            <li className='accent px-5 rounded-xl mx-2 truncate overflow-ellipsis text-black' key={tag?.TagName?.en + "" + index}>{tag?.TagName?.en}</li>
                        ))
                    }
                </ul>
                <h1 className='text-3xl mt-2 ml-2'>{name}</h1>
            </div>
            <div className='flex justify-end items-end items-center p-2 light rounded-xl'>
                <QRCode key={1} style={qrcodeStyles} value={`https://maps.google.com/?q=${latitude},${longitude}`} />
            </div>
        </div>
    );
}