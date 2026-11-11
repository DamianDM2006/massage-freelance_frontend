
export const ApptsList = (appointments) => {
  const { appts } = appointments;
  console.log(`appts:`, appts, typeof appts);

  const ListItem = ({ appt }) => {
    const splitDate = appt.date.split("T")[0];
    const sliceStart = appt.start_time.slice(0, 5);
    return (
      <nav>
        <p>{`${splitDate} Beginning ${sliceStart}`}</p>
      </nav>
    )
  };

  if (typeof appts !== "object") {
    return <p>{appts}</p>
  } else {
    return (
      <>
        <h4>Upcoming Appointments</h4>
        <ol>
          {appts.map((appt) => (<ListItem key={appt.appt_id} appt={appt} />))}
        </ol>
      </>
    )
  }
};

export const ApptDetails = (ptid) => {
  // console.log(`Details ptid:`, ptid)
  return (
    <p>
      Patient {ptid.id} appointment DETAILS
    </p>
  )
};