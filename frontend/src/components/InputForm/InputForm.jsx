import './style.css';

const InputForm = ({ labelText, inputValue, dataTestId, setAction }) => {
  return (
    <div className="componentForm">
      <label>{labelText}</label>
      <input
        type="text"
        className="inputForm"
        value={inputValue}
        data-testid={dataTestId}
        onChange={setAction}
      />
    </div>
  );
};

export default InputForm;
