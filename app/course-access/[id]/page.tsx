'use client'
import CourseDetailPage from '@/app/components/Course/CourseDetailPage';
import CourseUserContent from '@/app/components/Course/CourseUserContent';
import Loader from '@/app/components/Loader/Loader';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { redirect } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react'

type Props = {
    params: any;
}

const page = ({ params }: Props) => {
    const [open, setOpen] = useState(false);
    const id = params.id;

    const { isLoading, error, data } = useLoadUserQuery(undefined, {});
    const user = data?.user;
    useEffect(() => {
        if (data) {
            if (user.role!=="lecturer"){
                const isPurchased = data.user.courses.find((item: any) => item._id === id);
                if (!isPurchased || error) {
                    redirect("/");
                }
            }
            
        }
        if (error) {
            redirect("/");
        }
    }, [data, error]);

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div>
                    <CourseUserContent id={id} user={data?.user} />
                </div>
            )}
        </>
    )
}
export default page