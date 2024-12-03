import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import ScheduleTable from "../../components/SchedleTable";
import Swal from "sweetalert2";

const Schedule = () => {
  const scheduleData = useLoaderData();
  const [schedules, setSchedules] = useState(scheduleData);
  const handleDelete = (_id) => {
    console.log(_id);
    fetch(`https://gym-server-chi.vercel.app/schedule/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          Swal.fire("The schedule has been deleted");
          const deletedData = schedules.filter(
            (schedule) => schedule._id !== _id
          );
          setSchedules(deletedData);
        }
      });
  };
  return (
    <>
      <div className="w-[400px] mx-auto mb-4">
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          name="search"
          placeholder="search"
          className="input input-bordered w-full"
          required
        />
      </div>
      <div className="w-1/2 mx-auto bg-slate-50">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>serial</th>
                <th>Title</th>
                <th>Day</th>
                <th>Date</th>
                <th>Time</th>
                <th>Auction</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((schedule, index) => (
                <ScheduleTable
                  setSchedules={setSchedules}
                  scheduleData={scheduleData}
                  key={schedule._id}
                  schedule={schedule}
                  idx={index}
                  handleDelete={handleDelete}
                ></ScheduleTable>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Schedule;
