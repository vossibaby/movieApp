export const Button = ({
  children = "Back to Home",
  className = "",
  ...props
}) => (
  <button
    type="button"
    className={`text-white bg-dark-100 box-border border border-transparent hover:bg-[#010a83]  focus:ring-2 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-xl text-sm px-4 py-2.5 focus:outline-none ${className}`}
    {...props}
  >
    {children}
  </button>
);
