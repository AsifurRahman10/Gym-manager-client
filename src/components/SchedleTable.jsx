import React, { useState } from "react";
import { FaFile, FaTrash } from "react-icons/fa";
import { MdDone, MdOutlineDoneAll } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ScheduleTable = ({
  schedule,
  idx,
  handleDelete,
  scheduleData,
  setSchedules,
}) => {
  const { _id, day, title, formattedDate, formatHour, isCompleted } = schedule;
  const handleCompleteTask = (_id) => {
    fetch(`https://gym-server-chi.vercel.app/completed/${_id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.matchedCount > 0) {
          const newData = scheduleData.map((schedule) =>
            schedule._id === _id ? { ...schedule, isCompleted: true } : schedule
          );
          setSchedules(newData);
          Swal.fire("Task completed");
        }
      });
  };
  return (
    <>
      <tr>
        <td>{idx + 1}</td>
        <td>{title}</td>
        <td>{day}</td>
        <td>{formattedDate}</td>
        <td>{formatHour}</td>
        <td>
          <div className="flex gap-4">
            {" "}
            <button
              onClick={() => handleDelete(_id)}
              className="bg-pink-500 px-4 py-2 rounded text-white"
            >
              <FaTrash className=""></FaTrash>
            </button>
            <button className="bg-pink-500 px-4 py-2 rounded text-white">
              <Link to={`/update/${_id}`}>
                {" "}
                <FaFile />
              </Link>
            </button>
            <button
              className="bg-pink-500 px-4 py-2 rounded text-white"
              onClick={() => handleCompleteTask(_id)}
            >
              {isCompleted ? <MdOutlineDoneAll /> : <MdDone />}
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default ScheduleTable;
