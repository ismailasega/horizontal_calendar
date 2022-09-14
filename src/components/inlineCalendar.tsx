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
  const [yearSelector, setYearSelector] = useState(false);
  const [yearList, setYearList] = useState<number[]>([]);
  const [yearInput, setYearInput] = useState<number>(moment().year());
  const [monthInput, setMonthInput] = useState<number>(moment().month());
  const [dayInput, setDayInput] = useState<number>(moment().day());
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
    const setYear = Number(e.target.value);
    setYearInput(setYear);
  };

  /**
   * Setting month input
   *
   *@param ChangeEvent e
   * @returns void
   */

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const setMonth = Number(e.target.value);
    setMonthInput(setMonth);
  };

  /**
   * Setting day input
   *
   *@param ChangeEvent e
   * @returns void
   */

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const setDay = Number(e.target.value);
    setDayInput(setDay);
  };

  useEffect(() => {
    const createDate =
      dayInput.toString() + -monthInput.toString() + -yearInput.toString();
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
        <div key={i}>{moment(i, "e").add(startDate, i).format("dd")}</div>
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
        <div className="inline-days">{calendarDays()}</div>
        <p className="progressText">Work in progress...</p>
        <div className="divider"></div>
        <div className="date-input-section">
          <div>
            <strong>OR </strong>Input Date:{" "}
          </div>
          <input
            type="number"
            onChange={handleDayChange}
            className="date-input-month"
            placeholder="DD"
          />{" "}
          {"/"}{" "}
          <input
            type="number"
            onChange={handleMonthChange}
            className="date-input-month"
            placeholder="MM"
          />{" "}
          {"/"}{" "}
          <input
            type="number"
            onChange={handleYearChange}
            className="date-input-year"
            placeholder="YYYY"
          />
          <button className="goBtn" onClick={customDate}>
            Go
          </button>
        </div>
      </div>
    </>
  );
};

export default InlineCalendar;
