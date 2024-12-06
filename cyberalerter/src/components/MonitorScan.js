import React, { useState } from 'react';

const MonitorScanComponent = () => {
  const [inputCount, setInputCount] = useState(0);

  const handleInputCountChange = (e) => {
    setInputCount(parseInt(e.target.value));
  };

  const renderInputs = () => {
    const inputs = [];
    for (let i = 1; i <= inputCount; i++) {
      inputs.push(
        <div key={i}>
          <label className="block text-sm font-semibold mb-2">Input {i}</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            placeholder={`Enter Input ${i}`}
          />
        </div>
      );
    }
    return inputs;
  };

  return (
    <div className="mt-4">
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Select Number of Inputs</label>
          <select 
            onChange={handleInputCountChange} 
            className="w-full p-2 border rounded-md"
          >
            <option value="0">Select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        {renderInputs()}
      </form>
    </div>
  );
};

export default MonitorScanComponent;
