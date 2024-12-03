import React, { useEffect, useRef, useState } from "react";

import "react-clock/dist/Clock.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLoaderData, useParams } from "react-router-dom";
import Swal from "sweetalert2";
const formatTime12Hour = (date) => {
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  return `${hours}:${minutes}:${seconds} ${ampm}`;
};

const UpdateSchedule = () => {
  const data = useLoaderData();
  const { day, title, formattedDate, formatHour } = data;
  const { id } = useParams();
  const [date, setDate] = useState(data?.formattedDate);

  const handleUpdateSchedule = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.Title.value;
    const day = form.day.value;
    const fDate = date.toLocaleDateString("en-CA");
    const updatedData = {
      title,
      day,
      fDate,
      hour: formatHour,
    };
    console.log(updatedData);
    fetch(`https://gym-server-chi.vercel.app/schedule/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          Swal.fire("schedule modified");
        }
      });
  };
  return (
    <div>
      <div className="bg-[#F4F3F0] lg:p-24">
        <h2 className="text-3xl text-center font-bold">Update Gym Schedule</h2>
        <form onSubmit={handleUpdateSchedule}>
          <div className="flex gap-6 ">
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text font-bold">Title</span>
              </label>
              <input
                type="text"
                name="Title"
                className="input input-bordered"
                defaultValue={title}
                required
              />
            </div>
            <div className="form-control lg:w-1/2 mt-6 md:mt-0">
              <label className="label font-bold">
                <span className="label-text">Date</span>
              </label>
              <DatePicker
                value={date}
                selected={date}
                className="input input-bordered w-full"
                onChange={(date) => setDate(date)}
              />
            </div>
          </div>
          <div className="flex gap-6 ">
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text font-bold">Day</span>
              </label>

              <select
                className="input input-bordered "
                name="day"
                id="day"
                defaultValue={day}
              >
                <option value="sunday">Sunday</option>
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
              </select>
            </div>
            <div className="form-control lg:w-1/2 mt-6 md:mt-0">
              <label className="label font-bold">
                <span className="label-text">Time</span>
              </label>

              <DatePicker
                className="input input-bordered w-full"
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                value={formatHour}
                // onChange={(newHour) => setHour(newHour)}
              />
            </div>
          </div>

          {/* End of Labels */}
          <input
            type="submit"
            value="Update Schedule"
            className="btn w-full bg-pink-500 text-white mt-6"
          />
        </form>
      </div>
    </div>
  );
};

export default UpdateSchedule;
