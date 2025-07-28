import React from "react";

const AdminTable = ({ data, type, onApprove }) => {
  return (
    <table className="admin-table">
      <thead>
        <tr>
          {type === "story" ? (
            <>
              <th>ID</th>
              <th>Name</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </>
          ) : (
            <>
              <th>ID</th>
              <th>Match ID</th>
              <th>Partner</th>
              <th>Status</th>
              <th>Action</th>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            {type === "story" ? (
              <>
                <td>{item.name}</td>
                <td>{item.date}</td>
              </>
            ) : (
              <>
                <td>{item.matchId}</td>
                <td>{item.partner}</td>
              </>
            )}
            <td>{item.status}</td>
            <td>
              {item.status === "pending" ? (
                <button
                  className="approve-btn"
                  onClick={() => onApprove(item.id)}>
                  Approve
                </button>
              ) : (
                <span className="approved">✔ Approved</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminTable;
