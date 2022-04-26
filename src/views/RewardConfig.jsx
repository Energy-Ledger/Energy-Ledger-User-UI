import React from 'react';


const Reward_confi = () => {
    return (
        <div className="flex justify-center items-center h-full">
        <div className="relative lg:w-1/2 mx-auto max-w-full ">
            {/*content*/}
            <div className="border-0 rounded-xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
               
                {/*body*/}
                <div className="relative lg:px-8 lg:py-12 p-4 flex-auto">
                <h3 className="text-2xl text-coalblack font-semibold leading-normal mb-4">
                Reward Configuration
                    </h3>
                    <form>
                        <div className="mb-4">
                            <label htmlFor="" className="text-sm font-medium text-coalblack block mb-2">Set Reward Percentage<span className="text-dark-red">*</span></label>
                            <input type="" id="" className="border text-coalblack sm:text-sm rounded-lg focus:shadow-sm block w-full p-3" placeholder="Reward Percentage" required="" />
                        </div>
                        
                        <button type="button" className="text-sm w-full mt-10 px-4 py-3 bg-blue-600 rounded-md text-white outline-none shadow-lg flex">
                            <span className="text-center mx-auto text-sm font-semibold">Confirm</span>
                        </button>
                    </form>
                </div>
            </div>
            </div>
        </div>
   

    )
}
export default Reward_confi