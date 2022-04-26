import React from "react";
// add new batch popup starts
export default function Modal() {
    const [showModal, setShowModal] = React.useState(false);
    return (
        <>
            <button type="button" className="mb-3 px-4 py-3 bg-blue-600 rounded-md text-white outline-none shadow-lg transform transition-transform mx-3 flex" onClick={() => setShowModal(true)}>
                <img src="./images/plus.svg" alt="" />
                <span className="ml-2 text-xs font-semibold">Create Batch</span>
            </button>

            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative lg:w-1/3 my-6 mx-auto max-w-full">
                            {/*content*/}
                            <div className="popup scrollbar border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 rounded-t">
                                    <h3 className="text-xl text-coalblack font-semibold leading-normal">
                                        Add New Batch
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-slate-gray float-right text-3xl leading-none font-normal outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="relative -top-1 bg-transparent text-slate-gray opacity-6 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>

                                </div>
                                {/*body*/}
                                <div className="relative px-6 pb-6 pt-0 flex-auto">
                                    <form>
                                        <div className="mb-4">
                                            <label htmlFor="" className="text-sm font-medium text-coalblack block mb-2">Extractor Registration No<span className="text-dark-red">*</span></label>
                                            <input type="" id="" className="border text-coalblack sm:text-sm rounded-lg focus:shadow-sm block w-full p-3" placeholder="Registration No" required="" />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="" className="text-sm font-medium text-coalblack block mb-2">Extractor Name<span classNameName="text-dark-red">*</span></label>
                                            <input type="" id="" className="border text-coalblack sm:text-sm rounded-lg focus:shadow-sm block w-full p-3" placeholder="Farmer Name" required="" />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="" className="text-sm font-medium text-coalblack block mb-2">Extractor Address<span className="text-dark-red">*</span></label>
                                            <input type="" id="" className="border text-coalblack sm:text-sm rounded-lg focus:shadow-sm block w-full p-3" placeholder="Farmer Address" required="" />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="" className="text-sm font-medium text-coalblack block mb-2">Assign Batch To<span className="text-dark-red">*</span></label>
                                            <input type="" id="" className="border text-coalblack sm:text-sm rounded-lg focus:shadow-sm block w-full p-3" placeholder="Registration No" required="" />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="" className="text-sm font-medium text-coalblack block mb-2">Exporter Name<span className="text-dark-red">*</span></label>
                                            <input type="" id="" className="border text-coalblack sm:text-sm rounded-lg focus:shadow-sm block w-full p-3" placeholder="Farmer Address" required="" />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="" className="text-sm font-medium text-coalblack block mb-2">Importer Name<span className="text-dark-red">*</span></label>
                                            <input type="" id="" className="border text-coalblack sm:text-sm rounded-lg focus:shadow-sm block w-full p-3" placeholder="Farmer Address" required="" />
                                        </div>

                                        <div className="mb-4">
                                        <label htmlFor="" className="text-sm font-medium text-coalblack block mb-2">Upload File</label>
                                        <div className="rounded-lg border flex items-center justify-center py-10 text-center">
                                           
                                            <img className="mr-2" src="./images/img.svg" alt="" />
                                            <p className="m-0 text-slate-gray">Upload File</p>
                                          
                                        </div>
                                        </div>
                                        <button type="button" className="w-full mb-3 px-4 py-3 bg-blue-600 rounded-md text-white outline-none shadow-lg flex" onClick={() => setShowModal(false)}>
                                            <span className="text-center mx-auto text-xs font-semibold">Add Batch</span>
                                        </button>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}

// add new batch popup ends