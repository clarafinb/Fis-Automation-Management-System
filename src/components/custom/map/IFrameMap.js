import ReactDOM from 'react-dom'
import React, { useEffect, useRef } from 'react';
import MapComponent from './MapLeaflef';

const IFrameComponent = () => {
  const iframeRef = useRef();

  useEffect(() => {
    const iframe = iframeRef.current;
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

    const mountNode = iframeDocument.createElement('div');

    iframeDocument.body.appendChild(mountNode);

    ReactDOM.render(<MapComponent />, mountNode);

    return () => {
      ReactDOM.unmountComponentAtNode(mountNode);
      iframeDocument.body.removeChild(mountNode);
    };
  }, []);

  return (
    <div>
      <h1>IFrame Component</h1>
      <iframe
        title="IFrame"
        ref={iframeRef}
        style={{ width: '100%', height: '400px', border: 'none' }}
      />
    </div>
  );
};

export default IFrameComponent;

