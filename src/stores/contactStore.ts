import { create } from "zustand";
import emailjs from "@emailjs/browser";

export type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  message: string;
};

type ContactStore = {
  loading: boolean;
  status: "" | "success" | "error";
  sendEmail: (data: FormState) => Promise<void>;
};

export const useContactStore = create<ContactStore>((set) => ({
  loading: false,
  status: "",

  sendEmail: async (data) => {
    try {
      set({ loading: true, status: "" });

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: `${data.firstName} ${data.lastName}`.trim(),
          email: data.email,
          mobile: data.mobile,
          message: data.message,
          time: new Date().toLocaleString("vi-VN"),
        }
      );

      set({ status: "success" });
    } catch (err) {
      console.error("EmailJS error:", err);
      set({ status: "error" });
    } finally {
      set({ loading: false });
      setTimeout(() => set({ status: "" }), 3000);
    }
  },
}));
