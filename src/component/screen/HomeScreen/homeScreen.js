import React from "react";
import { login } from "../../../utils/login";

const HomeScreen = function () {
  const [schedule, setSchedule] = React.useState(null);
  React.useEffect(() => {
    login()
      .then((data) => {
        console.log(data);
        setSchedule(data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="main-card">
      <div className="title">
        <p>My Schedule</p>
      </div>
      <table className="schedule-List">
        <thead>
          <tr>
            <th>Time</th>
            <th>Patient Name</th>
            <th>Room</th>
            <th>Bed</th>
            <th>Treatment</th>
            <th>Status</th>
          </tr>
        </thead>
        {/* <tbody>
          {schedule.data.map(
            ({ }) => (
              <tr>
                <td>{}</td>
                <td>{}</td>
                <td> {} </td>
              </tr>
            )
          )}
        </tbody> */}
      </table>
    </div>
  );
};

export default HomeScreen;
