import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


const BatchDetails = () => {
    const { user } = useSelector(state => state.auth);

    return (
        <div className="bg-blight h-screen">
            <div className="bg-white rounded-2xl p-4 mb-8">
                <div className="flex items-center justify-between">
                    <div className="flex">
                    <Link to={`/${user.role}/batches`}>
                        <div className="mr-3 text-blue-medium"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg></div>
                        </Link>
                        

                        <div className="text-blacktext font-bold text-base sm:text-xl">Batch Progress</div>
                    </div>
                    <div className="">
                        <button type="button" className="flex justify-center items-center py-3 px-3 whitespace-nowrap sm:px-7 text-white font-semibold text-xs bg-blue-medium rounded-md"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /> </svg> Print Batch</button>
                    </div>
                 </div>
                 <div className="text-base flex mt-2"><div className="inline-block">Batch No: </div> <div className="break-all text-gray-medium ml-1">43534v4wtrgrtrthtyuu77777775455tsf</div></div>
            </div>


<div className="md:flex">
    <div className="mr-2 relative w-1/12 text-center hidden md:block">
        <div className="w-0.5 border-dashed border border-gray-300 h-full absolute left-0 right-0 mx-auto"></div>
    </div>
    <div className="">
        <div className="bg-white rounded-2xl p-5 mb-8 shadow-lg relative font-medium">
                <div className="absolute md:block hidden -left-20">
                    <img src="../images/checked-timeline.svg" alt="" />
                </div>
                <div className="text-base font-semibold mb-6">Operator</div>
                    <div className="lg:flex justify-between border-b border-indigo-100 pb-6 mb-6">
                        <div className="flex align-top">
                            <div className="w-8 h-8 max-w-full rounded-full overflow-hidden mr-3">
                                    <img className="w-full h-full object-cover" src="../images/face-img.png" alt="" />
                            </div>
                            <div>
                                <div className="font-semibold text-sm mb-2">Heather Wright</div>
                                    <div className="sm:flex items-center">
                                        <div className="flex items-center lg:mr-10">
                                            <div className="mr-2">
                                                <img src="../images/phone-icon.svg" alt="" />
                                            </div>
                                            <div className="text-blue-medium text-sm">+1(404) 789 9043</div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="mr-2">
                                                <img src="../images/time-icon.svg" alt="" />
                                            </div>
                                            <div className="text-gray-400 text-sm">18-10-2021 | 10:00:01</div>
                                        </div>
                                    </div>
                                    <div className="break-all text-gray-600 text-sm mt-4">fnsdfjh5o5o33-r-fsdpffr-44mfsdpff44fsfff44fs</div>
                            </div>
                        </div>
                        <div className="mt-6 lg:mt-0">
                            <img src="../images/qrcode.png" alt="" />
                        </div>
                    </div>
                    <div className="lg:grid lg:grid-cols-2 gap-12 text-xs sm:text-sm">
                        <div className="">
                            <div className="flex sm:grid sm:grid-cols-3 sm:gap-4 mb-5">
                                <div className="text-gray-400 flex"><div className="mr-4"> <img src="../images/checkbox-completed.svg" alt="" /></div> Registration No</div>
                                <div className="text-center">:</div>
                                <div className="ml-2 sm:ml-0">23457</div>
                            </div>
                            <div className="flex sm:grid sm:grid-cols-3 sm:gap-4 mb-5">
                                <div className="text-gray-400 flex"><div className="mr-4"> <img src="../images/checkbox-completed.svg" alt="" /></div> Extractor Name</div>
                                <div className="text-center">:</div>
                                <div className="ml-2 sm:ml-0">Midland</div>
                            </div>
                            
                            <div className="flex sm:grid sm:grid-cols-3 sm:gap-4 mb-5">
                                <div className="text-gray-400 flex"><div className="mr-4"> <img src="../images/checkbox-completed.svg" alt="" /></div> Drill Coordinates</div>
                                <div className="text-center">:</div>
                                <div className="ml-2 sm:ml-0">123 Plain Street</div>
                            </div>
                            
                        </div>
                        <div className="">
                           <div className="flex sm:grid sm:grid-cols-3 sm:gap-4 mb-5">
                                <div className="text-gray-400 flex"><div className="mr-4"> <img src="../images/checkbox-completed.svg" alt="" /></div> Exporter Name</div>
                                <div className="text-center">:</div>
                                <div className="ml-2 sm:ml-0">Midland Man</div>
                            </div>

                            <div className="flex sm:grid sm:grid-cols-3 sm:gap-4 mb-5">
                                <div className="text-gray-400 flex"><div className="mr-4"> <img src="../images/checkbox-completed.svg" alt="" /></div> Importer Name</div>
                                <div className="text-center">:</div>
                                <div className="ml-2 sm:ml-0">New Petro</div>
                            </div>

                        </div>
                    </div>
            </div>


            <div className="bg-white rounded-2xl p-5 mb-8 shadow-lg relative font-medium">
                <div className="absolute md:block hidden -left-20">
                    <img src="../images/checked-timeline.svg" alt="" />
                </div>
                <div className="text-base font-semibold mb-6">Importer</div>
                    <div className="lg:flex justify-between border-b border-indigo-100 pb-6 mb-6">
                        <div className="flex align-top">
                            <div className="w-8 h-8 max-w-full rounded-full overflow-hidden mr-3">
                                    <img className="w-full h-full object-cover" src="../images/face-img.png" alt="" />
                            </div>
                            <div>
                                <div className="font-semibold text-sm mb-2">Heather Wright</div>
                                    <div className="sm:flex items-center">
                                        <div className="flex items-center lg:mr-10">
                                            <div className="mr-2">
                                                <img src="../images/phone-icon.svg" alt="" />
                                            </div>
                                            <div className="text-blue-medium text-sm">+1(404) 789 9043</div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="mr-2">
                                                <img src="../images/time-icon.svg" alt="" />
                                            </div>
                                            <div className="text-gray-400 text-sm">18-10-2021 | 10:00:01</div>
                                        </div>
                                    </div>
                                    <div className="break-all text-gray-600 text-sm mt-4">fnsdfjh5o5o33-r-fsdpffr-44mfsdpff44fsfff44fs</div>
                            </div>
                        </div>
                        <div className="mt-6 lg:mt-0">
                            <img src="../images/qrcode.png" alt="" />
                        </div>
                    </div>
                    <div className="lg:grid lg:grid-cols-2 gap-12 text-xs sm:text-sm">
                        <div className="">
                            <div className="flex sm:grid sm:grid-cols-3 sm:gap-4 mb-5">
                                <div className="text-gray-400 flex"><div className="mr-4"> <img src="../images/checkbox-completed.svg" alt="" /></div> Registration No</div>
                                <div className="text-center">:</div>
                                <div className="ml-2 sm:ml-0">23457</div>
                            </div>
                            <div className="flex sm:grid sm:grid-cols-3 sm:gap-4 mb-5">
                                <div className="text-gray-400 flex"><div className="mr-4"> <img src="../images/checkbox-completed.svg" alt="" /></div> Extractor Name</div>
                                <div className="text-center">:</div>
                                <div className="ml-2 sm:ml-0">Midland</div>
                            </div>
                            
                            <div className="flex sm:grid sm:grid-cols-3 sm:gap-4 mb-5">
                                <div className="text-gray-400 flex"><div className="mr-4"> <img src="../images/checkbox-completed.svg" alt="" /></div> Drill Coordinates</div>
                                <div className="text-center">:</div>
                                <div className="ml-2 sm:ml-0">123 Plain Street</div>
                            </div>
                            
                        </div>
                        <div className="">
                           <div className="flex sm:grid sm:grid-cols-3 sm:gap-4 mb-5">
                                <div className="text-gray-400 flex"><div className="mr-4"> <img src="../images/checkbox-completed.svg" alt="" /></div> Exporter Name</div>
                                <div className="text-center">:</div>
                                <div className="ml-2 sm:ml-0">Midland Man</div>
                            </div>

                            <div className="flex sm:grid sm:grid-cols-3 sm:gap-4 mb-5">
                                <div className="text-gray-400 flex"><div className="mr-4"> <img src="../images/checkbox-completed.svg" alt="" /></div> Importer Name</div>
                                <div className="text-center">:</div>
                                <div className="ml-2 sm:ml-0">New Petro</div>
                            </div>

                        </div>
                    </div>
            </div>


            <div className="bg-white rounded-2xl p-5 mb-8 shadow-lg relative font-medium">
                <div className="absolute md:block hidden -left-20">
                    <img src="../images/checked-timeline.svg" alt="" />
                </div>
                <div className="text-base font-semibold mb-6">Exporter</div>
                    <div className="lg:flex justify-between border-b border-indigo-100 pb-6 mb-6">
                        <div className="flex align-top">
                            <div className="w-8 h-8 max-w-full rounded-full overflow-hidden mr-3">
                                    <img className="w-full h-full object-cover" src="../images/face-img.png" alt="" />
                            </div>
                            <div>
                                <div className="font-semibold text-sm mb-2">Heather Wright</div>
                                    <div className="sm:flex items-center">
                                        <div className="flex items-center lg:mr-10">
                                            <div className="mr-2">
                                                <img src="../images/phone-icon.svg" alt="" />
                                            </div>
                                            <div className="text-blue-medium text-sm">+1(404) 789 9043</div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="mr-2">
                                                <img src="../images/time-icon.svg" alt="" />
                                            </div>
                                            <div className="text-gray-400 text-sm">18-10-2021 | 10:00:01</div>
                                        </div>
                                    </div>
                                    <div className="break-all text-gray-600 text-sm mt-4">fnsdfjh5o5o33-r-fsdpffr-44mfsdpff44fsfff44fs</div>
                            </div>
                        </div>
                        <div className="mt-6 lg:mt-0">
                            <img src="../images/qrcode.png" alt="" />
                        </div>
                    </div>
                    <div className="lg:grid lg:grid-cols-2 gap-12 text-xs sm:text-sm">
                        <div className="">
                            <div className="flex sm:grid sm:grid-cols-3 sm:gap-4 mb-5">
                                <div className="text-gray-400 flex"><div className="mr-4"> <img src="../images/checkbox-completed.svg" alt="" /></div> Registration No</div>
                                <div className="text-center">:</div>
                                <div className="ml-2 sm:ml-0">23457</div>
                            </div>
                            <div className="flex sm:grid sm:grid-cols-3 sm:gap-4 mb-5">
                                <div className="text-gray-400 flex"><div className="mr-4"> <img src="../images/checkbox-completed.svg" alt="" /></div> Extractor Name</div>
                                <div className="text-center">:</div>
                                <div className="ml-2 sm:ml-0">Midland</div>
                            </div>
                            
                            <div className="flex sm:grid sm:grid-cols-3 sm:gap-4 mb-5">
                                <div className="text-gray-400 flex"><div className="mr-4"> <img src="../images/checkbox-completed.svg" alt="" /></div> Drill Coordinates</div>
                                <div className="text-center">:</div>
                                <div className="ml-2 sm:ml-0">123 Plain Street</div>
                            </div>
                            
                        </div>
                        <div className="">
                           <div className="flex sm:grid sm:grid-cols-3 sm:gap-4 mb-5">
                                <div className="text-gray-400 flex"><div className="mr-4"> <img src="../images/checkbox-completed.svg" alt="" /></div> Exporter Name</div>
                                <div className="text-center">:</div>
                                <div className="ml-2 sm:ml-0">Midland Man</div>
                            </div>

                            <div className="flex sm:grid sm:grid-cols-3 sm:gap-4 mb-5">
                                <div className="text-gray-400 flex"><div className="mr-4"> <img src="../images/checkbox-completed.svg" alt="" /></div> Importer Name</div>
                                <div className="text-center">:</div>
                                <div className="ml-2 sm:ml-0">New Petro</div>
                            </div>

                        </div>
                    </div>
            </div>


            <div className="bg-white rounded-2xl p-5 mb-8 shadow-lg relative font-medium">
                <div className="absolute md:block hidden -left-20">
                    <img src="../images/checked-timeline.svg" alt="" />
                </div>
                <div className="text-base font-semibold mb-6">Operator</div>
                    <div className="lg:flex justify-between border-b border-indigo-100 pb-6 mb-6">
                        <div className="flex align-top">
                            <div className="w-8 h-8 max-w-full rounded-full overflow-hidden mr-3">
                                    <img className="w-full h-full object-cover" src="../images/face-img.png" alt="" />
                            </div>
                            <div>
                                <div className="font-semibold text-sm mb-2">Heather Wright</div>
                                    <div className="sm:flex items-center">
                                        <div className="flex items-center lg:mr-10">
                                            <div className="mr-2">
                                                <img src="../images/phone-icon.svg" alt="" />
                                            </div>
                                            <div className="text-blue-medium text-sm">+1(404) 789 9043</div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="mr-2">
                                                <img src="../images/time-icon.svg" alt="" />
                                            </div>
                                            <div className="text-gray-400 text-sm">18-10-2021 | 10:00:01</div>
                                        </div>
                                    </div>
                                    <div className="break-all text-gray-600 text-sm mt-4">fnsdfjh5o5o33-r-fsdpffr-44mfsdpff44fsfff44fs</div>
                            </div>
                        </div>
                        <div className="mt-6 lg:mt-0">
                            <img src="../images/qrcode.png" alt="" />
                        </div>
                    </div>
                    <div className="lg:grid lg:grid-cols-2 gap-12 text-xs sm:text-sm">
                        <div className="">
                            <div className="flex sm:grid sm:grid-cols-3 sm:gap-4 mb-5">
                                <div className="text-gray-400 flex"><div className="mr-4"> <img src="../images/checkbox-completed.svg" alt="" /></div> Registration No</div>
                                <div className="text-center">:</div>
                                <div className="ml-2 sm:ml-0">23457</div>
                            </div>
                            <div className="flex sm:grid sm:grid-cols-3 sm:gap-4 mb-5">
                                <div className="text-gray-400 flex"><div className="mr-4"> <img src="../images/checkbox-completed.svg" alt="" /></div> Extractor Name</div>
                                <div className="text-center">:</div>
                                <div className="ml-2 sm:ml-0">Midland</div>
                            </div>
                            
                            <div className="flex sm:grid sm:grid-cols-3 sm:gap-4 mb-5">
                                <div className="text-gray-400 flex"><div className="mr-4"> <img src="../images/checkbox-completed.svg" alt="" /></div> Drill Coordinates</div>
                                <div className="text-center">:</div>
                                <div className="ml-2 sm:ml-0">123 Plain Street</div>
                            </div>
                            
                        </div>
                        <div className="">
                           <div className="flex sm:grid sm:grid-cols-3 sm:gap-4 mb-5">
                                <div className="text-gray-400 flex"><div className="mr-4"> <img src="../images/checkbox-completed.svg" alt="" /></div> Exporter Name</div>
                                <div className="text-center">:</div>
                                <div className="ml-2 sm:ml-0">Midland Man</div>
                            </div>

                            <div className="flex sm:grid sm:grid-cols-3 sm:gap-4 mb-5">
                                <div className="text-gray-400 flex"><div className="mr-4"> <img src="../images/checkbox-completed.svg" alt="" /></div> Importer Name</div>
                                <div className="text-center">:</div>
                                <div className="ml-2 sm:ml-0">New Petro</div>
                            </div>

                        </div>
                    </div>
            </div>


            <div className="bg-white rounded-2xl p-10 mb-8 shadow-lg relative font-medium">
                <div className="absolute md:block hidden -left-20">
                    <img src="../images/close-timeline.svg" alt="" />
                </div>
                <div className="text-base font-semibold mb-6">Refinary</div>
                <div className="text-center">
                    <div className="mx-auto w-32 mb-4"><img src="../images/no-information-available.svg" alt="" /></div>
                    <div className=" text-base text-coalblack font-semibold mb-4">No Information Available</div>
                    <div className="text-sm text-gray-500 max-w-xs mx-auto">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
                </div>
                
            </div>
    </div>
</div>
            






        </div>
    )
}
export default BatchDetails