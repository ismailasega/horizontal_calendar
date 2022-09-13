// * @Author: Ismail Debele Asega
// * @Email: asega03@gmail.com
// * @LinkedIn: https://www.linkedin.com/in/asegaismail/
// * @Github: https://github.com/ismailasega
// * @GitLab: https://gitlab.com/asegaismail
// * @Tel: +256-784-491412 / +256-756-454376

import React, { useState } from "react";
import moment from "moment";

/**
 * Declaring type of props
 *
 * @param type inlineCalender
 */
type inlineCalender = {
  title: string;
  close: any;
};

const InlineCalendar: React.FC<inlineCalender> = (props) => {
  /**
   * Declaring current day string
   *
   * @param currentDayStr
   * @returns currentdaystring
   */
  const currentDayStr = moment().format("ddd, Do MMM YYYY");

  /**
   * Declaring state values
   *
   * @param state
   */
  const [currentMonth, setCurrentMonth] = useState(moment());

  /**
   * Previous month navigation
   *
   * @param previousMonthNavigation
   */
  const previousMonthNavigation = () => {
    setCurrentMonth(moment(currentMonth).subtract(1, "month"));
  };

  /**
   * Next month navigation
   *
   * @param nextMonthNavigation
   */
  const nextMonthNavigation = () => {
    setCurrentMonth(moment(currentMonth).add(1, "month"));
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
  return (
    <>
      <div className="inline-main-container">
        <div className="header">
          <div className="titleBar">
            <div>{props.title}</div>
            <div className="closeBtn" onClick={props.close}>
              {"X"}
            </div>
          </div>
          <div className="inline-today">{currentDayStr}</div>
        </div>
        <div className="navigationBar">
          <div className="year-selector">
            {calendarHeader()}
            {/* <span className="years-selector-icon">{"v"}</span> */}
            <div className="years_card"></div>
          </div>
          <div>
            <button className="navBtnPrev" onClick={previousMonthNavigation}>
              {"<"}
            </button>
            <button className="navBtnNext" onClick={nextMonthNavigation}>
              {">"}
            </button>
          </div>
        </div>
        <div className="inline-days">{calendarDays()}</div>
        <p className="progressText">Work in progress...</p>
      </div>
    </>
  );
};

export default InlineCalendar;
