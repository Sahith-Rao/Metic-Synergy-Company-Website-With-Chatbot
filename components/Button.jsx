const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`${className} glow-effect rounded-md px-4 py-2 transition-all duration-300`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 