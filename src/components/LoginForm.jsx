const LoginForm = ({
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <h3>Login to form</h3>
      <div>
        username:
        <input value={username} onChange={handleUsernameChange} />
      </div>
      <div>
        password:
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
