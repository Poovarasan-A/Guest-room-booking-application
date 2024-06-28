import { Fragment } from "react";
import { TailSpin } from "react-loader-spinner";
const Loader = () => {
  return (
    <Fragment>
      {/* Loader used from react-loader-spinner library */}
      <div className="w-full h-[80vh] flex items-center justify-center overflow-hidden">
        <TailSpin
          visible={true}
          height="80"
          width="80"
          color="steelblue"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </Fragment>
  );
};
export default Loader;
