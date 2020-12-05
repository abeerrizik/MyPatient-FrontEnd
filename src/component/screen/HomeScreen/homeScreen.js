import React from "react";
import "./homeScreen.css";
import { getNurseSchedule } from "../../../utils/login";

import {
  notificationSubscribe,
  requestNotificationPermission,
} from "../../../notificationManger";
import {useHistory} from "react-router-dom";
import {Table} from "react-bootstrap";

const HomeScreen = function () {
  const [schedule, setSchedule] = React.useState([]);
  const history = useHistory()

  React.useEffect(() => {
    requestNotificationPermission()
      .then(notificationSubscribe)
      .catch(console.error);

    getNurseSchedule()
      .then((data) => {
        setSchedule(data);
      })
      .catch(() => {});
  }, []);



  return (
    <div className="homeScreen_component">
      <div className="homeScreen_title">
        <p>My Schedule</p>
      </div>
      <Table className={"homeScreen_table"} bordered hover variant={"success"} >
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
            <tr key={data.id} onClick={()=> history.push(`/treatment/${data.id}`)}>
              <td>{data.Time}</td>
              <td>{data["Patient Name"]}</td>
              <td>{data.Room}</td>
              <td>{data.Bed}</td>
              <td>{data.Description}</td>
              <td>
                {" "}
                <input
                  type="checkbox"
                  className="status"
                  checked={data.status}
                  onChange={()=>{}}
                />{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default HomeScreen;
