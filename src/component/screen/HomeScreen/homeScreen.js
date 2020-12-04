import React from "react";
import { getNurseSchedule } from "../../../utils/login";
import {notificationSubscribe, requestNotificationPermission} from "../../../notificationManger";

const HomeScreen = function () {
  const [schedule, setSchedule] = React.useState(null);
  React.useEffect(() => {
      requestNotificationPermission().then(notificationSubscribe).catch(console.error)

      getNurseSchedule()
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
        <tbody>
          {schedule?.map((data) => (
            <tr key={data.id}>
              <td>{data.Time}</td>
              <td>{data["Patient Name"]}</td>
              <td>{data.Room}</td>
              <td>{data.Bed}</td>
              <td>{data.Description}</td>
              <td>
                {" "}
                <input type="checkbox" className="status" value="true" />{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomeScreen;
