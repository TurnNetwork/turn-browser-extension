import React from 'react';
import { Skeleton } from 'antd';

const LayoutSkeleton = () => <div className='flex flex-col
w-[100vw]
h-[100vh] 
items-center justify-center'>
    <Skeleton paragraph={
        { rows: 5 }
    } active />
    <div className='flex justify-around'>
        <Skeleton.Button active shape={'circle'} />
        <Skeleton.Button active shape={'circle'} />
        <Skeleton.Button active shape={'circle'} />
    </div>
    <Skeleton paragraph={
        { rows: 10 }
    } active />
</div>;

export default LayoutSkeleton;