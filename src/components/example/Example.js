import React, { useState } from 'react';

export function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  const sample = () => {
      return (<div>Sample</div>)
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      {sample}
    </div>
  );
}

//export default Example;