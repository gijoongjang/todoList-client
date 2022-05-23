import React, { useState } from "react";

function Form(props) {
  const [title, setTitle] = useState('');


  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) {
      return;
    }
    props.addTodo(title);
    setTitle("");
  }


  function handleChange(e) {
    setTitle(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
        해야 할 일을 추가하세요.
        </label>
      </h2>

      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={title}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        추가
      </button>
    </form>
  );
}

export default Form;