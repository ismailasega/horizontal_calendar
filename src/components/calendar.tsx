// * @Author: Ismail Debele Asega
// * @Email: asega03@gmail.com
// * @LinkedIn: https://www.linkedin.com/in/asegaismail/
// * @Github: https://github.com/ismailasega
// * @GitLab: https://gitlab.com/asegaismail
// * @Tel: +256-784-491412 / +256-756-454376

import React, { useEffect, useState } from "react";
import moment from "moment";
import { IoChevronForwardSharp } from "react-icons/io5";
import { IoChevronBackSharp } from "react-icons/io5";
import EventView from "./eventView";
import InlineCalendar from "./inlineCalendar";

/**
 * Declaring type of props
 *
 */
type calendar = {
  title: string;
};

const Calendar: React.FC<calendar> = (props) => {
  /**
   * Declaring current day string
   *
   */
  const currentDayStr = moment().format("ddd Do MMM YYYY");

  /**
   * Declaring state values
   *
   */
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [selectedDate, setSelectedDate] = useState(moment());
  const [viewDateDetails, setDateDetails] = useState(currentDayStr);
  const [showInlineCalendar, setInlineCalendar] = useState(false);
  const [isOverlay, setOverlay] = useState(false);
  const [customDate, setCustomDate] = useState<string>("");
  /**
   * Previous week navigation
   *
   */
  const previousWeekNavigation = () => {
    setCurrentMonth(moment(currentMonth).subtract(1, "week"));
  };

  /**
   * Next week navigation
   *
   */
  const nextWeekNavigation = () => {
    setCurrentMonth(moment(currentMonth).add(1, "week"));
  };

  /**
   * Get popup for selecting custom
   *
   */
  const getCustomDate = () => {
    setInlineCalendar(true);
    setOverlay(true);
  };

  /**
   * Closing popup for selecting custom
   *
   */
  const closeCustomDate = () => {
    setInlineCalendar(false);
    setOverlay(false);
  };

  /**
   * Show current week
   *
   */
  const thisWeekView = () => {
    setCurrentMonth(moment());
    const currentDayStr = moment().format("ddd Do MMM YYYY");
    setDateDetails(currentDayStr);
  };

  /**
   * Calender header
   *
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
   * @param day
   * @param seledDayStr
   * @returns selected date
   */
  const selectDate = (day: number, selectedDayStr: string) => {
    setSelectedDate(moment(day));
    setDateDetails(selectedDayStr);
  };

  /**
   * Dates
   *
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
            className={`cell ${
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

  const customSetDate = () => {
    if (!customDate) {
      const currentDayStr = moment().format("ddd Do MMM YYYY");
      setDateDetails(currentDayStr);
    } else {
      const customSelectedDay = moment(customDate, "DD-MM-YYYY").format(
        "ddd Do MMM YYYY"
      );
      setDateDetails(customSelectedDay);
      setCurrentMonth(moment(customDate, "DD-MM-YYYY"));
    }
  };

  useEffect(() => {
    customSetDate();
    calendarHeader();
  }, [customDate]);

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
        <InlineCalendar
          close={closeCustomDate}
          setCustomDateStr={setCustomDate}
          title="Select Date"
        />
      )}
      <div className="main-container">
        <div className="control-area">
          <button className="btn" onClick={previousWeekNavigation}>
            <IoChevronBackSharp />{" "}
            <span>
              LAST <strong>WEEK</strong>
            </span>
          </button>
          <div className="month">{calendarHeader()}</div>
          <button className="btn" onClick={nextWeekNavigation}>
            <span>
              NEXT <strong> WEEK</strong>{" "}
            </span>
            <IoChevronForwardSharp />
          </button>
        </div>
        <div className="grid-container">{daysGrid}</div>
        <div className="footer-area">
          <button className="btn" onClick={thisWeekView}>
            <span>
              THIS <strong>WEEK</strong>
            </span>
          </button>
          <button className="btn" onClick={getCustomDate}>
            <span>
              GO <strong>TO</strong>
            </span>
          </button>
        </div>
      </div>
      <EventView date={viewDateDetails} title="Incoming Events" />
    </div>
  );
};

export default Calendar;
