"use client";
import React, { useState, useEffect } from "react";
import { ChevronDown, Edit, Trash2, Calendar } from "lucide-react";
import DashboardLayout from "@/app/layout/DashboardLayout";

// Define the Task type
interface Task {
  id: number;
  name: string;
  staff: string;
  startTime: string;
  endTime?: string;
  duration: string;
  description: string;
  status: "Completed" | "Cooking" | "Pending";
  shift?: string;
}

// For preview tasks (no id/status/shift needed)
interface PreviewTask {
  name: string;
  staff: string;
  startTime: string;
  duration: string;
  description: string;
}

const KitchenStaffManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"assign" | "roster">("assign");
  const [selectedTask, setSelectedTask] = useState<string>("");
  const [selectedStaff, setSelectedStaff] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("2024-08-30");

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      name: "Breakfast Prep",
      staff: "Chef Stan",
      startTime: "06:00 AM",
      endTime: "08:00 AM",
      duration: "2 hours",
      description: "Prepare Omelette",
      status: "Completed",
      shift: "Shift 1: Breakfast",
    },
    {
      id: 2,
      name: "Lunch Prep",
      staff: "Assistant Joy",
      startTime: "11:00 AM",
      endTime: "01:00 PM",
      duration: "2 hours",
      description: "Prepare Omelette",
      status: "Cooking",
      shift: "Shift 2: Lunch",
    },
    {
      id: 3,
      name: "Dinner Prep",
      staff: "Chef Gloria",
      startTime: "05:00 PM",
      endTime: "07:00 PM",
      duration: "2 hours",
      description: "Prepare Dinner Menu",
      status: "Pending",
      shift: "Shift 3: Dinner",
    },
  ]);

  const taskOptions = [
    "Breakfast Prep",
    "Lunch Prep",
    "Dinner Prep",
    "Dessert Prep",
    "Inventory Check",
  ];
  const staffOptions = [
    "Chef Stan",
    "Chef Gloria",
    "Assistant Joy",
    "Assistant Mike",
    "Sous Chef Anna",
  ];
  const timeOptions = [
    "06:00 AM",
    "07:00 AM",
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
  ];

  const [previewTask, setPreviewTask] = useState<PreviewTask | null>(null);

  const handleAddTask = () => {
    if (selectedTask && selectedStaff && startTime && duration && description) {
      const newTask: Task = {
        id: tasks.length + 1,
        name: selectedTask,
        staff: selectedStaff,
        startTime,
        duration,
        description,
        status: "Pending",
      };
      setTasks([...tasks, newTask]);

      // Clear form
      setSelectedTask("");
      setSelectedStaff("");
      setStartTime("");
      setDuration("");
      setDescription("");
      setPreviewTask(null);
    }
  };

  // Update preview when form changes
  useEffect(() => {
    if (selectedTask && selectedStaff && startTime && duration) {
      setPreviewTask({
        name: selectedTask,
        staff: selectedStaff,
        startTime,
        duration,
        description: description || "No description provided",
      });
    } else {
      setPreviewTask(null);
    }
  }, [selectedTask, selectedStaff, startTime, duration, description]);

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;
  const pendingTasks = tasks.filter((task) => task.status === "Pending").length;

  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "Completed":
        return "text-green-600 bg-green-50 px-2 py-1 rounded";
      case "Cooking":
        return "text-orange-600 bg-orange-50 px-2 py-1 rounded";
      case "Pending":
        return "text-blue-600 bg-blue-50 px-2 py-1 rounded";
      default:
        return "text-gray-600";
    }
  };

  const handleTabChange = (tab: string) => {
    console.log(`Switched to: ${tab}`);
  };
  return (
    <DashboardLayout activeTab="Dashboard" onTabChange={handleTabChange}>
      <div className="min-h-screen bg-gray-50 p-2">
        <div className="max-w-6xl">
          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab("assign")}
                  className={`py-3 px-1 border-b-2 font-medium text-[16px] ${
                    activeTab === "assign"
                      ? "border-[#008080] text-[#008080]"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Assign Tasks
                </button>
                <button
                  onClick={() => setActiveTab("roster")}
                  className={`py-3 px-1 border-b-2 font-medium text-[16px] ${
                    activeTab === "roster"
                      ? "border-[#008080] text-[#008080]"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Work Roster
                </button>
              </nav>
            </div>
          </div>

          {/* Assign Tasks Tab */}
          {activeTab === "assign" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Task Assignment Form */}
              <div className="bg-white rounded-[30px] shadow-sm p-6">
                <h2 className="text-[#333333] font-semibold text-[18px] border-b-[1px] py-3 border-b-[#EAE8E8] mb-6">
                  Assign Tasks to Kitchen Staff
                </h2>

                <div className="space-y-6">
                  {/* Select Task */}
                  <div>
                    <label className="block text-[#474747] text-[14px] font-medium mb-2">
                      Select Task
                    </label>
                    <div className="relative">
                      <select
                        value={selectedTask}
                        onChange={(e) => setSelectedTask(e.target.value)}
                        className="w-full px-3 py-2 border-[1px] text-[#333333] border-[#D0D5DD] rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none"
                      >
                        <option value="">Choose a task...</option>
                        {taskOptions.map((task) => (
                          <option key={task} value={task}>
                            {task}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Assigned Staff */}
                  <div>
                    <label className="block text-[#474747] text-[14px] font-medium mb-2">
                      Assigned Staff
                    </label>
                    <div className="relative">
                      <select
                        value={selectedStaff}
                        onChange={(e) => setSelectedStaff(e.target.value)}
                        className="w-full px-3 py-2 border-[1px] text-[#333333] border-[#D0D5DD] rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none"
                      >
                        <option value="">Choose staff member...</option>
                        {staffOptions.map((staff) => (
                          <option key={staff} value={staff}>
                            {staff}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Start Time */}
                  <div>
                    <label className="block text-[#474747] text-[14px] font-medium mb-2">
                      Start Time
                    </label>
                    <div className="relative">
                      <select
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full px-3 py-2 border-[1px] text-[#333333] border-[#D0D5DD] rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none"
                      >
                        <option value="">Select start time...</option>
                        {timeOptions.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block text-[#474747] text-[14px] font-medium mb-2">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="e.g., 2 hours"
                      className="w-full px-3 py-2 border-[1px] text-[#333333] border-[#D0D5DD] rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>

                  {/* Task Description */}
                  <div>
                    <label className="block text-[#474747] text-[14px] font-medium mb-2">
                      Task Description
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      placeholder="Enter task description..."
                      className="w-full px-3 py-2 border-[1px] text-[#333333] border-[#D0D5DD] rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between mt-8">
                  <button className="px-6 py-2 text-gray-600 hover:text-gray-800">
                    Cancel
                  </button>
                  <button
                    onClick={handleAddTask}
                    className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                  >
                    Add Task
                  </button>
                </div>
              </div>

              {/* Task Preview */}
              <div className="bg-white rounded-[20px] max-w-md max-h-100 overflow-y-auto border scrollbar-hide border-[#D0D5DD] p-6">
                <h3 className="text-[16px] mb-4 text-[#333333]">
                  Assigned Task Preview
                </h3>

                {previewTask ? (
                  <div className="space-y-6">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Task Name:</span>
                      <span className="font-medium text-[#333333]">
                        {previewTask.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">
                        Assigned Staff:
                      </span>
                      <span className="font-medium text-[#333333]">
                        {previewTask.staff}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Start Time:</span>
                      <span className="font-medium text-[#333333]">
                        {previewTask.startTime}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Duration:</span>
                      <span className="font-medium text-[#333333]">
                        {previewTask.duration}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">
                        Description:
                      </span>
                      <span className="font-medium text-[#333333]">
                        {previewTask.description}
                      </span>
                    </div>

                    <div className="flex justify-between mt-6">
                      <button className="flex items-center px-4 py-2 rounded-[#DDDDDD]  text-gray-500 hover:text-gray-700">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </button>
                      <button className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>Fill out the form to preview your task assignment</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Work Roster Tab */}
          {activeTab === "roster" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Roster */}
              <div className="lg:col-span-2 bg-white rounded-[30px] shadow-sm p-6">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Staff Work Roster
                    </h2>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="px-3 py-1 border border-gray-300 text-[#333333] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>
                  <div className="border-[#333333] w-full"></div>
                </div>

                <div className="mb-4 mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    Daily Roster
                  </h3>
                </div>

                <div className="space-y-4">
                  {tasks.map((task, index) => (
                    <div
                      key={task.id}
                      className="bg-[#F2F2F2] max-w-lg rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-medium text-gray-900">
                          {task.shift || `Task ${index + 1}`}
                        </h4>
                      </div>
                      <div className="w-full h-[1px] mb-3 bg-[#EAE8E8]"></div>

                      <div className="grid grid-cols-1 gap-6 text-sm">
                        <div className="mt-2 flex flex-row gap-4 items-center">
                          <span className="text-[#333333] font-regular text-[14px]">
                            Chef Name:
                          </span>
                          <span className="ml-2 text-[16px] font-semibold text-[#333333]">
                            {task.staff}
                          </span>
                        </div>

                        <div className="mt-2 flex flex-row gap-4 items-center">
                          <span className="text-[#333333] font-regular text-[14px]">
                            Start Time:
                          </span>
                          <span className="ml-2 text-[16px] font-semibold text-[#333333]">
                            {task.startTime}
                          </span>
                        </div>

                        <div className="mt-2 flex flex-row gap-4 items-center">
                          <span className="text-[#333333] font-regular text-[14px]">
                            End Time:
                          </span>
                          <span className="ml-2 text-[16px] font-semibold text-[#333333]">
                            {task.endTime || "TBD"}
                          </span>
                        </div>

                        <div className="mt-2 flex flex-row gap-4 items-center">
                          <span className="text-[#333333] font-regular text-[14px]">
                            Duration:
                          </span>
                          <span className="ml-2 text-[16px] font-semibold text-[#333333]">
                            {task.duration}
                          </span>
                        </div>

                        <div className="mt-2 flex flex-row gap-4 items-center">
                          <span className="text-[#333333] font-regular text-[14px]">
                            Description:
                          </span>
                          <span className="ml-2 text-[16px] font-semibold text-[#333333]">
                            {task.description}
                          </span>
                        </div>

                        <div className="mt-2 flex flex-row gap-4 items-center">
                          <span className="text-[#333333] font-regular text-[14px]">
                            Status:
                          </span>
                          <span className="ml-2 text-[16px] font-semibold text-[#333333]">
                            {task.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary Card */}
              <div className="rounded-lg border-[0.6px] border-[#008080] bg-[#00808008] p-6 h-fit">
                <h3 className="text-[16px] font-semibold text-[#0A0B0B] mb-4">
                  Summary of Today's Task
                </h3>

                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-[#333333] text-[14px]">
                      Total Tasks:
                    </span>
                    <span className="font-semibold text-[#333333] text-[14px]">
                      ({tasks.length})
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#333333] text-[14px]">
                      Completed Tasks:
                    </span>
                    <span className="font-semibold text-[#333333] text-[14px]">
                      ({completedTasks})
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#333333] text-[14px]">
                      Pending Tasks:
                    </span>
                    <span className="font-semibold text-[#333333] text-[14px]">
                      ({pendingTasks})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default KitchenStaffManager;
