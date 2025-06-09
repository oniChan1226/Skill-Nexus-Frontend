type FieldMap<T> = {
  [key: string]: keyof T;
};

function handleServerErrorsGeneric<T>(
  error: any,
  setError: (name: keyof T, error: { type: string; message: string }) => void,
  toastError: (msg: string) => void,
  fieldMap: FieldMap<T>
) {
  const message = error?.data?.message || "Something went wrong";

  for (const keyword in fieldMap) {
    if (message.toLowerCase().includes(keyword.toLowerCase())) {
      setError(fieldMap[keyword], {
        type: "server",
        message,
      });
      return;
    }
  }

  toastError(message);
}

export { handleServerErrorsGeneric };
