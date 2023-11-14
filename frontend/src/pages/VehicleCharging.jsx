import React, { useEffect } from 'react';
import PoiEntry from '../components/PoiEntry';
import ProgressBar from '../components/ProgressBar/ProgressBar';

export default function VehicleCharging() {

    const [items, setItems] = React.useState(null);
    const [charge, setCharge] = React.useState(90);
    
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            fetch('https://tourism.opendatahub.com/v1/ODHActivityPoi?type=188&latitude=' + 
                position.coords.latitude + 
                '&longitude=' + position.coords.longitude + 
                '&removenullvalues=false'
            )
            .then(res => res.json())
            .then((data) => {
                setItems(data);
            })
            .catch(console.log)
        },() => {});
    }, []);

    return (
        <div className='w-full flex flex-col items-center justify-center h-screen'>
            <div className='w-full flex flex-col items-start justify-start px-20'>
                <div className='w-full text-center mt-20 items-center justify-center flex'>
                    <ProgressBar value={charge}/>
                </div>
                <div className='w-full h-40 card rounded-xl mt-20 justify-center items-center flex p-5'>
                    <div className='flex flex-row w-full h-full'>
                        <div className='text-5xl w-full h-full flex text-center items-center justify-center'>
                            11kW
                        </div>
                        <div className='text-5xl w-full h-full flex text-center items-center justify-center border-x-2 center-border'>
                            50/50A
                        </div>
                        <div className='text-5xl w-full h-full flex text-center items-center justify-center'>
                            220V
                        </div>  
                    </div>
                </div>
                <div className='flex flex-row w-full h-30 mt-10'>
                    <div className='flex flex-col text-center justify-center items-center card w-full h-full rounded-xl p-10 mr-5'>
                        <div className='text-2xl mb-1'>Time Remaining</div>
                        <div className='text-5xl'>36min</div>
                    </div>
                    <div className='flex flex-col text-center justify-center items-center card w-full h-full rounded-xl p-5 ml-5'>
                        <div className='text-2xl mb-1 flex flex-row'>Energy Delivery</div>
                        <div className='text-5xl'>12.3kWh</div>
                    </div>
                </div>
            </div>

            <div className='w-full mt-20 px-20'>
                <div className='w-full text-5xl'>
                    Don't know what to do now?
                </div>
                <div className='w-full text-3xl'>
                    Here are some places you can visit in the meantime
                </div>
            </div>

            <div className='h-full max-h-full w-full justify-center items-center px-20 pb-20 grow overflow-auto mt-5'>
                <div className='w-full flex flex-col'>
                    {
                        items?.Items?.map((item, index) => (
                            <PoiEntry key={index} name={item.Detail.en.Title} tags={item.LTSTags} latitude={item.GpsPoints.position.Latitude} longitude={item.GpsPoints.position.Longitude} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
