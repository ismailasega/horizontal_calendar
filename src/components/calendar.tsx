// * @Author: Ismail Debele Asega
// * @Email: asega03@gmail.com
// * @LinkedIn: https://www.linkedin.com/in/asegaismail/
// * @Github: https://github.com/ismailasega
// * @GitLab: https://gitlab.com/asegaismail
// * @Tel: +256-784-491412 / +256-756-454376

import React, { useState } from "react";
import moment from "moment";
import EventView from "./eventView";
import InlineCalendar from "./inlineCalendar";

/**
 * Declaring type of props
 *
 * @param type calender
 */
type calendar = {
  title: string;
};

const Calendar: React.FC<calendar> = (props) => {
  /**
   * Declaring current day string
   *
   * @param currentDayStr
   * @returns currentdaystring
   */
  const currentDayStr = moment().format("ddd Do MMM YYYY");

  /**
   * Declaring state values
   *
   * @param state
   */
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [selectedDate, setSelectedDate] = useState(moment());
  const [viewDateDetails, setDateDetails] = useState(currentDayStr);
  const [showInlineCalendar, setInlineCalendar] = useState(false);
  const [isOverlay, setOverlay] = useState(false);
  /**
   * Previous week navigation
   *
   * @param previousWeekNavigation
   */
  const previousWeekNavigation = () => {
    setCurrentMonth(moment(currentMonth).subtract(1, "week"));
  };

  /**
   * Next week navigation
   *
   * @param nextWeekNavigation
   */
  const nextWeekNavigation = () => {
    setCurrentMonth(moment(currentMonth).add(1, "week"));
  };

  /**
   * Get popup for selecting custom
   *
   * @param getCustomDate
   */
  const getCustomDate = () => {
    setInlineCalendar(true);
    setOverlay(true);
  };

  /**
   * Closing popup for selecting custom
   *
   * @param closeCustomDate
   */
  const closeCustomDate = () => {
    setInlineCalendar(false);
    setOverlay(false);
  };

  /**
   * Show current week
   *
   * @param thisWeekView
   */
  const thisWeekView = () => {
    setCurrentMonth(moment());
  };

  /**
   * Calender header
   *
   * @param calendarHeader
   * @returns current Month
   */
  const calendarHeader = () => {
    return (
      <div>
        <span>{moment(currentMonth).format("MMM YYYY")}</span>
      </div>
    );
  };

  /**
   * Calender days
   *
   * @param calendarDays
   * @returns weekdays
   */
  const calendarDays = () => {
    const days = [];
    let startDate = moment(currentMonth).startOf("week");
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i}>{moment(i, "e").add(startDate, i).format("dd")[0]}</div>
      );
    }
    return days;
  };

  /**
   * Selected date
   *
   * @param selectDate
   * @returns date
   */
  const selectDate = (day: number, selectedDayStr: string) => {
    setSelectedDate(moment(day));
    setDateDetails(selectedDayStr);
  };

  /**
   * Dates
   *
   * @param dateCells
   * @returns dates
   */
  const dateCells = () => {
    const startDate = moment(currentMonth).startOf("week");
    const endDate = moment(currentMonth).endOf("week");
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = moment(day).format("DD");
        const cloneDay = +day;
        days.push(
          <div
            className={`col cell ${
              moment(day).isSame(moment(), "day")
                ? "today"
                : moment(day).isSame(selectedDate, "day")
                ? "selected"
                : ""
            }`}
            key={i}
            onClick={() => {
              const selectedDayStr = moment(cloneDay).format("ddd Do MMM YYYY");
              selectDate(cloneDay, selectedDayStr);
            }}
          >
            <span> {formattedDate}</span>
          </div>
        );
        day = moment(day).add(1, "days");
      }
      rows.push(days);
      days = [];
    }
    return rows;
  };

  const daysGrid: JSX.Element[] = calendarDays().map((day, index) => {
    const date = dateCells()[0][index];
    return (
      <div key={index} className="day-cell">
        <div className="day">{day}</div>
        <div className="date">{date}</div>
      </div>
    );
  });

  return (
    <div className="App">
      {isOverlay && <div className="overlay"></div>}
      <strong className="calenderTitle">{props.title}</strong>
      {showInlineCalendar && (
        <InlineCalendar close={closeCustomDate} title="Select Date" />
      )}
      <div className="main-container">
        <div className="control-area">
          <button className="btn" onClick={previousWeekNavigation}>
            <span>{"< "}LAST</span> <strong>WEEK</strong>
          </button>
          <div className="month">{calendarHeader()}</div>
          <button className="btn" onClick={nextWeekNavigation}>
            <span>NEXT</span> <strong>WEEK</strong>
            {" >"}
          </button>
        </div>
        <div className="grid-container">{daysGrid}</div>
        <div className="footer-area">
          <button className="btn" onClick={thisWeekView}>
            <span>THIS</span> <strong>WEEK</strong>
          </button>
          <button className="btn" onClick={getCustomDate}>
            <span>GO</span> <strong>TO</strong>
          </button>
        </div>
      </div>
      <EventView date={viewDateDetails} title="Incoming Events" />
    </div>
  );
};

export default Calendar;
