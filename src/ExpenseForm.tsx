import { useForm } from "react-hook-form";
import { categories } from "./App";

interface FormFields {
  id: number;
  description: string;
  amount: number;
  category: string;
}

interface Props {
  onSubmit: (data: FormFields) => void;
}

const ExpenseForm = ({ onSubmit }: Props) => {
  // const form = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  return (
    <>
      <div className="mb-3 mt-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="description" className="form-lable">
              Description
            </label>
            <input
              {...register("description", {
                required: "Description is required",
                min: { value: 3, message: "Minimum is 3 character long" },
              })}
              id="description"
              type="text"
              className="form-control"
            />
            {errors.description?.message && (
              <p className="text-danger">{errors.description?.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="amount" className="form-label">
              Amount $
            </label>
            <input
              {...register("amount", { valueAsNumber: true })}
              id="amount"
              type="number"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <select
              {...register("category")}
              id="category"
              className="form-select"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <button className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ExpenseForm;
