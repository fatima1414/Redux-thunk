import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createTask, updateTask, viewTask } from "../features/taskSlice";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
const taskListOption = ["coding", "graphics", "ui/ux"];
const TaskForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  /////get id form url(parameter)
  const { id } = useParams();
  const { taskList } = useSelector((state) => state)
 
  // ///////// single task
  const singleTask = taskList.find((task)=>task.id===id) 

  useEffect(() => {
    dispatch(viewTask())
    reset(singleTask)
  },[dispatch,id])

  function Add(data) {
    if(id==null){
      dispatch(createTask(data))
    }else{
      alert('update')
     dispatch(updateTask(data))
    }
    reset();
  }
  return (
    <>
      <form
        action=""
        onSubmit={handleSubmit(Add)}
        className="col-lg-6 mx-auto p-5 shadow"
      >
        <div className="mt-4">
          <select
            className="form-select"
            {...register("task_category")}
            defaultValue=""
          >
            <option value="" disabled>
              --select task category
            </option>
            {taskListOption.map((ele) => (
              <option value={ele}>{ele}</option>
            ))}
          </select>
        </div>
        <div className="mt-4">
          <input
            type="text"
            {...register("task_title")}
            placeholder="add task title"
            className="form-control"
          />
        </div>

        <div className="mt-5">
          <button className="btn btn-dark">Submit</button>
        </div>
      </form>
    </>
  );
};

export default TaskForm;
