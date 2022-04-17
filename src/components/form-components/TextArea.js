const TextArea = (props) => {
  return (
    <div className="mb-3">
      <label htmlFor={props.name} className="form-label">
        {props.title}
      </label>
      <br />
      <textarea
        type={props.type}
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
        rows={props.rows}
        className="form-control"
      />
    </div>
  );
};

export default TextArea;
