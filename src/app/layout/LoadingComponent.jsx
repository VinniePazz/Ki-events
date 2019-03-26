import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

const LoadingComponent = ({ inverted, pastDelay, error, retry}) => {
  return (
    <>
      {pastDelay && !error && (
        <Dimmer inverted={inverted} active={true}>
          <Loader content="Loading..." />
        </Dimmer>
      )}
			{error && <div>Error! <button onClick={ retry }>Retry</button></div>}
    </>
  );
};

export default LoadingComponent;
