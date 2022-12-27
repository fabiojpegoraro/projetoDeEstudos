import './style.css';

const InputForm = ({ labelText, inputValue, setAction }) => {
  return (
    <div className="componentForm">
      <label>{labelText}</label>
      <input
        type="text"
        className="inputForm"
        value={inputValue}
        onChange={setAction}
      />
    </div>
  );
};

export default InputForm;
