import React from "react";

export default ({ person }) => (
  <div class="card">
    <div class="card-body">
      <p class="card-title">
        Выбран пользователь <b>{person.firstName + " " + person.lastName}</b>
      </p>
      <p class="card-text">
        Описание: <br />
        <textarea defaultValue={person.description} />
      </p>

      <p class="card-text">
        Адрес проживания: <b>{person.address.streetAddress}</b>
      </p>
      <p class="card-text">
        Город: <b>{person.address.city}</b>
      </p>
      <p class="card-text">
        Провинция/штат: <b>{person.address.state}</b>
      </p>
      <p class="card-text">
        Индекс: <b>{person.address.zip}</b>
      </p>
    </div>
  </div>
);
