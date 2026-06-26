function Spinner({ type = "primary" }) {
  const size =
    type === "primary" ? "h-14 w-14 border-[5px]" : "h-6 w-6 border-[3px]";

  const container =
    type === "primary"
      ? "flex min-h-screen items-center justify-center"
      : "flex items-center justify-center";

  return (
    <div className={container}>
      <div
        className={`${size} animate-spin rounded-full border-orange-500 border-t-transparent`}
      />
    </div>
  );
}

export default Spinner;
