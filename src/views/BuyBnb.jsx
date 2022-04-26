import React from 'react';


const Buy_bnb = () => {
    return (
        
       <div className="flex justify-center items-center h-full">
        <div className="relative lg:w-1/2 mx-auto max-w-full ">
            {/*content*/}
            <div className="border-0 rounded-xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
               
                {/*body*/}
                <div className="relative lg:px-8 lg:py-12 p-4 flex-auto">
                 {/*show in progress box start*/}
                 <div key="1" className="block styleAnchor">
                    <div className="clock">
                        <div className="minutes"></div>
                        <div className="hours"></div>
                    </div>
                    <div >
                    <h2 className="text-2xl font-semibold text-yellow-500 mb-2">
                        { "Buy BNB functionality is in progress"}
                    </h2>                   
                    </div>
                </div>
                {/*show in progress box end*/}
                
                {/* <h3 className="text-2xl text-coalblack font-semibold leading-normal mb-4">
                Buy BNB
                    </h3>
                    <form>
                        <div className="mb-4">
                            <label htmlFor="" className="text-sm font-medium text-coalblack block mb-2">BNB Amount</label>
                            <input type="" id="" className="border text-coalblack sm:text-sm rounded-lg focus:shadow-sm block w-full p-3" placeholder="BNB Amount" required="" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="" className="text-sm font-medium text-coalblack block mb-2">Select Fiat Currency</label>
                            <select className="border text-coalblack sm:text-sm rounded-lg focus:shadow-sm block w-full p-3" x-cloak id="select">
                                <option value="1">Option 2</option>
                                <option value="2">Option 3</option>
                                <option value="3">Option 4</option>
                                <option value="4">Option 5</option>
                            </select>
                        </div>
                        <button type="button" className="text-sm w-full mt-10 px-4 py-3 bg-blue-600 rounded-md text-white outline-none shadow-lg flex">
                            <span className="text-center mx-auto text-sm font-semibold">Confirm</span>
                        </button>
                    </form> */}
                </div>
                </div>
            </div>
        </div>
   

    )
}
export default Buy_bnb