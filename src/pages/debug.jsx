import React, { useState } from 'react'; // useEffect, useRef
import '@style/debug.less';

function Debug() {
  const [cls, setCls] = useState('');
  const handle = () => {
    setCls(cls ? '' : 'active');
  };
  return (
    <div className="p-debug">
      <div className={`${cls} animation`}></div>
      <button onClick={handle}>debug</button>
    </div>
  );
}

export default Debug;
