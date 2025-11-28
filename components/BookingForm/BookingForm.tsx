"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import { enGB } from "date-fns/locale";
import toast, { Toaster } from "react-hot-toast";
import css from "./BookingForm.module.css";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: undefined as Date | undefined,
    comment: "",
  });

  const [openCalendar, setOpenCalendar] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.date) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Your booking request has been sent successfully!");
      setFormData({ name: "", email: "", date: undefined, comment: "" });
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css.containerForm}>
      <h3 className={css.formTitle}>Book your car now</h3>
      <p className={css.formDescription}>
        Stay connected! We are always ready to help you.
      </p>

      <form onSubmit={handleSubmit} className={css.form}>
        <input
          type="text"
          name="name"
          placeholder="Name*"
          value={formData.name}
          onChange={handleChange}
          className={css.formInput}
        />
        <input
          type="email"
          name="email"
          placeholder="Email*"
          value={formData.email}
          onChange={handleChange}
          className={css.formInput}
        />

        <div className={css.calendar}>
          <input
            readOnly
            onClick={() => setOpenCalendar(!openCalendar)}
            placeholder="Booking date"
            value={formData.date ? format(formData.date, "MMMM d, yyyy") : ""}
            className={css.formInput}
          />
          {openCalendar && (
            <div className={css.calendarContainer}>
              <DayPicker
                mode="single"
                locale={enGB}
                navLayout="around"
                selected={formData.date}
                onSelect={(selectedDate) => {
                  setFormData((prev) => ({ ...prev, date: selectedDate }));
                  setOpenCalendar(false);
                }}
                classNames={{
                  today: `text-button font-semibold `,
                  selected: `bg-button rounded-full text-white`,
                }}
              />
            </div>
          )}
        </div>

        <textarea
          name="comment"
          placeholder="Comment"
          value={formData.comment}
          onChange={handleChange}
          className={css.formInput}
          rows={4}
        />

        <button type="submit" disabled={loading} className={css.submitBtn}>
          {loading ? "Sending..." : "Send"}
        </button>
      </form>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
