import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

const EditableCell = ({ getValue, row, column, table, isDescription }) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  // When the input is blurred, we'll call our table meta's updateData function
  const onBlur = () => {
    table.options.meta?.updateData(row, column.id, value);
  };

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <>
      {isDescription ? (
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
          className="appearance-none bg-transparent border-none outline-none focus:outline-none px-0 py-1"
        />
      ) : (
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
          className="appearance-none bg-transparent border-none outline-none focus:outline-none px-0 py-1"
        />
      )}
    </>
  );
};
export default EditableCell;
