import React, { useState, useEffect } from "react";
import {
  Client,
  Employee,
  EmployeeDTO,
  IEmployee,
} from "../helper/web-api-helper/WebApiClient";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const empClient = new Client();
const Employees: React.FC = () => {
  const [data, setData] = useState<IEmployee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newEmployee, setNewEmployee] = useState<IEmployee>({
    firstName: "",
    lastName: "",
    email: "",
    lastSalary: "",
    dateOfJoining: new Date(),
    dob: new Date(),
  });
  const [editingEmployee, setEditingEmployee] = useState<IEmployee | null>(
    null
  );
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      setError(null);
      try {
        const employee = await empClient.employeeAll();
        setData(Array.isArray(employee) ? employee : [employee]);
      } catch (error) {
        console.error("Error fetching employee data:", error);
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load employee data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddOrUpdateEmployee = async () => {
    setLoading(true);
    setError(null);
    try {
      const emp = new EmployeeDTO({
        firstName: newEmployee.firstName,
        lastName: newEmployee.lastName,
        email: newEmployee.email,
        lastSalary: newEmployee.lastSalary,
        dateOfJoining: newEmployee.dateOfJoining,
        dob: newEmployee.dob,
      });

      const empp = new Employee({
        id: newEmployee.id,
        firstName: newEmployee.firstName,
        lastName: newEmployee.lastName,
        email: newEmployee.email,
        lastSalary: newEmployee.lastSalary,
        dateOfJoining: newEmployee.dateOfJoining,
        dob: newEmployee.dob,
      });
      if (editingEmployee) {
        // Update existing employee
        await empClient.employeePUT(editingEmployee.id || "", empp);
        setData((prevData) =>
          prevData.map((item) => (item.id === editingEmployee.id ? emp : item))
        );
      } else {
        // Add new employee
        await empClient.employeePOST(emp);

        setData((prevData) => [...prevData, emp]);
      }

      resetForm();
      setShowModal(false);
      navigate("/employee");
    } catch (error) {
      console.error("Error adding/updating employee:", error);
      setError(
        error instanceof Error ? error.message : "Failed to add/update employee"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEditEmployee = (employee: IEmployee) => {
    setEditingEmployee(employee);
    setNewEmployee(employee);
    setShowModal(true);
    navigate("/employee");
  };

  const handleDeleteEmployee = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await empClient.employeeDELETE(id); // Assuming a DELETE method exists
      setData((prevData) => prevData.filter((item) => item.id !== id));
      console.log(response);
      navigate("/employee");
    } catch (error) {
      console.error("Error deleting employee:", error);
      setError(
        error instanceof Error ? error.message : "Failed to delete employee"
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setNewEmployee({
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      lastSalary: "",
      dateOfJoining: new Date(),
      dob: new Date(),
    });
    setEditingEmployee(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>List Employee</h4>
        <button
          className="btn btn-primary"
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          Add Employee
        </button>
      </div>

      {/* Modal for adding/updating employee */}
      <div
        className={`modal fade ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
        tabIndex={-1}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {editingEmployee ? "Edit Employee" : "Add New Employee"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={newEmployee.firstName}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={newEmployee.lastName}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={newEmployee.email}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    name="lastSalary"
                    placeholder="Last Salary"
                    value={newEmployee.lastSalary}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="date"
                    name="dateOfJoining"
                    value={"2024-12-12"}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="date"
                    name="dob"
                    value={"2023-12-12"}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="btn btn-success"
                onClick={handleAddOrUpdateEmployee}
              >
                {editingEmployee ? "Update Employee" : "Add Employee"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Employee Table */}
      <table className="table table-striped table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>Sr No</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Last Salary</th>
            <th>Date of Joining</th>
            <th>Date of Birth</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={row.id ? row.id : `row-${index}`}>
              <td>{index + 1}</td>
              <td>{row.firstName}</td>
              <td>{row.lastName}</td>
              <td>{row.email}</td>
              <td>{row.lastSalary}</td>
              <td>{row.dateOfJoining?.toLocaleDateString()}</td>
              <td>{row.dob?.toLocaleDateString()}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEditEmployee(row)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteEmployee(row.id || "")}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employees;
