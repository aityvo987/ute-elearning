'use client'
import { useGetUserCourseContentQuery } from '@/redux/features/courses/coursesApi';
import React, { FC, useEffect, useState } from 'react'
import Loader from '../Loader/Loader';
import Heading from '@/app/utils/Heading';
import Header from '../Header';
import Footer from '../Footer';
import CourseContentMedia from './CourseContentMedia';
import CourseContentList from './CourseContentList';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import Link from 'next/link';

type Props = {
    id: string;
    user: any;
}

const CourseUserContent = ({ id, user }: Props) => {
    const [activeVideo, setActiveVideo] = useState(0);
    const [open, setOpen] = useState(false);
    const [route, setRoute] = useState("Login");
    const { data, isLoading, error, refetch } = useGetUserCourseContentQuery({ id }, { refetchOnMountOrArgChange: true });
    const content = data?.content;
    const progress = user.courses.find((course: any) => course._id.toString() === id)?.progress || 0;
    useEffect(() => {
        if (error) {
            console.error("Error fetching", error);
        }
        setActiveVideo(progress);
    }, [error]);

    return (
        <>
            {isLoading ? (
                <Loader></Loader>
            ) : (
                <>
                    {user.role !== "lecturer" ? (
                        <Header
                            activeItem={1}
                            open={open}
                            setOpen={setOpen}
                            route={route}
                            setRoute={setRoute}
                            isLecturerQR={true}
                        />
                    ) : (
                        <></>
                    )}
                    <div className="w-full grid 800px:grid-cols-10">
                        <Heading
                            title={content[activeVideo]?.title}
                            description='courseContent'
                            keywords={content[activeVideo]?.tags}
                        >
                        </Heading>
                        <div className="col-span-7">
                            <CourseContentMedia
                                data={content}
                                id={id}
                                activeVideo={activeVideo}
                                setActiveVideo={setActiveVideo}
                                user={user}
                                refetch={refetch}
                            ></CourseContentMedia>
                        </div>
                        {user.role !== "lecturer" ? (
                            <div className="hidden 800px:block 800px:col-span-3">
                                <CourseContentList
                                    setActiveVideo={setActiveVideo}
                                    data={content}
                                    activeVideo={activeVideo}
                                />
                            </div>
                        ) : (
                            <div className="hidden 800px:block 800px:col-span-3 flex items-center justify-center pt-10 pr-10">
                            <Link
                                className={`w-full flex gap-2 items-center py-3 px-4 pr-5 cursor-pointer bg-blue-500 rounded-full`}
                                href={"/admin"}
                            >
                                <MdOutlineAdminPanelSettings
                                    size={30}
                                    fill="#fff"
                                />
                                <h5 className="text-white text-lg"> {user.role === "admin" ? "Admin Dashboard" : "Lecturer Dashboard"} </h5>
                            </Link>
                        </div>
                        )}
                    </div>
                </>

            )}
        </>
    )
}
export default CourseUserContent