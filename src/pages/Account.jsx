function Account() {
  return (
    <>
      <main className="formPage my-xl">
        <div className="content-box">
          <div className="formWrapper">
            <br />

            <div className="form__field">
              <label>Name: </label>
              <input
                className="input input--text"
                id="formInput#text"
                type="text"
                disabled
                name="text"
                value={localStorage.getItem("Name")}
              />
            </div>

            <div className="form__field">
              <label>Email: </label>
              <input
                className="input input--text"
                id="formInput#text"
                type="text"
                disabled
                name="text"
                value={localStorage.getItem("Email")}
              />
            </div>

            <div className="form__field">
              <label>Password: </label>
              <input
                className="input input--text"
                id="formInput#text"
                type="text"
                disabled
                name="text"
                value={localStorage.getItem("Password")}
              />
            </div>
            <div className="form__field">
              <label>Gender: </label>
              <input
                className="input input--text"
                id="formInput#text"
                type="text"
                disabled
                name="text"
                value={localStorage.getItem("Gender")}
              />
            </div>
            <div className="form__field">
              <label>Age: </label>
              <input
                className="input input--text"
                id="formInput#text"
                type="text"
                disabled
                name="text"
                value={localStorage.getItem("Age")}
              />
            </div>
            <div className="form__field">
              <label>Nationality: </label>
              <input
                className="input input--text"
                id="formInput#text"
                type="text"
                disabled
                name="text"
                value={localStorage.getItem("Nationality")}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Account;
