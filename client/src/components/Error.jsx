function Error({ msg }) {
  return (
    <main className="main">
      <div className="error">
        <div className="error__title">
          <h2 className="heading-secondary heading-secondary--error">
            Uh oh! Something went wrong!
          </h2>

          <h2 className="error__emoji">😢 🤯</h2>
        </div>

        <p className="error__msg">{msg}</p>
      </div>
    </main>
  );
}

export default Error;
