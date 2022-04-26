import React from "react";
import { clearMessage } from "../../actions/message";
import { useDispatch } from "react-redux";
import configService from "../../services/config.service";

const ProcessingBox = (props) => {
  let blockchainExplorerUrl = configService.blockchainExpEndpointUrl();
  const dispatch = useDispatch();

  let _type = props.type;
    let _message = props.message;
    let _data = props.data;
    let _hint = props.hint || "";
    let _showOkButton = props.showOkButton ? props.showOkButton : false;
    let _ethChainId = configService.ethChainId();
    if(window.ethereum.networkVersion == _ethChainId)
    {
      blockchainExplorerUrl = configService.getEthBlockchainExplorerEndpoint();
    }

    let _processBoxData = [
      "",
      <a
        target="_blank"
        className="text-blue-medium"
        href={`${blockchainExplorerUrl}tx/${_data}`}
        // href={`tx/${_data}`}
        rel="noreferrer"
        key="1"
      >
        {" "}
        Click here to see transaction{" "}
      </a>,
    ];

    const renderProcessBox = () => {
        switch (_type) {
          case "success":
            return <SuccessBox key={0} message={_message} data={_processBoxData} hint={_hint} />;
          case "pending":
            return <PendingBox key={1} message={_message} data={_processBoxData} />;
          case "failure":
            return <FailureBox key={2} message={_message} data={_processBoxData} />;
          default:
            return <FailureBox key={0} message={_message} data={_processBoxData} />;
            
        }
    }


    const closeDialog = () => {
      document.getElementById("myDialog").style.display='none';
      dispatch(clearMessage())
    }

    return (
      <div
        className="fixed z-10 inset-0 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
        id="myDialog"
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
          ></div>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="popContent pb-8 pt-4 text-center">
                {renderProcessBox()}
              </div>
              <div className="w-full text-center">
                {_showOkButton && (<button
                  onClick={closeDialog}
                  type="button"
                  className="mt-3 inline-flex justify-center rounded-md border mx-auto border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-auto sm:text-sm"
                >
                  Ok
                </button>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

const SuccessBox = (props) => {
  return (
    <div key="0" className="block styleAnchor">
      <div>
        <svg
          viewBox="0 0 26 26"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto im-size mb-4"
        >
          <g
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            fillRule="evenodd"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              className="circleSuccess"
              d="M13 1C6.372583 1 1 6.372583 1 13s5.372583 12 12 12 12-5.372583 12-12S19.627417 1 13 1z"
            />
            <path className="tick" d="M6.5 13.5L10 17 l8.808621-8.308621" />
          </g>
        </svg>
        <h2 className="text-2xl font-semibold text-green mb-2">
          {props.message || "Success"}
        </h2>
        <p className="mb-2">{props.hint || ""}</p>
        <p>{props.data || ""}</p>

        {/* <p dangerouslySetInnerHTML={props.data || ""}></p> */}
      </div>
    </div>
  );
};

const PendingBox = (props) => {
  return (
    <div key="1" className="block styleAnchor">
      <div className="clock">
        <div className="minutes"></div>
        <div className="hours"></div>
      </div>
      <h2 className="text-2xl font-semibold text-yellow-500 mb-2">
        {props.message || "Pending"}
      </h2>
      {/* <p dangerouslySetInnerHTML={props.data || ""}></p> */}
      <p>{props.data || ""}</p>
    </div>
  );
};

const FailureBox = (props) => {
  return (
    <div key="2"  className="block styleAnchor">
      <div>
        <svg
          className="cross__svg im-size"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
        >
          <circle
            className="cross__circle"
            cx="26"
            cy="26"
            r="25"
            fill="none"
          />
          <path
            className="cross__path cross__path--right"
            fill="none"
            d="M16,16 l20,20"
          />
          <path
            className="cross__path cross__path--right"
            fill="none"
            d="M16,36 l20,-20"
          />
        </svg>

        <h2 className="text-2xl font-semibold text-red-500 mb-2">
          {props.message || "Failed"}
        </h2>
        {/* <p dangerouslySetInnerHTML={ props.data || ""}></p> */}
        <p>{props.data || ""}</p>
      </div>
    </div>
  );
};

export default ProcessingBox;

