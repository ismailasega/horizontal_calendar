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
import { IoChevronDownSharp } from "react-icons/io5";
import { IoCloseCircle } from "react-icons/io5";

/**
 * Declaring type of props
 *
 */
type inlineCalender = {
  title: string;
  close: any;
  setCustomDateStr: any;
};

const InlineCalendar: React.FC<inlineCalender> = (props) => {
  /**
   * Declaring state values
   *
   */
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [selectedDate, setSelectedDate] = useState(moment());
  const [yearSelector, setYearSelector] = useState(false);
  const [yearList, setYearList] = useState<number[]>([]);
  const [yearInput, setYearInput] = useState<string>("");
  const [monthInput, setMonthInput] = useState<string>("");
  const [dayInput, setDayInput] = useState<string>("");
  const [customDateStr, setCustomDateStr] = useState<string>();
  /**
   * Previous month navigation
   *
   */
  const previousMonthNavigation = () => {
    setCurrentMonth(moment(currentMonth).subtract(1, "month"));
  };

  /**
   * This month navigation
   *
   */
  const getCurrentMonthNavigation = () => {
    setCurrentMonth(moment());
  };

  /**
   * Next month navigation
   *
   */
  const nextMonthNavigation = () => {
    setCurrentMonth(moment(currentMonth).add(1, "month"));
  };

  /**
   * Calender header
   *
   * @returns current Month
   */
  const calendarHeader = () => {
    return (
      <div>
        <span>{moment(currentMonth).format("MMMM YYYY")}</span>
      </div>
    );
  };
  /**
   * Listing an array of years
   *
   */
  const getYears = () => {
    const yearOne = Number("2000");
    const yearTwo = Number("2050");

    let years = [];
    for (let i = yearOne; i <= yearTwo; i++) {
      years.push(i);
    }
    setYearList(years);
  };
  useEffect(() => {
    console.log("wrk", yearList);
  }, [yearList]);

  /**
   * Show year selector
   *
   */
  const showYearSelecetor = () => {
    getYears();
    setYearSelector(true);
  };

  /**
   * Close year selector
   *
   */
  const hideYearSelecetor = () => {
    setYearSelector(false);
  };

  /**
   * Setting year input
   *
   *@param ChangeEvent e
   * @returns void
   */

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const setYear = e.target.value;
    setYearInput(setYear);
  };

  /**
   * Setting month input
   *
   *@param ChangeEvent e
   * @returns void
   */

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const setMonth = e.target.value;
    setMonthInput(setMonth);
  };

  /**
   * Setting day input
   *
   *@param ChangeEvent e
   * @returns void
   */

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const setDay = e.target.value;
    setDayInput(setDay);
  };

  useEffect(() => {
    const createDate = dayInput + "-" + monthInput + "-" + yearInput;
    setCustomDateStr(createDate);
  }, [yearInput, monthInput, dayInput, customDateStr]);

  /**
   * Calender days
   *
   *
   */
  const customDate = () => {
    props.setCustomDateStr(customDateStr);
    props.close();
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
        <div className="days-inline" key={i}>
          {moment(i, "e").add(startDate, i).format("dd")}
        </div>
      );
    }
    return days;
  };

  /**
   * Generating Month View
   *
   */
  const dateCells = () => {
    const firstDayOfMonth = moment(currentMonth).clone().startOf("month");
    const lastDayOfMonth = moment(firstDayOfMonth).clone().endOf("month");
    const startDate = moment(firstDayOfMonth).startOf("week");
    const endDate = moment(lastDayOfMonth).endOf("week");

    const rows = [];
    let days = [];

    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = moment(day).format("DD");
        // const cloneDay = +day;
        days.push(
          <div
            className={`date-inline-calendar ${
              moment(day).isSame(moment(), "day")
                ? "inline-today"
                : !moment(day).isSame(firstDayOfMonth, "month")
                ? "inline-disabled"
                : ""
            }`}
            key={i}
            onClick={() => {
              // const selectedDayStr = moment(cloneDay).format("ddd Do MMM YYYY");
              // selectDate(cloneDay, selectedDayStr);
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

  return (
    <div className="inline-main-container">
      <div className="inline-setcion">
        <div className="header">
          <div className="titleBar">
            <div>{props.title}</div>
            <div className="closeBtn" onClick={props.close}>
              <IoCloseCircle />
            </div>
          </div>
        </div>
        <div className="navigationBar">
          <div className="year-selector" onClick={showYearSelecetor}>
            <span className="year-text">{calendarHeader()}</span>
            <IoChevronDownSharp />
          </div>
          {yearSelector && (
            <div className="years_card">
              <div className="titleBar">
                <span className="year-text">{calendarHeader()}</span>
                <div className="inline-back" onClick={hideYearSelecetor}>
                  <IoChevronBackSharp /> <span>Back</span>
                </div>
              </div>
              <div className="year-listing">
                {yearList.length !== 0 &&
                  yearList.map((year, i) => (
                    <div key={i}>
                      <span
                        className={`year-item ${
                          moment(year).isSame(moment().year())
                            ? "currentYear"
                            : ""
                        }`}
                      >
                        {year}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}
          <div className="calendar-nav-today">
            <div className="navBtnPrev" onClick={previousMonthNavigation}>
              <IoChevronBackSharp />
            </div>
            <div className="today-inline" onClick={getCurrentMonthNavigation}>
              Today
            </div>
            <div className="navBtnNext" onClick={nextMonthNavigation}>
              <IoChevronForwardSharp />
            </div>
          </div>
        </div>
        <div className="date-view">
          <div className="row">{calendarDays()}</div>
          <div className="row">{dateCells()}</div>
        </div>
        {/* <p className="progressText">Work in progress...</p> */}
      </div>
      <div className="date-input-container">
        <div className="date-input-section">
          <div className="input-title">
            <strong>OR </strong>Input Date below
          </div>
          <div className="input-section">
            <input
              type="number"
              onChange={handleDayChange}
              className="date-input-month"
              placeholder="DD"
            />
            <input
              type="number"
              onChange={handleMonthChange}
              className="date-input-month"
              placeholder="MM"
            />
            <input
              type="number"
              onChange={handleYearChange}
              className="date-input-year"
              placeholder="YYYY"
            />
          </div>
          {yearInput && dayInput && monthInput ? (
            <button className="goBtn" onClick={customDate}>
              Go
            </button>
          ) : (
            <button className="goBtnBlocked">Go</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InlineCalendar;
