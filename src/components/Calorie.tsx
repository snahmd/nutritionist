import { useEffect, useRef, useState } from "react";

const Calorie = () => {
  const [bmr, setBmr] = useState(0);
  const [tdee, setTdee] = useState(0);
  const activityRef = useRef<HTMLSelectElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const bodySize = form.bodySize.value;
    const age = form.age.value;
    const weight = form.weight.value;
    const activity = form.activity.value;
    const gender = form.gender.value;
    console.log(bodySize, age, weight, activity, gender);

    if (gender === "Male") {
      setBmr(66.47 + 13.7 * weight + 5 * bodySize - 6.8 * age);
    } else {
      setBmr(655.1 + 9.6 * weight + 1.8 * bodySize - 4.7 * age);
    }
  };
  useEffect(() => {
    console.log("...");
    if (activityRef.current) {
      const activity: number = parseFloat(activityRef.current.value);
      console.log(activity);
      setTdee(Math.round(bmr * activity));
    }
  }, [bmr]);

  return (
    <div className="flex flex-col justify-center items-center gap-4 p-4 w-96 md:w-4/5 mx-auto border ">
      <h2 className="">Test your daily Calorie Requirement</h2>
      <p className="text-center">
        To determine your daily calorie requirement, we need some information
        about your age, gender, weight, height and activity level. Enter this
        information to calculate your individual requirements.
      </p>
      <form
        action=""
        className="flex flex-col justify-center items-center gap-4 text-gray-400"
        onSubmit={handleSubmit}
      >
        <label htmlFor="bodySize">Body Size (in cm)</label>
        <input type="number" name="bodySize" id="bodySize" required />
        <label htmlFor="age">Age</label>
        <input type="number" name="age" id="age" required />
        <label htmlFor="weight">Weight</label>
        <input type="number" name="weight" id="weight" required />
        <label htmlFor="activity">Activity</label>
        <select ref={activityRef} name="activity" id="activity" required>
          <option value="0.95">Sleep</option>
          <option value="1.2">Sedentary</option>
          <option value="1.5">Light Activity</option>
          <option value="1.7">Moderate Activity</option>
          <option value="1.9">Very Active</option>
          <option value="2.2">Extra Active</option>
        </select>

        <div className="flex flex-col text-center gap-2">
          <p className="">Gender:</p>
          <div className="flex gap-2">
            <input
              type="radio"
              id="gender1"
              name="gender"
              value="Female"
              required
            />
            <label htmlFor="gender1">Female</label>
            <input
              type="radio"
              id="gender2"
              name="gender"
              value="Male"
              required
            />
            <label htmlFor="gender2">Male</label>
          </div>
        </div>
        <button className="border p-2">Calculate</button>
      </form>
      <div className="border">
        <table className="border">
          <tr className="border">
            <th className="border p-2"></th>
            <th className="border p-2">kcal</th>
            <th className="border p-2">kj</th>
          </tr>
          <tr className="border">
            <td className="border p-2">Basal Metabolic Rate (BMR)</td>
            <td className="border p-2">{Math.round(bmr)}</td>
            <td className="border p-2">{Math.round(bmr * 4.18)}</td>
          </tr>
          <tr className="border">
            <td className="border p-2">Total Daily Energy Expenditure</td>
            <td className="border p-2">{tdee}</td>
            <td className="border p-2">{Math.round(tdee * 4.18)}</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Calorie;
