const Input = (props) => {
  return (
    <div className="mb-3">
      <label htmlFor={props.name} className="form-label">
        {props.title}
      </label>
      <br />
      <input
        type={props.type}
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
        placehoolder={props.placeholder}
        className={`form-control ${props.className}`}
        autoComplete="off"
      />

      <div className={props.errorDiv}>{props.errorMsg} </div>
    </div>
  );
};

export default Input;
